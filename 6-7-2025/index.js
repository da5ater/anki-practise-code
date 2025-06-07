const bcrypt = require('bcrypt');

function hashPassword(password) {
    const saltRounds = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, saltRounds);
}

