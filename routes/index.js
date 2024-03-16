const express = require('express')
const router = express.Router()
const userRouter = require("../routes/users")
const userRecipient = require("../routes/recipient")
const ControllerUser = require('../controller/controllerUser')

router.get("/", (req, res) => {
      res.json('Hello World!')
})

router.post("/login", ControllerUser.login)

router.use("/users", userRouter)
router.use("/recipients", userRecipient)

module.exports = router