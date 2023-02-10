const express = require("express")
const path = require("path")
const cors = require("cors")
const fs = require('fs')

const PORT = process.env.PORT || 3500

const app = express()

app.use(cors())
require('./config.js')
app.use(express.json())


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"))
})

// routers
app.use("/users", require("./routes/users"))
app.use("/blogs", require("./routes/blogs"))
app.use("/files", require("./routes/files"))

// error
app.use((error, req, res) => {
    if (error.name == 'ValidationError') {
        return res.status(error.status).json({
            status: error.status,
            message: error.message.details[0].message,
            errorName: error.name,
            error: true,
        })
    }
    if (error.name == 'AuthorizationError') {
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
            errorName: error.name,
            error: true,
        })
    }
    if (error.status != 500) {
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
            errorName: error.name,
            error: true,
        })
    }
    fs.appendFileSync('./log.txt', `${req.url}__${req.method}__${Date.now()}__${error.name}__${error.message}\n`)
    return res.status(error.status).json({
        status: error.status,
        message: 'Internal Server Error',
        errorName: error.name,
        error: true,
    })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))