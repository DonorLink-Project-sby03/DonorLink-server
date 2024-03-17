const { Profile } = require("../models/index")
const { User } = require("../models/index")

class ControllerProfile {
    static async addProfile(req, res, next) {
        try {
            let { identityNumber, gender, address, job, dateOfBirth, phoneNumber, imageUrl, bloodType } = req.body

            let profile = await Profile.create({ UserId: req.user.id, identityNumber, gender, address, job, dateOfBirth, phoneNumber, imageUrl, bloodType })

            res.status(201).json(profile)
        } catch (error) {
            next(error)
        }
    }

    static async getProfile(req, res, next){
        try {
            let profile = await Profile.findOne({UserId:req.user.id, include: User })
            res.status(200).json(profile)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerProfile