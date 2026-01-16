<div align="center">

# 🕵️ PyCrypto-Electron-Client: The Secret Hider
**The only desktop app you need to hide your deepest secrets (or grocery lists).** Cross-platform encryption built by shoving a modern React UI and a Python security module into an Electron trench coat.

</div>

## 💡 Description
I created this project primarily to demonstrate how to securely bridge the gap between a modern frontend and a powerful, reliable backend—all packed into one executable desktop app.

Essentially, this app lets you encrypt messages using a military-grade algorithm, proving that my Electron/Node.js shell can successfully boss around a Python child process.

### Key Architectural (Secret) Highlights:

* **Secure Communications:** All encryption/decryption requests travel securely via **Inter-Process Communication (IPC)** from the React frontend to the Node.js Main Process.
* **The Python Muscle:** All heavy-duty math and cryptology are offloaded to Python's robust `cryptography` library. JavaScript touches nothing sensitive.
* **Impenetrable Key Protection:** We don't just use your password; we mix it with a ton of digital salt and run it through **PBKDF2** 100,000 times to derive the actual 256-bit encryption key. Good luck brute-forcing that.
* **One App to Rule Them All:** The final build uses `electron-builder` and `python-shell` to bundle the entire React interface and the isolated Python environment into a single, clean installation file.

---

## 🧰 Tech Stack (The Crew)

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" width="40" height="40" alt="Electron" title="Electron (The Trench Coat)"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" height="40" alt="React" title="React (The Pretty Face)"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" width="40" height="40" alt="Vite" title="Vite (The Speed Demon)"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40" alt="JavaScript" title="JavaScript (The Messenger)"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="40" height="40" alt="Python" title="Python (The Brains and Muscle)"/>
</p>

---

## 🎥 Demo (YouTube)

<p align="center">
  A quick overview of the application's functionality.
</p>
<p align="center">
  <a href="https://www.youtube.com/watch?v=2RV8DXvpLRM" target="_blank">
    <img src="https://markdown-videos-api.vercel.app/youtube/2RV8DXvpLRM" alt="Watch the Demo Video" width="500">
  </a>
</p>

---

## 🖼️ Screenshots

<p align="center">
  <img src="images/GitHub-Images/screenshot-placeholder-1.png" alt="Screenshot 1: The Main UI" width="800">
</p>
<p align="center">
  **Screenshot 1:** The main application interface showing the encryption/decryption fields.
</p>

<p align="center">
  <img src="images/GitHub-Images/screenshot-placeholder-2.png" alt="Screenshot 2: Encryption Result" width="800">
</p>
<p align="center">
  **Screenshot 2:** The result area after successfully encrypting a secret message.
</p>

<p align="center">
  <img src="images/GitHub-Images/screenshot-placeholder-3.png" alt="Screenshot 3: Error Handling" width="800">
</p>
<p align="center">
  **Screenshot 3:** Demonstrating input validation and error handling when a field is missing.
</p>

---

## ⚙️ How to Develop (Recruitment)

If you want to join the secret society (i.e., develop the app), you'll need Node.js/npm and Python 3 installed.

### Prerequisites

```bash
# 1. Clone the project (You already know the secret handshake)
git clone [https://github.com/Nordtess/PyCrypto-Electron-Client](https://github.com/Nordtess/PyCrypto-Electron-Client)
cd PyCrypto-Electron-Client
