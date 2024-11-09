const User = require('../models/user')

exports.crearUsuario = async (req, res) => {
    try{
        const { username, email, password } = req.body
        const user = new User({
            username,
            email,
            password
        })

        user.password = await user.encryptPassword(user.password)

        await user.save()
        
        return res.json({user: username, email: email, password: password})

    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).send("Hubo un error al crear usuario");
    }
}

exports.obtenerUsuario = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await User.findOne({email: email})
        
        if (!user) {return res.status(404).send('El usuario no existe')}

        const validPassword = await user.validatePassword(password)

        if(!validPassword) return res.status(401).json({auth: false})
        return res.json({
            auth: true,
            user: user.username,
            email: user.email,
            encryptedPassword: user.password // Este es el hash encriptado de la contraseña
        });

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al obtener usuario')
    }
}