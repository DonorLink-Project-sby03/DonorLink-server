const app = require("../app");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { sequelize, User } = require("../models");
const request = require("supertest")

let token;

beforeAll(async()=>{
    try {
        const user = {
            "username": "user test2",
            "name":"test2",
            "email": "test2@example.com", 
            "password": hashPassword("123456"),
            "createdAt": new Date(),
            "updatedAt": new Date()
        }
        let login = await User.create(user)
        token = signToken({id:login.id})

        const recipient = [
            {
                stock: 5, 
                location: "surabaya", 
                image: "string.jpg", 
                bloodType: 'A', 
                description: "testing data recipient",
                UserId: login.id
            },
            {
                stock: 3, 
                location: "surabaya", 
                image: "string.jpg", 
                bloodType: 'O', 
                description: "testing data recipient dua",
                UserId: login.id
            },
        ]
        await sequelize.bulkInsert("Recipients", recipient, {})
        
    } catch (error) {
        console.log(error,'<< error before all testing recipient');
    }
})

afterAll(async()=>{
    await sequelize.bulkDelete("Users", null, {
        truncate: true, 
        cascade: true, 
        restartIdentity: true
    })
    await sequelize.bulkDelete("Recipients", null, {
        truncate: true, 
        cascade: true, 
        restartIdentity: true
    })
})

description('GET /recipients', ()=>{
    test("should response 200 - OK", async()=>{
        let response = await request(app).get('/recipients')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})