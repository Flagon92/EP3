const express = require('express')
const conectarDB = require('./config/db')
const config = require('./config/global')
const cors = require('cors')

const app = express()

conectarDB()

app.use(cors({
    origin: ['http://127.0.0.1:5500'],
    credentials: true
}))
app.use(express.json())

app.use('/api', require('./routes/usuario'))

app.listen(config.port, () => {
    console.log('El servidor corriendo por el puerto 3000')
})