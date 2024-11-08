const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const user = require('../models/user')

router.post('/', userController.crearUsuario)
router.get('/', userController.obtenerUsuario)

module.exports = router

