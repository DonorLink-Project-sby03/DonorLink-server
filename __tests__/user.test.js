const app = require('../app')
const { User, sequelize } = require('../models/index');
const { hashPassword } = require('../helpers/bcrypt');
const request = require('supertest')
const { queryInterface } = sequelize

beforeAll(async()=>{
    const user = { 
        "username": "user test",
        "name":"test",
        "email": "test@example.com", 
        "password": hashPassword("123456"),
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
    await queryInterface.bulkInsert('Users', user)

    // jika ada data usernya
    /*
    const seedUsers = require('../data/user.json').map(el=>{
        el.createdAt = el.updatedAt = new Date()
        el.password = hashPassword(el.password)
        return el
    })
    await queryInterface.bulkInsert('Users', seedUsers)
    */
})

afterAll(async()=>{
    await queryInterface.bulkDelete('Users', null, {
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
    test('should response 400 - Email must be require', async()=>{
        let user = { //nanti diganti user yg dari user.json
            email:'',
            password: 'secret'
        }

        const respon = await request(app).post('/login').send(user)

        expect(respon.status).toBe(400)
        expect(respon.body).toHaveProperty("message", "Email must be require")
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
    test('should response 400 - Password must be require', async()=>{
        let user = {
            email:"test@example.com",
            password: ""
        }

        const respon = await request(app).post('/login').send(user)

        expect(respon.status).toBe(400)
        expect(respon.body).toHaveProperty("message", "Password must be require")
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
        let user = await User.create({
            name:"new user",
            username:"user", 
            email:"user@gmail.com", 
            password:'secret'
        })

        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("username", expect.any(String))
        expect(response.body).toHaveProperty("name", expect.any(String))
        expect(response.body).toHaveProperty("email", user.email)
        expect(response.body).toHaveProperty("password", expect.any(String))
    })

    // jika email tdk diberikan
    test('should response 400 - Email must be require', async()=>{
        let user = {
            email:"", 
            password:'secretTest'
        }

        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Email must be require")
    })

    // jika email sudah ada
    test('should response 400 - email unique', async()=>{
        let user = {
            email:"test@example.com",
            password:'secret'
        }

        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Email must be unique")
    })

    // password string kosong
    test('should response 400 - Password must be require', async()=>{
        let user = {
            email:'userTest2gmail.com',
            password:''
        }

        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Password must be require")
    })
    
    // email format salah
    test('should response 400 - Email must be type email', async()=>{
        let user = {
            email:'userTestgmailcom',
            password:'secret'
        }

        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Email must be type email")
    })
})