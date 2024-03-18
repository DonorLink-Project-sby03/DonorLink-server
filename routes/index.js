const express = require('express')
const router = express.Router()
const userRouter = require("../routes/users")
const userRecipient = require("../routes/recipient")
const donorRouter = require("../routes/donor")
const donorConfirmationRouter = require("../routes/donorconfirmation")
const ControllerUser = require('../controller/controllerUser')
const profileRouter = require('../routes/profile')

router.get("/", (req, res) => {
      res.json('Hello World!')
})

router.post("/login", ControllerUser.login)
router.post("/google-login", ControllerUser.googleLogin)

router.use("/users", userRouter)
router.use("/recipients", userRecipient)
router.use("/donors", donorRouter)
router.use("/donorconfirmation", donorConfirmationRouter)
router.use("/profile", profileRouter)

module.exports = router