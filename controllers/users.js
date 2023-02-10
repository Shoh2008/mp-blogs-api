const { InternalServerError } = require('../utils/error.js')

const id = () => { const key = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'i', 'I', '1', '2', '3', '4', '5', '6', '7']; return `${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}${key[parseInt(Math.random() * 23)]}` };

let users = []

const GET = (req, res, next) => {
    try {
        return res.status(200).json(users)
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

const GETONE = (req, res, next) => {
    try {
        const user = users.find(e => e.id === req.params.id)
        return res.status(200).json(user)
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

const POST = (req, res, next) => {
    try {
        const user = { id: id(), ...req.body }
        users.push(user)
        return res.status(201).json(user)
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

const PUT = (req, res, next) => {
    try {
        const user = users.find(e => e.id === req.params.id)
        const index = users.indexOf(user)
        users.splice(index, 1, { id: req.params.id, ...req.body })
        return res.status(200).json(user)
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

const DELETE = (req, res, next) => {
    try {
        const user = users.find(e => e.id === req.params.id)
        const index = users.indexOf(user)
        users.splice(index, 1)
        return res.status(200).json(user)
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

module.exports = { GET, GETONE, POST, PUT, DELETE }