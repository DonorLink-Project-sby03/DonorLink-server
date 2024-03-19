const {Donor, DonorConfirmation, User, Recipient, Profile} = require("../models/index")
const cloudinary = require("cloudinary").v2;

class ControllerDonor {
    static async postDonor(req, res, next) {
        try {
            const {stock} = req.body
            const UserId = req.user.id
            const {RecipientId} = req.params

            // find user include profile
            let findUser = await User.findOne({
                where: {
                    id: req.user.id
                },
                include: {
                    model: Profile
                },
                attributes: { exclude: ['password'] }
            })


            if(!findUser.Profile) {
                throw { name: "NotAcceptable", message: "Please complete your profile" }
            }

            // find recipient
            const findRecipient = await Recipient.findOne({
                where: {
                    id: RecipientId
                }
            })

            console.log(findUser.Profile.bloodType, "<<findUser.Profile.bloodType");
            console.log(findRecipient.bloodType, "<<findRecipient.bloodType");

            // check is the blood type the same
            if(findUser.Profile.bloodType === "AB+") {
                if(findRecipient.bloodType !== "AB+") {
                    throw { name: "NotAcceptable", message: "Sorry your blood type is not suitable for donation." }
                }
            }

            if(findUser.Profile.bloodType === "AB-") {
                if(findRecipient.bloodType !== "AB+" && findRecipient.bloodType !== "AB-") {
                    throw { name: "NotAcceptable", message: "Sorry your blood type is not suitable for donation." }
                }
            }

            if(findUser.Profile.bloodType === "B+") {
                if(findRecipient.bloodType !== "B+") {
                    throw { name: "NotAcceptable", message: "Sorry your blood type is not suitable for donation." }
                }
            }

            if(findUser.Profile.bloodType === "B-") {
                if(findRecipient.bloodType !== "AB+" && findRecipient.bloodType !== "AB-" && findRecipient.bloodType !== "B+" && findRecipient.bloodType !== "B-") {
                    throw { name: "NotAcceptable", message: "Sorry your blood type is not suitable for donation." }
                }
            }

            if(findUser.Profile.bloodType === "A+") {
                if(findRecipient.bloodType !== "A+" && findRecipient.bloodTypee !== "AB+") {
                    throw { name: "NotAcceptable", message: "Sorry your blood type is not suitable for donation." }
                }
            }

            if(findUser.Profile.bloodType === "A-") {
                if(findRecipient.bloodType !== "AB+" && findRecipient.bloodType !== "AB-" && findRecipient.bloodType !== "A+" && findRecipient.bloodType !== "A-") {
                    throw { name: "NotAcceptable", message: "Sorry your blood type is not suitable for donation." }
                }
            }

            if(findUser.Profile.bloodType === "O+") {
                if(findRecipient.bloodType !== "O+" && findRecipient.bloodType !== "A+" && findRecipient.bloodType !== "B+" && findRecipient.bloodType !== "AB+") {
                    throw { name: "NotAcceptable", message: "Sorry your blood type is not suitable for donation." }
                }
            }

            // insert data to table Donor
            let result = await Donor.create({UserId, RecipientId})

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
                },
                include: [
                    {
                        model: Recipient,
                        include: {
                            model: User,
                            attributes: { exclude: ['password'] }
                        }
                    },
                    {
                        model: DonorConfirmation,
                    }
                ]
            })

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async postDonorConfirmation(req, res, next) {
        try {
            const {DonorId} = req.params
            const {location, stock} = req.body

            // insert data to table DonorConfirmation
            let result = await DonorConfirmation.create({DonorId, location, stock})

            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async patchDonorConfirmationImageProfile(req, res, next) {
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