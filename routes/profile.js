const express = require("express")
const ControllerProfile = require("../controller/ControllerProfile")
const authentication = require("../middleware/authentication")
const router = express.Router()

const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

router.post('/', authentication, ControllerProfile.addProfile)
router.get('/', authentication, ControllerProfile.getProfile)

router.patch("/:id", authentication, upload.single('image'), ControllerProfile.patchImageProfile)

module.exports = router