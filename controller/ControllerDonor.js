const {Donor, DonorConfirmation} = require("../models/index")

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
}

module.exports = ControllerDonor