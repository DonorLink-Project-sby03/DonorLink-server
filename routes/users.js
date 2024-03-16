const express = require('express')
const ControllerUser = require('../controller/controllerUser')
const authentication = require('../middleware/authentication')
const router = express.Router()

<<<<<<< HEAD
router.get("/", authentication, ControllerUser.findUser)
=======

router.get("/", ControllerUser.findUser)
>>>>>>> 6036e4e (feat: recipient)
router.post("/", ControllerUser.register)
router.post("/login", ControllerUser.login)

module.exports = router