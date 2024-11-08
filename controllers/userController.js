const User = require('../models/user')
const config = require('../config/global')

exports.crearUsuario = async (req, res) => {
    try{
        
        /*const { username, email, password } = req.body
        console.log(username, email, password)
        res.send('Usuario Creado')*/

        const { username, email, password } = req.body
        const user = new User({
            username,
            email,
            password
        })

        user.password = await user.encryptPassword(user.password)

        await user.save()
        
        res.json({auth: true})

    }catch(error){
        console.log(error)
        res.status(500).send('Hubo un error al crear usuario')
    }
}

exports.obtenerUsuario = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await User.findOne({email: email})
        
        if (!user) {return res.status(404).send('El usuario no existe')}

        const validPassword = await user.validatePassword(password)

        if(!validPassword) return res.status(401).json({auth: false})

        res.json({
            auth: true,
            encryptedPassword: user.password // Este es el hash encriptado de la contraseña
        });

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al obtener usuario')
    }
}