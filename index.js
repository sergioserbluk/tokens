const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index'); // Importa el router desde el archivo de rutas
app.use(bodyParser.json());
app.use('/', routes); // Usa el router como middleware


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});