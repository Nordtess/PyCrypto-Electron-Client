const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('aesAPI', {
  runAES: (operation, text, key) => ipcRenderer.invoke('run-python-aes', operation, text, key),
});