const bcrypt = require("bcrypt");

//HASH FUNCTION
exports.hashPassword = (passWord) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(passWord, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

exports.comparePassword = (passWord, hashed) => {
  return bcrypt.compare(passWord, hashed);
};
