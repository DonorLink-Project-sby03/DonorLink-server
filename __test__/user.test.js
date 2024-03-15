const { User, sequelize } = require('../models/');
const { createToken } = require('../helpers/jwt');
const { createPassword } = require('../helpers/bcrypt');
const { queryInterface } = sequelize

let token;

beforeAll(async()=>{
    const user = await User.create({
        "username": "Test",
        "username": "444-444-4444",
        "email": "test@example.com",
        "password": "123456"
    })
    token = createToken({id:user.id})
    
    const seedUsers = require('../data/user.json').map(el=>{
        el.createdAt = el.updatedAt = new Date()
        el.password = createPassword(el.password)
        return el
    })
    await queryInterface.bulkInsert('Users', seedUsers)

    const seedRecipient = require('../data/recipient.json').map(el=>{
        el.createdAt = el.updatedAt = new Date()
        return el
    })
    await queryInterface.bulkInsert('Recipients', seedRecipient)
})

afterAll(async()=>{
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await queryInterface.bulkDelete('Recipients', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})