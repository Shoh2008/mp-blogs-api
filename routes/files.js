const router = require("express").Router()
const fileUpload = require("express-fileupload")
const path = require("path")
const filesPayloadExists = require('../middleware/filesPayloadExists')
const fileExtLimiter = require('../middleware/fileExtLimiter')
const fileSizeLimiter = require('../middleware/fileSizeLimiter')

router.get("/:file", (req, res) => {
    const folder = '../files/'
    res.sendFile(path.join(__dirname, folder + req.params.file))
})

router.post('/',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg', ".mp3", ".mp4", ".gif", ".webp", ".jfif"]),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files
        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, '../files', files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })
        return res.json(Object.keys(files).toString())
    }
)

module.exports = router 