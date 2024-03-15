const { hashSync, compareSync } = require("bcryptjs");

const hashPassword = (password) => {
    return hashSync(password, 8)
}

const comparePassword = (password, hash) => {
    return compareSync(password, hash)
}

module.exports = {
    hashPassword,
    comparePassword
}