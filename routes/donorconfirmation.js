const express = require("express")
const ControllerDonor = require("../controller/ControllerDonor")
const authentication = require("../middleware/authentication")
const router = express.Router()

router.post("/:DonorId", authentication, ControllerDonor.postDonorConfirmation)

module.exports = router