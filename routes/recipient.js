const express = require("express")
const ControllerRecipient = require("../controller/ControllerRecipient")
const authentication = require("../middleware/authentication")
const router = express.Router()


router.post("/", authentication, ControllerRecipient.recipientPost)
router.get("/", ControllerRecipient.recipientGetAll)
router.get("/:id", ControllerRecipient.recipientGetById)

module.exports = router