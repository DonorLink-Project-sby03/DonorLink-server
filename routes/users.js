const express = require('express')
const ControllerUser = require('../controller/controllerUser')
const authentication = require('../middleware/authentication')
const router = express.Router()


router.get("/", authentication, ControllerUser.findUser)

router.post("/", ControllerUser.register)

module.exports = router