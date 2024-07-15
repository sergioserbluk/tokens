//modelo de libro, lo que se va a guardar en la base de datos
//los atributos de la clase libro son los atributos de la tabla libro en la base de datos

const connection = require('../config/db');
const libros = [];
connection.query('SELECT * FROM libros', (error, result) => {
    if (error) {
        console.log('Error getting the libros');
    } else {
        result.forEach(libro => {
            libros.push(libro);
        });
    }
});
module.exports = libros;