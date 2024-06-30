const crypto = require('crypto');
require('dotenv').config();

exports.dekripsi = (encryptedData, key, iv) => {
    console.log('Decrypting data...');
    console.log('Key:', key.toString('hex'));
    console.log('IV:', iv);
    console.log('Encrypted Data:', encryptedData);

    if (encryptedData.length % 2 !== 0) throw new Error("Encrypted data length must be even for hex decoding.");
    if (iv.length !== 32) throw new Error("IV must be 32 characters long."); // Panjang IV harus 32 karakter (hex 16 bytes)

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    console.log('Decrypted Data:', decrypted);
    return decrypted;
};

exports.enkripsi = (text, key, iv) => {
    console.log('Encrypting data...');
    console.log('Key:', key.toString('hex'));
    console.log('IV:', iv);

    if (iv.length !== 32) throw new Error("IV must be 32 characters long."); // Panjang IV harus 32 karakter (hex 16 bytes)

    const cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    console.log('Encrypted Data:', encrypted);
    return {
        encryptedData: encrypted,
        initializationVector: iv
    };
};

module.exports = exports;
