if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require("./routes/index")
const errorHandler = require('./middleware/errorHandler')

const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: 'dqywu178b', 
  api_key: '618681748195644', 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(router)

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app