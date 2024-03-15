const User = require("../models/user")

class ControllerUser {
    static async register(req,res,next){
        try {
            let { name, email, username, password } = req.body

            let newUser = await User.create({ name, email, username, password })

            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }

    static async findUser (req,res,next){
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
}

module.exports = ControllerUser