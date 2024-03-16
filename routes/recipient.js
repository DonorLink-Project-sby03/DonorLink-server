const express = require("express")
const ControllerRecipient = require("../controller/ControllerRecipient")
const authentication = require("../middleware/authentication")
const router = express.Router()


router.post("/", ControllerRecipient.recipientPost)

module.exports = router