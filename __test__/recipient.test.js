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
                "username": "user test2",
                "name":"test2",
                "email": "test2@example.com", 
                "password": hashPassword("123456"),
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
            },
            {
                stock: 3, 
                location: "surabaya", 
                image: "string.jpg", 
                bloodType: 'O', 
                description: "testing data recipient dua",
                UserId: 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
        ]
        await sequelize.queryInterface.bulkInsert("Recipients", recipient, {})
        
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
})

describe('GET /recipients', ()=>{
    test("should response 200 - OK", async()=>{
        let response = await request(app).get('/recipients')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body[0]).toHaveProperty("stock", expect.any(Number))
        expect(response.body[0]).toHaveProperty("location", expect.any(String))
        expect(response.body[0]).toHaveProperty("image", expect.any(String))
        expect(response.body[0]).toHaveProperty("bloodType", expect.any(String))
        expect(response.body[0]).toHaveProperty("description", expect.any(String))
        expect(response.body[0]).toHaveProperty("UserId", expect.any(Number))
    })
})

describe('GET /recipients/:id', ()=>{
    test("should response 200 - OK", async()=>{
        let response = await request(app).get('/recipients/1')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("stock", expect.any(Number))
        expect(response.body).toHaveProperty("location", expect.any(String))
        expect(response.body).toHaveProperty("image", expect.any(String))
        expect(response.body).toHaveProperty("bloodType", expect.any(String))
        expect(response.body).toHaveProperty("description", expect.any(String))
        expect(response.body).toHaveProperty("UserId", expect.any(Number))
    })

    // jika id tdk ada
    test("should response 404 - OK", async()=>{
        let response = await request(app).get('/recipients/100')

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Recipient Not Found")
    })
})

describe('POST /recipients', ()=>{
    test("should response 201 - created", async()=>{
        let recipient = {
            stock: 2, 
            location: "surabaya", 
            image: "string.jpg", 
            bloodType: 'AB', 
            description: "testing data recipient tiga"
        }

        let response = await request(app).post('/recipients').send(recipient).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
    })

    // error belum login
    test("should response 401 - Invalid Token", async()=>{
        let recipient = {
            stock: 2, 
            location: "surabaya", 
            image: "string.jpg", 
            bloodType: 'AB', 
            description: "testing data recipient tiga"
        }

        let response = await request(app).post('/recipients').send(recipient)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    // error token salah
    test("should response 401 - created", async()=>{
        let recipient = {
            stock: 2, 
            location: "surabaya", 
            image: "string.jpg", 
            bloodType: 'AB', 
            description: "testing data recipient tiga"
        }

        let response = await request(app).post('/recipients').send(recipient).set('authorization', `Bearer ${token}-salah`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "invalid signature")
    })

    // error tdk mengisi lokasi
    test("should response 400 - Location is required", async()=>{
        let recipient = {
            stock: 2, 
            location: "", 
            image: "string.jpg", 
            bloodType: 'AB', 
            description: "testing data recipient tiga"
        }

        let response = await request(app).post('/recipients').send(recipient).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Location is required")
    })

    // error tdk mengisi stock
    test("should response 400 - Stock is required", async()=>{
        let recipient = {
            stock: null, 
            location: "surabaya", 
            image: "string.jpg", 
            bloodType: 'AB', 
            description: "testing data recipient tiga"
        }

        let response = await request(app).post('/recipients').send(recipient).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Stock is required")
    })

    // error tdk mengisi Blood type
    test("should response 400 - Blood type is required", async()=>{
        let recipient = {
            stock: 6, 
            location: "surabaya", 
            image: "string.jpg", 
            bloodType: '', 
            description: "testing data recipient tiga"
        }

        let response = await request(app).post('/recipients').send(recipient).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Blood type is required")
    })

    // error tdk mengisi description
    test("should response 400 - Description is required", async()=>{
        let recipient = {
            stock: 6, 
            location: "surabaya", 
            image: "string.jpg", 
            bloodType: 'A', 
            description: ""
        }

        let response = await request(app).post('/recipients').send(recipient).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Description is required")
    })
})

describe('PATCH /recipients/:id', ()=>{
    test("should response 200 - Image succes to update", async()=>{
        let response = await request(app).patch('/recipients/2').attach("image", imageBuffer, "ketik.png").set('authorization', `Bearer ${token}`)


        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Image succes to update")
    })

    // error belum login
    test("should response 401 - Invalid Token", async()=>{
        let response = await request(app).patch('/recipients/2').attach("imageUrl", imageBuffer, "ketik.png")

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    // error salah token
    test("should response 401 - invalid signature", async()=>{
        let response = await request(app).patch('/recipients/2').attach("image", imageBuffer, "ketik.png").set('authorization', `Bearer ${token}-salah`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "invalid signature")
    })
})