const {Recipient, User} = require("../models/index")

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
}

module.exports = ControllerRecipient