const express = require("express")
const ControllerProfile = require("../controller/ControllerProfile")
const authentication = require("../middleware/authentication")
const router = express.Router()

router.post('/', authentication, ControllerProfile.addProfile)
router.get('/', authentication, ControllerProfile.getProfile)

module.exports = router