const express = require("express")
const ControllerRecipient = require("../controller/ControllerRecipient")
const authentication = require("../middleware/authentication")
const router = express.Router()

const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })


router.post("/", authentication, ControllerRecipient.recipientPost)
router.get("/", ControllerRecipient.recipientGetAll)
router.get("/:id", ControllerRecipient.recipientGetById)

router.patch("/:id", authentication, upload.single('image'), ControllerRecipient.patchRecipientImageProfile)

module.exports = router