const { Op } = require("sequelize");
const {Recipient, User, Donor, DonorConfirmation} = require("../models/index")
const cloudinary = require("cloudinary").v2;

class ControllerRecipient {
    static async recipientPost(req, res, next) {
        try {
            const {stock, location, image, bloodType, description} = req.body
            const UserId = req.user.id

            // insert data to table recipients
            let result = await Recipient.create({stock, location, image, bloodType, description, UserId})

            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async recipientGetAll(req, res, next) {
        try {
            const {search} = req.query

            let option = {
                include: {
                    model: User,
                    attributes: { exclude: ['password'] }
                }
            }

            // Feature Search
            if(search) {
                option.where = {
                    location: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }
            

            let result = await Recipient.findAll(option)

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async recipientGetById(req, res, next) {
        try {
            const {id} = req.params

            let dataRecipient = await Recipient.findByPk(id)

            if(!dataRecipient) {
                throw {name: "Notfound", message: "Recipient Not Found"}
            }
 
            let result = await Recipient.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: User,
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: Donor,
                        include: {
                            model: DonorConfirmation
                        }
                    }
                ]
            })

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async patchRecipientImageProfile(req, res, next) {
        try {
            const {id} = req.params

            if(!req.file) {
                throw {name: "Badrequest", message: "Image must be upload"}
            }

            const b64File = Buffer.from(req.file.buffer).toString("base64")
            const dataURI = `data:${req.file.mimetype};base64,${b64File}`

            const uploadFile = await cloudinary.uploader
            .upload(dataURI, {
                resource_type: "auto",
                folder: "recipient",
                public_id: req.file.originalname
            })

            await Recipient.update({image: uploadFile.secure_url}, {
                where: {
                    id
                }
            })

            let dataRecipient = await Recipient.findByPk(id)

            if(!dataRecipient) {
                throw {name: "Notfound", message: "Data not found"}
            }

            res.status(200).json({
                message: `Image succes to update`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ControllerRecipient