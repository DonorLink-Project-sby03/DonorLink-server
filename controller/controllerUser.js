const { User, Profile } = require("../models/index")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

class ControllerUser {
    static async register(req, res, next) {
        try {
            let { name, email, username, password } = req.body

            let newUser = await User.create({ name, email, username, password })

            res.status(201).json({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username
            })
        } catch (error) {
            next(error)
        }
    }

    static async findUser(req, res, next) {
        try {
            let user = await User.findOne({
                where: {
                    id: req.user.id
                },
                include: {
                    model: Profile
                },
                attributes: { exclude: ['password'] }
            })

            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw { name: "Badrequest", message: "Email and password is required" }
            }
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                throw { name: "Unauthorized", message: "Invalid email or password" }
            }

            const compare = comparePassword(password, user.password)
            if (!compare) {
                throw { name: "Unauthorized", message: "Invalid email or password" }
            }

            const createToken = signToken({
                id: user.id
            })

            res.status(200).json({
                access_token: createToken
            })

        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            console.log(req.headers);
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();

            // make random for dummy password and username
            const random = Math.random()
            const time = new Date().getMilliseconds()

            // find or create user in database
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                  name: `${payload.given_name} ${payload.family_name}`,
                  email: payload.email,
                  password: 'psw-fr' + random + time,
                  username: 'user-fr' + random + time
                },
                hooks: false
            });

            const access_token = signToken({id: user.id})

            res.status(200).json({access_token})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ControllerUser