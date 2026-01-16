<div align="center"> 🕵️ PyCrypto-Electron-Client: The Secret Keeper**Your desktop vault for encrypting secrets—minus the complexity.** A sleek cross-platform encryption app built by wrapping military-grade Python cryptography in a modern React UI, all bundled in an Electron shell.</div>## 💡 DescriptionI built PyCrypto-Electron-Client to demonstrate how to architect a secure desktop application that bridges modern frontend technologies with powerful backend processing. It's an AES-256 encryption tool where users can encrypt and decrypt messages with military-grade security—all running locally on their machine with zero network exposure.This isn't just another crypto toy—it's a showcase of **inter-process communication**, **secure cryptographic patterns**, and **cross-platform desktop deployment**, proving you can build professional-grade security tools without compromising on user experience.### Key Architectural Highlights:- **Secure IPC Architecture:** All encryption/decryption requests travel securely via **Inter-Process Communication (IPC)** from the React frontend through Electron's main process to the Python backend. The frontend never touches sensitive cryptographic operations.- **Python Cryptography Muscle:** All heavy-duty cryptographic work is handled by Python's battle-tested `cryptography` library using AES-256-CBC mode. JavaScript stays in its lane—UI only.- **PBKDF2 Key Derivation:** Passwords aren't used directly. They're transformed through **PBKDF2-HMAC-SHA256** with 100,000 iterations, random salt, and random IV generation for each encryption. Good luck brute-forcing that.- **Zero Network Exposure:** Everything runs locally. Your secrets never leave your machine. No servers, no APIs, no tracking—just pure client-side encryption.- **Single Executable Distribution:** Using `electron-builder` and `python-shell`, the entire React frontend, Electron runtime, and Python environment bundle into one clean installer for Windows, macOS, and Linux.---## 🧰 Tech Stack<p align="center">  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" width="40" height="40" alt="Electron" title="Electron (The Desktop Shell)"/>  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" height="40" alt="React" title="React (The UI Layer)"/>  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" width="40" height="40" alt="Vite" title="Vite (The Build Tool)"/>  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40" alt="JavaScript" title="JavaScript (The Frontend Logic)"/>  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="40" height="40" alt="Python" title="Python (The Crypto Engine)"/></p>---## 🎯 Features### 🔐 Military-Grade Encryption- **AES-256-CBC:** Industry-standard symmetric encryption algorithm- **PBKDF2 Key Derivation:** 100,000 iterations with SHA-256 hashing- **Random Salt & IV:** Unique cryptographic parameters for each encryption operation- **PKCS7 Padding:** Proper block cipher padding for data integrity### 🎨 Modern User Interface- **Dark Theme:** Eye-friendly UI with glassmorphic design elements- **Toggle Visibility:** Show/hide encryption keys for security- **Copy to Clipboard:** One-click copying of encrypted/decrypted output- **Real-time Validation:** Instant feedback for missing inputs or errors### 🖥️ Cross-Platform Desktop App- **Windows, macOS, Linux:** Single codebase, multiple platforms- **No Installation Required:** Portable executables (when built with electron-builder)- **Offline Operation:** No internet connection needed- **Native Performance:** Fast, responsive desktop experience### 🔒 Security First- **Zero Network Calls:** All processing happens locally- **No Data Storage:** Messages and keys are never persisted- **Isolated Python Process:** Cryptographic operations run in a separate process- **Base64 Encoding:** Safe storage and transmission format for encrypted data---## 🎥 Demo<p align="center">  <a href="https://www.youtube.com/watch?v=2RV8DXvpLRM" target="_blank">    <img src="https://markdown-videos-api.vercel.app/youtube/2RV8DXvpLRM" alt="Watch the Demo Video" width="500">  </a></p><p align="center">  <strong>YouTube Demo:</strong> See the encryption and decryption workflow in action.</p>---## 🖼️ Screenshots<p align="center">  <img src="screenshots/screenshot1.png" alt="Screenshot 1: Encryption Interface" width="800"></p><p align="center">  <strong>Screenshot 1:</strong> The main encryption interface with input fields for plaintext and encryption key.</p><p align="center">  <img src="screenshots/screenshot2.png" alt="Screenshot 2: Encrypted Output" width="800"></p><p align="center">  <strong>Screenshot 2:</strong> Successfully encrypted message with copy-to-clipboard functionality.</p><p align="center">  <img src="screenshots/screenshot3.png" alt="Screenshot 3: Decryption Mode" width="800"></p><p align="center">  <strong>Screenshot 3:</strong> Decryption mode showing the reversal of encrypted data back to plaintext.</p>---## ⚙️ How to Develop### PrerequisitesYou'll need:- **Node.js** (v16 or later) and **npm**- **Python 3** (v3.8 or later)- **Git** (for cloning the repository)### Setup Instructions```bash# 1. Clone the repositorygit clone https://github.com/Nordtess/PyCrypto-Electron-Clientcd PyCrypto-Electron-Client# 2. Install Electron dependenciesnpm install# 3. Install React dependenciescd srcnpm installcd ..# 4. Install Python dependenciespip install -r [requirements.txt](http://_vscodecontentref_/0)# 5. Run the applicationnpm start
The application will:

