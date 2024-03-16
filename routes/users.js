const express = require('express')
const ControllerUser = require('../controller/controllerUser')
const router = express.Router()

router.get("/", ControllerUser.findUser)
router.post("/", ControllerUser.register)

module.exports = router