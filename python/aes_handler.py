"""
AES-256-CBC encryption handler with PBKDF2 key derivation.

Provides secure encryption and decryption using:
- AES-256 in CBC mode
- PBKDF2-HMAC-SHA256 for key derivation (100,000 iterations)
- Random salt and IV for each encryption
- PKCS7 padding
"""

import sys
import base64
import os
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import padding

IV_LENGTH = 16
SALT_LENGTH = 16

def derive_key(key_string, salt):
    """Derive a 256-bit key from password using PBKDF2."""
    kdf_tool = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )
    return kdf_tool.derive(key_string.encode('utf-8'))

def encrypt(plaintext, key_string):
    """
    Encrypt plaintext using AES-256-CBC.
    Returns base64-encoded string containing: salt + iv + ciphertext
    """
    try:
        salt = os.urandom(SALT_LENGTH)
        iv = os.urandom(IV_LENGTH)
        key = derive_key(key_string, salt)

        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        encryptor = cipher.encryptor()

        padder = padding.PKCS7(128).padder()
        padded_data = padder.update(plaintext.encode('utf-8')) + padder.finalize()
        ciphertext = encryptor.update(padded_data) + encryptor.finalize()
        
        return base64.urlsafe_b64encode(salt + iv + ciphertext).decode('utf-8')
        
    except Exception as e:
        return f"ERROR: Encryption failed - {e}"

def decrypt(payload_b64, key_string):
    """
    Decrypt base64-encoded ciphertext using AES-256-CBC.
    Extracts salt and IV from the payload.
    """
    try:
        decoded_payload = base64.urlsafe_b64decode(payload_b64)
        
        # Extract components
        salt = decoded_payload[:SALT_LENGTH]
        iv = decoded_payload[SALT_LENGTH:SALT_LENGTH + IV_LENGTH]
        ciphertext = decoded_payload[SALT_LENGTH + IV_LENGTH:]
        
        key = derive_key(key_string, salt)

        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        decryptor = cipher.decryptor()
        padded_plaintext = decryptor.update(ciphertext) + decryptor.finalize()
        
        unpadder = padding.PKCS7(128).unpadder()
        plaintext = unpadder.update(padded_plaintext) + unpadder.finalize()
        
        return plaintext.decode('utf-8')
        
    except Exception as e:
        return f"ERROR: Decryption failed - Check password/format - {e}"


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("ERROR: Insufficient arguments.")
        sys.exit(1)
        
    operation = sys.argv[1]
    text = sys.argv[2]
    key = sys.argv[3]
    
    if operation == "encrypt":
        result = encrypt(text, key)
    elif operation == "decrypt":
        result = decrypt(text, key)
    else:
        result = "ERROR: Invalid operation."
    
    print(result)