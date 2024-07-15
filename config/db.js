//este archivo es el encargado de la conexión a la base de datos

const mysql = require('mysql');
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password:'',
database: 'libros'
});
connection.connect((error) => {
    if (error) {
        console.log('Error connecting to the database');
    } else {
        console.log('Database connected');
    }
});
module.exports = connection;