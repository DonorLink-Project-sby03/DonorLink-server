const app = require("../app");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const request = require('supertest')

const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, "../helpers/ketik.png")
const imageBuffer = fs.readFileSync(filePath)

let token = ''
let token2 = ""
let token3 = ""
let token4 = ""
let token5 = ""
let token6 = ""
let token7 = ""
let token8 = ""
let token9 = ""

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
            },
            {
                "username": "user test3",
                "name":"test3",
                "email": "test3@example.com", 
                "password": hashPassword("123456"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "user test4",
                "name":"test4",
                "email": "test4@example.com", 
                "password": hashPassword("123456"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "user test5",
                "name":"test5",
                "email": "test5@example.com", 
                "password": hashPassword("123456"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "user test6",
                "name":"test6",
                "email": "test6@example.com", 
                "password": hashPassword("123456"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "user test7",
                "name":"test7",
                "email": "test7@example.com", 
                "password": hashPassword("123456"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "user test8",
                "name":"test8",
                "email": "test8@example.com", 
                "password": hashPassword("123456"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "user test9",
                "name":"test9",
                "email": "test9@example.com", 
                "password": hashPassword("123456"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "user test10",
                "name":"test10",
                "email": "test10@example.com", 
                "password": hashPassword("123456"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ]
        await sequelize.queryInterface.bulkInsert("Users", user, {})
        token = signToken({id:1})
        token2 = signToken({id:2})
        token3 = signToken({id:3})
        token4 = signToken({id:4})
        token5 = signToken({id:5})
        token6 = signToken({id:6})
        token7 = signToken({id:7})
        token8 = signToken({id:8})
        token9 = signToken({id:9})

        const profile = [
            {
                "UserId": 1,
                "identityNumber": "11223344",
                "gender": "male",
                "address": "surabaya",
                "job": "-",
                "dateOfBirth": "2000-04-04",
                "phoneNumber": "4092184",
                "imageUrl": "image.jpg",
                "bloodType": "O",
                "updatedAt": new Date(),
                "createdAt": new Date()
            }
        ]
        await sequelize.queryInterface.bulkInsert("Profiles", profile, {})

    } catch (error) {
        console.log(error,'<- error before all profile');
    }
})

afterAll(async()=>{
    await sequelize.queryInterface.bulkDelete("Users", null, {
        truncate: true, 
        cascade: true, 
        restartIdentity: true
    })
    await sequelize.queryInterface.bulkDelete("Profiles", null, {
        cascade: true,
        truncate: true,
        restartIdentity: true
    })
})

describe('GET /profile', ()=>{
    test("should response 200 - ok", async()=>{
        let response = await request(app).get('/profile').set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("UserId", expect.any(Number))
        expect(response.body).toHaveProperty("identityNumber", expect.any(String))
        expect(response.body).toHaveProperty("gender", expect.any(String))
        expect(response.body).toHaveProperty("address", expect.any(String))
        expect(response.body).toHaveProperty("job", expect.any(String))
        expect(response.body).toHaveProperty("dateOfBirth", expect.any(String))
        expect(response.body).toHaveProperty("phoneNumber", expect.any(String))
        expect(response.body).toHaveProperty("imageUrl", expect.any(String))
        expect(response.body).toHaveProperty("bloodType", expect.any(String))
        expect(response.body).toHaveProperty("User", expect.any(Object))
    })

    // error tanpa token
    test("should response 401 - Invalid Token", async()=>{
        let response = await request(app).get('/profile')

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    // error token salah
    test("should response 401 - invalid signature", async()=>{
        let response = await request(app).get('/profile').set('authorization', `Bearer ${token}-salah`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "invalid signature")
    })
})

describe('POST /profile', ()=>{
    test("should response 201 - created", async()=>{
        let profile = {
            "identityNumber": "11223344",
            "gender": "male",
            "address": "surabaya",
            "job": "-",
            "dateOfBirth": "2000-04-04",
            "phoneNumber": "4092184",
            "imageUrl": "image.jpg",
            "bloodType": "O"
        }
        // token = signToken({id:2})
        let response = await request(app).post('/profile').send(profile).set("authorization", `Bearer ${token2}`)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("UserId", 2)
        expect(response.body).toHaveProperty("identityNumber", profile.identityNumber)
        expect(response.body).toHaveProperty("gender", profile.gender)
        expect(response.body).toHaveProperty("address", profile.address)
        expect(response.body).toHaveProperty("job", profile.job)
        expect(response.body).toHaveProperty("dateOfBirth", expect.any(String))
        expect(response.body).toHaveProperty("phoneNumber", profile.phoneNumber)
        expect(response.body).toHaveProperty("imageUrl", profile.imageUrl)
        expect(response.body).toHaveProperty("bloodType", profile.bloodType)
    })

    // Identity number tidak di input
    test("should response 400 - created", async()=>{
        let profile = {
            "identityNumber": "",
            "gender": "male",
            "address": "surabaya",
            "job": "-",
            "dateOfBirth": "2000-04-04",
            "phoneNumber": "4092184",
            "imageUrl": "image.jpg",
            "bloodType": "O"
        }

        let response = await request(app).post('/profile').send(profile).set("authorization", `Bearer ${token3}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Identity Number is required")
    })

    // gender tidak di input
    test("should response 400 - created", async()=>{
        let profile = {
            "identityNumber": "34252",
            "gender": "",
            "address": "surabaya",
            "job": "-",
            "dateOfBirth": "2000-04-04",
            "phoneNumber": "4092184",
            "imageUrl": "image.jpg",
            "bloodType": "O"
        }

        let response = await request(app).post('/profile').send(profile).set("authorization", `Bearer ${token4}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Gender is required")
    })

    // Address tidak di input
    test("should response 400 - created", async()=>{
        let profile = {
            "identityNumber": "34252",
            "gender": "male",
            "address": "",
            "job": "-",
            "dateOfBirth": "2000-04-04",
            "phoneNumber": "4092184",
            "imageUrl": "image.jpg",
            "bloodType": "O"
        }

        let response = await request(app).post('/profile').send(profile).set("authorization", `Bearer ${token5}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Address is required")
    })

    // Job tidak di input
    test("should response 400 - created", async()=>{
        let profile = {
            "identityNumber": "34252",
            "gender": "male",
            "address": "Jakarta",
            "job": "",
            "dateOfBirth": "2000-04-04",
            "phoneNumber": "4092184",
            "imageUrl": "image.jpg",
            "bloodType": "O"
        }

        let response = await request(app).post('/profile').send(profile).set("authorization", `Bearer ${token6}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Job is required")
    })
    
    // Date Of Birth tidak di input
    test("should response 400 - created", async()=>{
        let profile = {
            "identityNumber": "34252",
            "gender": "male",
            "address": "Jakarta",
            "job": "-",
            "dateOfBirth": "",
            "phoneNumber": "4092184",
            "imageUrl": "image.jpg",
            "bloodType": "O"
        }

        let response = await request(app).post('/profile').send(profile).set("authorization", `Bearer ${token7}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Date Of Birth is required")
    })
    
    // Phone Number tidak di input
    test("should response 400 - created", async()=>{
        let profile = {
            "identityNumber": "34252",
            "gender": "male",
            "address": "Jakarta",
            "job": "-",
            "dateOfBirth": "2000-04-04",
            "phoneNumber": "",
            "imageUrl": "image.jpg",
            "bloodType": "O"
        }

        let response = await request(app).post('/profile').send(profile).set("authorization", `Bearer ${token8}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Phone Number is required")
    })
    

    // Blood Type tidak di input
    test("should response 400 - created", async()=>{
        let profile = {
            "identityNumber": "34252",
            "gender": "male",
            "address": "Jakarta",
            "job": "-",
            "dateOfBirth": "2000-04-04",
            "phoneNumber": "72492347",
            "imageUrl": "image.jpg",
            "bloodType": ""
        }

        let response = await request(app).post('/profile').send(profile).set("authorization", `Bearer ${token9}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Blood Type is required")
    })

    // sudah punya profile
    test("should response 400 - invalid signature", async()=>{
        let profile = {
            "identityNumber": "11223344",
            "gender": "male",
            "address": "surabaya",
            "job": "-",
            "dateOfBirth": "2000-04-04",
            "phoneNumber": "4092184",
            "imageUrl": "image.jpg",
            "bloodType": "O"
        }
        let response = await request(app).post('/profile').send(profile).set("authorization", `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message","Already have profile")
    })

    // error tanpa token
    test("should response 401 - Invalid Token", async()=>{
        let profile = {
            "identityNumber": "11223344",
            "gender": "male",
            "address": "surabaya",
            "job": "-",
            "dateOfBirth": "2000-04-04",
            "phoneNumber": "4092184",
            "imageUrl": "image.jpg",
            "bloodType": "O"
        }
        token = signToken({id:3})
        let response = await request(app).post('/profile').send(profile)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message","Invalid Token")
    })

    // error token salah
    test("should response 401 - invalid signature", async()=>{
        let profile = {
            "identityNumber": "11223344",
            "gender": "male",
            "address": "surabaya",
            "job": "-",
            "dateOfBirth": "2000-04-04",
            "phoneNumber": "4092184",
            "imageUrl": "image.jpg",
            "bloodType": "O"
        }
        let response = await request(app).post('/profile').send(profile).set("authorization", `Bearer ${token}-salah`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message","invalid signature")
    })
})

describe('PATCH /profile/:id', ()=>{
    test("should response 200 - Image succes to update", async()=>{
        let response = await request(app).patch('/profile/2').attach("image", imageBuffer, "ketik.png").set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Image succes to update")
    })

    // error tanpa token
    test("should response 401 - Invalid Token", async()=>{
        let response = await request(app).patch('/profile/2').attach("image", imageBuffer, "ketik.png")

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    // error token salah
    test("should response 401 - invalid signature", async()=>{
        let response = await request(app).patch('/profile/2').attach("image", imageBuffer, "ketik.png").set('authorization', `Bearer ${token}-salah`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "invalid signature")
    })

    // error gk ngirimgambar
    test("should response 400 - Image must be upload", async()=>{
        let response = await request(app).patch('/profile/2').attach("image").set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Image must be upload")
    })
})