const express = require('express');
const conectarDB = require('./config/db');
const config = require('./config/global');
const cors = require('cors');
const path = require('path'); // Importa 'path' para manejar rutas de archivos

const app = express();

// Conectar a la base de datos
conectarDB();

// Configurar CORS
app.use(cors({
    origin: ['http://127.0.0.1:5500'], // Asegúrate de que tu cliente pueda acceder
    credentials: true
}));

// Permitir JSON en las solicitudes
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'views' dentro de 'EP3-master'
app.use(express.static(path.join(__dirname, 'views')));

// Cuando alguien acceda a la raíz ('/'), servir el archivo 'index.html'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Definir las rutas de la API (por ejemplo, la ruta '/api' para usuarios)
app.use('/api', require('./routes/usuario'));

// Ruta para el dashboard
app.get('/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// Escuchar en el puerto definido en la configuración
app.listen(config.port, () => {
    console.log(`El servidor está corriendo en el puerto ${config.port}`);
});
