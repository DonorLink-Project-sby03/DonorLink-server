const app = require("../app");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const request = require("supertest")

const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, "../helpers/ketik.png")
const imageBuffer = fs.readFileSync(filePath)

let token= ''

beforeAll(async()=>{
    try {
        const user = [
            {
                "username": "wall",
                "name":"WallDotId",
                "email": "wall@mail.com", 
                "password": hashPassword("12345"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ]
        await sequelize.queryInterface.bulkInsert('Users', user, {})
        token = signToken({id:1})

        const recipient = [
            {
                stock: 5, 
                location: "surabaya", 
                image: "string.jpg", 
                bloodType: 'A', 
                description: "testing data recipient",
                UserId: 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ]
        await sequelize.queryInterface.bulkInsert("Recipients", recipient, {})


        const donor = [
            {
                stock: 2, 
                UserId: 1,
                RecipientId: 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ]

        await sequelize.queryInterface.bulkInsert("Donors", donor, {})
        
    } catch (error) {
        console.log(error,'<< error before all testing recipient');
    }
})

afterAll(async()=>{
    await sequelize.queryInterface.bulkDelete("Users", null, {
        truncate: true, 
        cascade: true, 
        restartIdentity: true
    })
    await sequelize.queryInterface.bulkDelete("Recipients", null, {
        truncate: true, 
        cascade: true, 
        restartIdentity: true
    })
    await sequelize.queryInterface.bulkDelete("Donors", null, {
        truncate: true, 
        cascade: true, 
        restartIdentity: true
    })
})

describe('GET /donors', ()=>{
    test("should response 200 - OK", async()=>{
        let response = await request(app).get('/donors').set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body[0]).toHaveProperty("UserId", expect.any(Number))
        expect(response.body[0]).toHaveProperty("RecipientId", expect.any(Number))
        expect(response.body[0]).toHaveProperty("stock", expect.any(Number))
        expect(response.body[0]).toHaveProperty("Recipient", expect.any(Object))
        expect(response.body[0]).toHaveProperty("DonorConfirmation", expect.any(null || Object))
    })
})

