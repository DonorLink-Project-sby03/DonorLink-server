const express = require("express")
const ControllerDonor = require("../controller/ControllerDonor")
const authentication = require("../middleware/authentication")
const router = express.Router()

const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

router.post("/:DonorId", authentication, ControllerDonor.postDonorConfirmation)

router.patch("/:id", authentication, upload.single('image'), ControllerDonor.patchDonorConfirmationImageProfile)

module.exports = router