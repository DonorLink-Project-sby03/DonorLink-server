const {Recipient, User, Donor, DonorConfirmation} = require("../models/index")

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
        console.log("<<<MasukAll");
        try {
            let result = await Recipient.findAll({
                include: {
                    model: User,
                    attributes: { exclude: ['password'] }
                }
            })

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async recipientGetById(req, res, next) {
        console.log("<<<Masuk by Id");
        try {
            const {id} = req.params

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
}

module.exports = ControllerRecipient