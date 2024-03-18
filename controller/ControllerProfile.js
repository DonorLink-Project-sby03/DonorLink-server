const { Profile } = require("../models/index")
const { User } = require("../models/index")
const cloudinary = require("cloudinary").v2;

class ControllerProfile {
    static async addProfile(req, res, next) {
        try {
            let profileCheck = await Profile.findOne({
                where:{
                    UserId:req.user.id
                }
            })
            if(profileCheck){
                throw {name:"Badrequest", message:"Already have profile"}
            }

            let { identityNumber, gender, address, job, dateOfBirth, phoneNumber, imageUrl, bloodType } = req.body

            let profile = await Profile.create({ UserId: req.user.id, identityNumber, gender, address, job, dateOfBirth, phoneNumber, imageUrl, bloodType })

            res.status(201).json(profile)
        } catch (error) {
            next(error)
        }
    }

    static async getProfile(req, res, next){
        try {
            let profile = await Profile.findOne({
                UserId:req.user.id,
                include: {
                    model: User,
                    where: {
                        id: req.user.id
                    }
                }
            })
            res.status(200).json(profile)
        } catch (error) {
            next(error)
        }
    }

    static async patchImageProfile(req, res, next){
        try {
            const {id} = req.params

            if(!req.file) {
                throw {name: "ImageBedRequest", message: "Image must be upload"}
            }

            const b64File = Buffer.from(req.file.buffer).toString("base64")
            const dataURI = `data:${req.file.mimetype};base64,${b64File}`

            const uploadFile = await cloudinary.uploader
            .upload(dataURI, {
                resource_type: "auto",
                folder: "profile",
                public_id: req.file.originalname
            })

            await Profile.update({imageUrl: uploadFile.secure_url}, {
                where: {
                    id
                }
            })

            let dataProfile = await Profile.findByPk(id)

            if(!dataProfile) {
                throw {name: "Notfound", message: "Data not found"}
            }

            res.status(200).json({
                message: `Image succes to update`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerProfile