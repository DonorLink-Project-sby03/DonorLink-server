const app = require("../app");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const request = require('supertest')

let token = ''

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
            }
        ]
        await sequelize.queryInterface.bulkInsert("Users", user, {})
        token = signToken({id:1})

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
        token = signToken({id:2})
        let response = await request(app).post('/profile').send(profile).set("authorization", `Bearer ${token}`)

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