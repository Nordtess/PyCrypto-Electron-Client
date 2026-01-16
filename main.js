/**
 * Electron Main Process
 * 
 * Manages the desktop application window and handles IPC communication
 * between the React frontend and Python encryption backend.
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { PythonShell } = require('python-shell');

// Always use built files (change to true if you want to use dev server)
const isDev = false;

console.log("--- MAIN PROCESS STARTED ---");
console.log(`Development mode (isDev): ${isDev}`);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    // Development: Load from Vite dev server
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // Production: Load from built files
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  // macOS: Re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handler for Python AES encryption/decryption
ipcMain.handle('run-python-aes', async (event, operation, text, key) => {
  // Always use the python folder in the project root
  const scriptDir = path.join(__dirname, 'python');

  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: scriptDir,
    args: [operation, text, key]
    // Let python-shell use system Python (no venv)
  };

  try {
    const result = await PythonShell.run('aes_handler.py', options);
    const output = result[result.length - 1];

    if (output.startsWith('ERROR:')) {
      throw new Error(output.replace('ERROR: ', ''));
    }

    return { data: output };
  } catch (err) {
    console.error("Python Execution Error:", err);
    return { error: 'PYTHON_EXECUTION_FAILED: ' + err.message };
  }
});