Build the React frontend (Vite)
Start the Electron main process
Load the bundled React UI
Connect to the Python backend via IPC
📦 Building for Distribution
To create platform-specific installers:


# Build for your current platformnpm run dist# Output will be in the dist/ folder# - Windows: .exe installer# - macOS: .dmg installer# - Linux: .AppImage or .deb
The build includes:

Minified React bundle
Electron runtime
Python executable and dependencies
All assets and resources
🏗️ Project Structure

PyCrypto-Electron-Client/├── main.js                 # Electron main process (IPC handler)├── preload.js             # Electron preload script (security bridge)├── package.json           # Electron dependencies & build scripts├── requirements.txt       # Python dependencies├── python/│   └── aes_handler.py    # AES-256 encryption/decryption logic├── src/                  # React frontend (Vite)│   ├── src/│   │   ├── App.jsx       # Main React component│   │   ├── App.css       # Styling│   │   └── main.jsx      # React entry point│   ├── index.html        # HTML template│   ├── package.json      # React dependencies│   └── vite.config.js    # Vite build configuration└── build/                # Production build output
🔐 How It Works
Encryption Flow:
User Input: User enters plaintext and encryption key in React UI
IPC Request: React sends encryption request via window.aesAPI.runAES()
Electron Bridge: Main process receives request via contextBridge API
Python Execution: Electron spawns Python process with python-shell
Cryptographic Processing:
Generate random 16-byte salt
Derive 256-bit key using PBKDF2 (100,000 iterations)
Generate random 16-byte IV
Encrypt plaintext using AES-256-CBC
Combine: salt + iv + ciphertext
Base64 encode the result
Response: Python returns encrypted data to Electron → React UI
Decryption Flow:
User pastes Base64-encoded ciphertext and original key
Python decodes Base64 → extracts salt, IV, and ciphertext
Derives same key using PBKDF2 with extracted salt
Decrypts using AES-256-CBC with extracted IV
Returns original plaintext
🔍 Security Considerations
What makes this secure:
✅ AES-256 is military-grade encryption (NSA-approved)
✅ PBKDF2 with 100,000 iterations prevents brute-force attacks
✅ Random salt and IV prevent rainbow table attacks
✅ All processing is local (zero network exposure)
✅ Keys are never stored or logged

What to keep in mind:
⚠️ Key strength matters: Use long, random passwords
⚠️ This is for demonstration: Not audited for production use
⚠️ Key management: If you lose the key, data is unrecoverable

🛠️ Technologies & Patterns Used
Frontend:

React 18 (functional components + hooks)
Vite (lightning-fast HMR and bundling)
CSS3 (glassmorphism, animations)
Vanilla JavaScript (no heavy frameworks)
Desktop Shell:

Electron 39 (Chromium + Node.js runtime)
IPC (Inter-Process Communication)
Context Isolation & Preload Scripts (security)
python-shell (Node.js ↔ Python bridge)
Backend:

Python 3
cryptography library (PyCA)
AES-256-CBC encryption
PBKDF2-HMAC-SHA256 key derivation
PKCS7 padding
Build Tools:

electron-builder (packaging & distribution)
Vite (React build system)
npm scripts (automation)
📝 Future Enhancements (Roadmap)
 File encryption support (encrypt entire files, not just text)
 Drag-and-drop file interface
 Multiple encryption algorithms (RSA, ChaCha20)
 Key file generation (.key files)
 Encrypted vault/storage system
 Auto-update mechanism
 Internationalization (i18n) support
👨‍💻 Author
Nordtess
Full-Stack Developer & Security Enthusiast

Connect: GitHub | Portfolio

📜 License
This project is licensed under the MIT License—feel free to use it, learn from it, or build upon it!

<div align="center">

Built with ❤️, Python, and paranoia in Sweden 🇸🇪

"Because your secrets deserve better than a sticky note."

</div>

