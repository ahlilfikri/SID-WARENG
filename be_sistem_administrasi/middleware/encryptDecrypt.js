const crypto = require('crypto');
require('dotenv').config();

exports.dekripsi = (encryptedData, key, iv) => {
    if (encryptedData.length % 2 !== 0) throw new Error("Encrypted data length must be even for hex decoding.");
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};


exports.enkripsi = (text, key, iv) => {
    if (iv.length !== 16) throw new Error("IV must be 16 bytes long.");
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        encryptedData: encrypted,
        initializationVector: iv.toString('hex')
    };
};


module.exports = exports;
