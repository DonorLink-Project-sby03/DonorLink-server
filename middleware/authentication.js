const User = require("../models/user")

async function authentication(req,res,next){
    try {
        let { authorization } = req.headers
        if(authorization){
            throw {name: "Unauthorized", message: "Invalid Token"}
        }

        let token = authorization.split(' ')[1]
        // token = 

        let findUser = await User.findByPk(token.id)
        if(!findUser){
            throw {name:"Unauthorized", message: "Invalid Token"}
        }

        req.user={
            id:token.id
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication