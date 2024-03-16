const { User } = require("../models/index")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")

class ControllerUser {
    static async register(req, res, next) {
        try {
            let { name, email, username, password } = req.body

            let newUser = await User.create({ name, email, username, password })

            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }

    static async findUser(req, res, next) {
        try {
            let user = await User.findByPk(req.user.id)

            res.status(200).json({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email
            })
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
                throw { name: "Unauthorized", message: "Invalid email/password" }
            }

            const compare = comparePassword(password, user.password)
            if (!compare) {
                throw { name: "Unauthorized", message: "Invalid email/password" }
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
}

module.exports = ControllerUser