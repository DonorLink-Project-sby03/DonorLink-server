const {Donor, DonorConfirmation} = require("../models/index")
const cloudinary = require("cloudinary").v2;

class ControllerDonor {
    static async postDonor(req, res, next) {
        try {
            const {stock} = req.body
            const UserId = req.user.id
            const {RecipientId} = req.params

            // insert data to table Donor
            let result = await Donor.create({stock, UserId, RecipientId})

            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async getDonorByUser(req, res, next) {
        try {
            const UserId = req.user.id

            // Get all donor by user login
            let result = await Donor.findAll({
                where: {
                    UserId
                }
            })

            res.status(200).json(result)
        } catch (err) {
            console.log(err, "<EErr");
            next(err)
        }
    }

    static async postDonorConfirmation(req, res, next) {
        try {
            const {DonorId} = req.params
            const {location, image} = req.body

            // insert data to table DonorConfirmation
            let result = await DonorConfirmation.create({DonorId, location, image})

            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async patchDonorConfirmationImageProfile(req, res, next) {
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
                folder: "donor_confirmation",
                public_id: req.file.originalname
            })

            await DonorConfirmation.update({image: uploadFile.secure_url}, {
                where: {
                    id
                }
            })

            let dataDonorConfirmation = await DonorConfirmation.findByPk(id)

            if(!dataDonorConfirmation) {
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

module.exports = ControllerDonor