const forge = require('node-forge');


// Create the password hash
function createHash(password, salt) {
    var md = forge.md.sha256.create();
    md.update(password + salt);
    return md.digest().toHex();
}


// Return true if the password in the DB matches the inputted password
function checkPassword(password, salt, databasePassword) {
    return createHash(password, salt) === databasePassword;
}


module.exports = {createHash, checkPassword};