const express = require("express")
const router = express.Router()
const ControllerDonor = require("../controller/ControllerDonor")
const authentication = require("../middleware/authentication")

router.get("/", authentication, ControllerDonor.getDonorByUser)
router.post("/:RecipientId", authentication, ControllerDonor.postDonor)


module.exports = router