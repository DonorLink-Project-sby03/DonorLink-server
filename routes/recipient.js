const express = require("express")
const ControllerRecipient = require("../controller/ControllerRecipient")
const authentication = require("../middleware/authentication")
const router = express.Router()


router.post("/", authentication, ControllerRecipient.recipientPost)
router.get("/", authentication, ControllerRecipient.recipientGetAll)

module.exports = router