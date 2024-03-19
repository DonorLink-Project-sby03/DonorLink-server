const app = require('../app')
const { sequelize } = require('../models/index');
const { hashPassword } = require('../helpers/bcrypt');
const request = require('supertest')

beforeAll(async()=>{
    try {
        const user = [{ 
            "username": "user test",
            "name":"test",
            "email": "test@example.com", 
            "password": hashPassword("123456"),
            "createdAt": new Date(),
            "updatedAt": new Date()
        }]
        await sequelize.queryInterface.bulkInsert('Users', user, {})
    
        // jika ada data usernya
        /*
        const seedUsers = require('../data/user.json').map(el=>{
            el.createdAt = el.updatedAt = new Date()
            el.password = hashPassword(el.password)
            return el
        })
        await queryInterface.bulkInsert('Users', seedUsers)
        */
    } catch (error) {
        console.log(error,'<<< error before all');
    }
})

afterAll(async()=>{
    await sequelize.queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

describe('POST /login', ()=>{
    test('shoult response with status code 200', async ()=>{
        const login = { //nanti diganti user yg dari user.json
            "email": "test@example.com", 
            "password": "123456"
        }

        const response = await request(app).post('/login').send(login)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("access_token", expect.any(String))
    })

    // jika tidak memasukkan email
    test('should response 400 - Email and password is required', async()=>{
        let user = { //nanti diganti user yg dari user.json
            email:'',
            password: 'secret'
        }

        const respon = await request(app).post('/login').send(user)
        console.log(respon.body,'<< respon login tanpa email');

        expect(respon.status).toBe(400)
        expect(respon.body).toHaveProperty("message", "Email and password is required")
    })

    // jika email salah
    test('should response 401 - Invalid email or password', async()=>{
        let user = {
            email:'emailSalah@gmail.com',
            password: "123456"
        }

        const respon = await request(app).post('/login').send(user)

        expect(respon.status).toBe(401)
        expect(respon.body).toHaveProperty("message", "Invalid email or password")
    })

    //jika tdk memasukkan password
    test('should response 400 - Email and password is required', async()=>{
        let user = {
            email:"test@example.com",
            password: ""
        }

        const respon = await request(app).post('/login').send(user)

        expect(respon.status).toBe(400)
        expect(respon.body).toHaveProperty("message", "Email and password is required")
    })

    // jika password salah
    test('should response 401 - Invalid email or password', async()=>{
        let user = {
            email:"test@example.com",
            password: 'passwordSalah'
        }

        const respon = await request(app).post('/login').send(user)

        expect(respon.status).toBe(401)
        expect(respon.body).toHaveProperty("message", "Invalid email or password")
    })
})

describe('POST /users', ()=>{
    test('should response 201 - created', async()=>{
        let user = {
            name:"new user",
            username:"user", 
            email:"user@gmail.com", 
            password:'secret'
        }

        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("username", expect.any(String))
        expect(response.body).toHaveProperty("name", expect.any(String))
        expect(response.body).toHaveProperty("email", user.email)
    })

    // jika email tdk diberikan
    test('should response 400 - Email is required', async()=>{
        const user = { 
            "username": "user test1",
            "name":"test1",
            "email": "", 
            "password": "secret",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }

        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Email is required")
    })

    // jika email sudah ada
    test('should response 400 - email unique', async()=>{
        const user = { 
            "username": "user test2",
            "name":"test2",
            "email": "test@example.com", 
            "password": "secret",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }

        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Email must be unique")
    })

    // password string kosong
    test('should response 400 - Password is required', async()=>{
        const user = { 
            "username": "user test3",
            "name":"test3",
            "email": "test3@example.com", 
            "password": "",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }

        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Password is required")
    })
    
    // email format salah
    test('should response 400 - Email must be type email', async()=>{
        const user = { 
            "username": "user test4",
            "name":"test4",
            "email": "testexample", 
            "password": "secret",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }

        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Email must be type email")
    })
})