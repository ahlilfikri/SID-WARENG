const crypto = require('crypto');
require('dotenv').config();

exports.dekripsi = (encryptedData, key, iv) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

exports.enkripsi = (text, key, iv) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        encryptedData: encrypted,
        initializationVector: iv.toString('hex')
    };
};

module.exports = exports;
