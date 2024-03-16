const {Recipient} = require("../models/index")

class ControllerRecipient {
    static async recipientPost(req, res, next) {
        try {
            const {stock, location, image, bloodType, description} = req.body
            const UserId = "134424"
            // insert data to table recipients
            let result = await Recipient.create({stock, location, image, bloodType, description, UserId})

            res.status(201).json(result)
        } catch (err) {
            console.log(err, "<<Errr");
            next(err)
        }
    }
}

module.exports = ControllerRecipient