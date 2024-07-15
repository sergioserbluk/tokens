//este controlador se encarga de realizar las operaciones CRUD de la tabla libros
//en la base de datos
const libros = require('../models/libroModels');
const connection = require('../config/db');
const e = require('express');
const authenticateUser = require('../middlewares/authMiddleware');
//funcion para obtener todos los libros
exports.getAllLibros = (req, res) => {
    connection.query('SELECT * FROM libros', (error, result) => {
        if (error) {
            res.status(500).send('Error getting the libros');
        } else {
            res.status(200).send(result);
        }
    });
};
//funcion para obtener un libro por isbn
exports.getLibroByIsbn = (req, res) => {
    const isbn = req.params.isbn;
    console.log(`Received ISBN: ${isbn}`); // Log para verificar el ISBN recibido

    connection.query('select libros.isbn, libros.titulo, generos.nombre, editoriales.nombre, libros.qr, libros.podcast, libros.pdf FROM libros JOIN editoriales ON libros.editorial = editoriales.idEditorial JOIN generos on libros.genero=editoriales.idEditorial WHERE isbn = ?', [isbn], (error, result) => {
        if (error) {
            console.error('Error executing query:', error); // Log para errores en la consulta
            res.status(500).send('Error getting the libro');
        } else {
            console.log('Query result:', result); // Log para verificar el resultado de la consulta
            if (result.length === 0) {
                res.status(404).send('Libro not found'); // Respuesta si no se encuentra el libro
            } else {
                res.status(200).send(result);
            }
        }
    });
};

//funcion para agregar un libro, cheqear si el usuario esta logueado
//desde postmaan agregar un header con la key x-access-token y el valor del token
//para obtener el token loguearse con el usuario y contraseña
//ejecutar el post de login y copiar el token que devuelve
//luego pegar el token en el header de postman donde dice x-access-token


// librosController.js


exports.addLibro = [authenticateUser, (req, res) => {
    const { isbn, titulo, genero, editorial, qr, podcast, pdf } = req.body;
    const newlibro = { isbn, titulo, genero, editorial, qr, podcast, pdf };

    connection.query('INSERT INTO libros SET ?', newlibro, (error, result) => {
        if (error) {
            res.status(500).send('Error adding the libro');
        } else {
            res.status(201).send('Libro added successfully');
        }
    });
}];
//funcion para actualizar un libro

//funcion para actualizar un libro
exports.updateLibro = [authenticateUser, (req, res) => {
    const isbn = req.params.isbn;
    const { titulo, genero, editorial, qr, podcast, pdf } = req.body;
    const updatedlibro = { titulo, genero, editorial, qr, podcast, pdf };

    console.log(`Received ISBN: ${isbn}`); // Log para verificar el ISBN recibido
    console.log('Updated libro data:', updatedlibro); // Log para verificar los datos actualizados

    connection.query('UPDATE libros SET ? WHERE isbn = ?', [updatedlibro, isbn], (error, result) => {
        if (error) {
            console.error('Error executing query:', error); // Log para errores en la consulta
            res.status(500).send('Error updating the libro');
        } else {
            console.log('Query result:', result); // Log para verificar el resultado de la consulta
            if (result.affectedRows === 0) {
                res.status(404).send('Libro not found'); // Respuesta si no se encuentra el libro
            } else {
                res.status(200).send('Libro updated successfully');
            }
        }
    });
}];
//funcion para eliminar un libro, debe estar logueado
//para obtener el token loguearse con el usuario y contraseña
//ejecutar el post de login y copiar el token que devuelve
//luego pegar el token en el header de postman donde dice x-access-token
//la ruta para eliminar un libro es http://localhost:3000/libros/123456

exports.deleteLibro = [authenticateUser, (req, res) => {
    const isbn = req.params.isbn;
    console.log('Deleting libro with ISBN:', isbn); // Log para verificar el ISBN
    connection.query('DELETE FROM libros WHERE isbn = ?', [isbn], (error, result) => {
        if (error) {
            res.status(500).send('Error deleting the libro');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Libro not found');
        } else {
            res.status(200).send('Libro deleted successfully');
        }
    });
}];

//get para obtener todos los libros ej: http://localhost:3000/libros
//get para obtener un libro por isbn ej: http://localhost:3000/libros/123456
//post para agregar un libro ej: http://localhost:3000/libros
//put para actualizar un libro ej: http://localhost:3000/libros/123456 y en el body poner los datos a actualizar

//delete para eliminar un libro ej: http://localhost:3000/libros/123456

