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
let token2 = ""
let token3 = ""
let token4 = ""
let token5 = ""
let token6 = ""
let token7 = ""
let token8 = ""

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
            },
            {
                "username": "utta",
                "name":"Utta Sulaiman",
                "email": "utta@mail.com", 
                "password": hashPassword("12345"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "rabt",
                "name":"Rabiatul Adawiyah",
                "email": "rabt@mail.com", 
                "password": hashPassword("12345"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "iwan",
                "name":"Irwan Rosidi",
                "email": "iwan@mail.com", 
                "password": hashPassword("12345"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "desinta",
                "name":"Deshinta",
                "email": "desinta@mail.com", 
                "password": hashPassword("12345"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "bintang",
                "name":"Bintang",
                "email": "bintang@mail.com", 
                "password": hashPassword("12345"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "padli",
                "name":"Padli",
                "email": "padl@mail.com", 
                "password": hashPassword("12345"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "username": "mukti",
                "name":"Mukti",
                "email": "mukt@mail.com", 
                "password": hashPassword("12345"),
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ]
        await sequelize.queryInterface.bulkInsert('Users', user, {})
        token = signToken({id:1})
        token2 = signToken({id:2})
        token3 = signToken({id:3})
        token4 = signToken({id:4})
        token5 = signToken({id:5})
        token6 = signToken({id:6})
        token7 = signToken({id:7})
        token8 = signToken({id:8})


        const profile = [
            {
                "UserId": 1,
                "identityNumber": "11223344",
                "gender": "male",
                "address": "surabaya",
                "job": "Swasta",
                "dateOfBirth": "2000-04-04",
                "phoneNumber": "4092184",
                "imageUrl": "image.jpg",
                "bloodType": "B+",
                "updatedAt": new Date(),
                "createdAt": new Date()
            },
            {
                "UserId": 2,
                "identityNumber": "7654321",
                "gender": "male",
                "address": "Mataram",
                "job": "Swasta",
                "dateOfBirth": "1999-04-04",
                "phoneNumber": "4092184",
                "imageUrl": "image.jpg",
                "bloodType": "A+",
                "updatedAt": new Date(),
                "createdAt": new Date()
            },
            {
                "UserId": 4,
                "identityNumber": "7654321",
                "gender": "male",
                "address": "Mataram",
                "job": "Swasta",
                "dateOfBirth": "1999-04-04",
                "phoneNumber": "4092184",
                "imageUrl": "image.jpg",
                "bloodType": "AB-",
                "updatedAt": new Date(),
                "createdAt": new Date()
            },
            {
                "UserId": 5,
                "identityNumber": "7654321",
                "gender": "male",
                "address": "Mataram",
                "job": "Swasta",
                "dateOfBirth": "1999-04-04",
                "phoneNumber": "4092184",
                "imageUrl": "image.jpg",
                "bloodType": "AB+",
                "updatedAt": new Date(),
                "createdAt": new Date()
            },
            {
                "UserId": 6,
                "identityNumber": "7654321",
                "gender": "male",
                "address": "Mataram",
                "job": "Swasta",
                "dateOfBirth": "1999-04-04",
                "phoneNumber": "4092184",
                "imageUrl": "image.jpg",
                "bloodType": "B-",
                "updatedAt": new Date(),
                "createdAt": new Date()
            },
            {
                "UserId": 7,
                "identityNumber": "7654321",
                "gender": "male",
                "address": "Mataram",
                "job": "Swasta",
                "dateOfBirth": "1999-04-04",
                "phoneNumber": "4092184",
                "imageUrl": "image.jpg",
                "bloodType": "A-",
                "updatedAt": new Date(),
                "createdAt": new Date()
            },
            {
                "UserId": 8,
                "identityNumber": "7654321",
                "gender": "male",
                "address": "Mataram",
                "job": "Swasta",
                "dateOfBirth": "1999-04-04",
                "phoneNumber": "4092184",
                "imageUrl": "image.jpg",
                "bloodType": "O+",
                "updatedAt": new Date(),
                "createdAt": new Date()
            }
        ]
        await sequelize.queryInterface.bulkInsert("Profiles", profile, {})

        const recipient = [
            {
                stock: 500, 
                location: "gubeng-jawa timur", 
                image: "string.jpg", 
                bloodType: 'B+', 
                description: "testing data recipient",
                UserId: 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                stock: 400, 
                location: "mujur-nusa tenggara barat", 
                image: "string.jpg", 
                bloodType: 'A+', 
                description: "testing data recipient",
                UserId: 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                stock: 500, 
                location: "cakranegara-nusa tenggara barat", 
                image: "string.jpg", 
                bloodType: 'AB-', 
                description: "testing data recipient",
                UserId: 1,
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ]
        await sequelize.queryInterface.bulkInsert("Recipients", recipient, {})


        const donor = [
            {
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


describe('POST /donors', ()=>{
    test("should response 201 - created", async()=>{
        let dataDonor = {
            stock: 2
        }

        let response = await request(app).post('/donors/1').send(dataDonor).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
    })

    // Error jenis darah tidak cocok
    test("should response 406 - Sorry your blood type is not suitable for donation.", async()=>{
        let response = await request(app).post('/donors/1').set('authorization', `Bearer ${token2}`)

        expect(response.status).toBe(406)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Sorry your blood type is not suitable for donation.")
    })

    // Error jenis darah tidak cocok AB-
    test("should response 406 - Sorry your blood type is not suitable for donation.", async()=>{
        let response = await request(app).post('/donors/2').set('authorization', `Bearer ${token4}`)

        expect(response.status).toBe(406)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Sorry your blood type is not suitable for donation.")
    })

    // Error jenis darah tidak cocok AB+
    test("should response 406 - Sorry your blood type is not suitable for donation.", async()=>{
        let response = await request(app).post('/donors/2').set('authorization', `Bearer ${token5}`)

        expect(response.status).toBe(406)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Sorry your blood type is not suitable for donation.")
    })

    // Error jenis darah tidak cocok B-
    test("should response 406 - Sorry your blood type is not suitable for donation.", async()=>{
        let response = await request(app).post('/donors/2').set('authorization', `Bearer ${token6}`)

        expect(response.status).toBe(406)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Sorry your blood type is not suitable for donation.")
    })

    // Error jenis darah tidak cocok A-
    test("should response 406 - Sorry your blood type is not suitable for donation.", async()=>{
        let response = await request(app).post('/donors/1').set('authorization', `Bearer ${token7}`)

        expect(response.status).toBe(406)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Sorry your blood type is not suitable for donation.")
    })

    // Error jenis darah tidak cocok O+
    test("should response 406 - Sorry your blood type is not suitable for donation.", async()=>{
        let response = await request(app).post('/donors/3').set('authorization', `Bearer ${token8}`)

        expect(response.status).toBe(406)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Sorry your blood type is not suitable for donation.")
    })

    // Error Profile belum dilengkapi
    test("should response 406 - Please complete your profile", async()=>{
        let response = await request(app).post('/donors/1').set('authorization', `Bearer ${token3}`)

        expect(response.status).toBe(406)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Please complete your profile")
    })

    // error belum login
    test("should response 401 - Invalid Token", async()=>{
        let dataDonor = {
            stock: 2
        }

        let response = await request(app).post('/donors/1').send(dataDonor)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    // error token salah
    test("should response 401 - Invalid Token", async()=>{
        let dataDonor = {
            stock: 2
        }

        let wrongToken = "jfowfhwfh"

        let response = await request(app).post('/donors/1').send(dataDonor).set('authorization', `Bearer ${wrongToken}`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "jwt malformed")
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
        expect(response.body[0]).toHaveProperty("Recipient", expect.any(Object))
        expect(response.body[0]).toHaveProperty("DonorConfirmation", expect.any(null || Object))
    })
})

describe('POST /donorconfirmation', ()=>{
    test("should response 201 - created", async()=>{
        let dataDonor = {
            location: "Mataram",
            stock: 400
        }

        let response = await request(app).post('/donorconfirmation/1').send(dataDonor).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
    })

    // error belum login
    test("should response 401 - Invalid Token", async()=>{
        let dataDonor = {
            location: "Mataram",
            stock: 400
        }

        let response = await request(app).post('/donorconfirmation/1').send(dataDonor)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    // error token salah
    test("should response 401 - Invalid Token", async()=>{
        let dataDonor = {
            location: "Mataram",
            stock: 400
        }

        let wrongToken = "jfowfhwfh"

        let response = await request(app).post('/donorconfirmation/1').send(dataDonor).set('authorization', `Bearer ${wrongToken}`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "jwt malformed")
    })

    // error tdk mengisi stock
    test("should response 400 - Location is required", async()=>{
        let dataDonor = {
            stock: 400
        }

        let response = await request(app).post('/donorconfirmation/1').send(dataDonor).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Location is required")
    })

    
})

describe('PATCH /donorconfirmation/:id', ()=>{
    test("should response 200 - Image succes to update", async()=>{
        let response = await request(app).patch('/donorconfirmation/1').attach("image", imageBuffer, "ketik.png").set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Image succes to update")
    })

    // error belum login
    test("should response 401 - Invalid Token", async()=>{
        let response = await request(app).patch('/donorconfirmation/1').attach("image", imageBuffer, "ketik.png")

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    // error token salah
    test("should response 401 - Invalid Token", async()=>{
        let wrongToken = "jfowfhwfh"

        let response = await request(app).patch('/donorconfirmation/1').attach("image", imageBuffer, "ketik.png").set('authorization', `Bearer ${wrongToken}`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "jwt malformed")
    })

    // error gk ngirimgambar
    test("should response 400 - Image must be upload", async()=>{
        let response = await request(app).patch('/donorconfirmation/1').attach("image").set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Image must be upload")
    })
})
