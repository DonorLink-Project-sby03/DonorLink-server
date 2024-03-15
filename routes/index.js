const express = require('express')
const router = express.Router()
const userRouter = require("../routes/users")

router.get("/", (req, res) => {
      res.json('Hello World!')
})

router.use("/users", userRouter)

module.exports = router