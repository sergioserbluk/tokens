//routing para libros
const express = require('express');
const librosControllers = require('../controllers/librosControllers');

const router = express.Router();
router.get('/getall', librosControllers.getAllLibros);
router.get('/:isbn', librosControllers.getLibroByIsbn);
router.post('/libros', librosControllers.addLibro);
router.put('/:isbn', librosControllers.updateLibro);
router.delete('/:isbn', librosControllers.deleteLibro);
module.exports = router;//esta bien exportar routerLibros? deberia ser router? librosRoutes

//para consultar todos los libros desde postman
//GET http://localhost:3000/getall
//para consultar un libro por isbn desde postman
//GET http://localhost:3000/libros/ y en el body poner el isbn
//para agregar un libro desde postman
//POST http://localhost:3000/libros y en el body poner los datos del libro
//para actualizar un libro desde postman
//PUT http://localhost:3000/libros/ y en el body poner los datos a actualizar
//para eliminar un libro desde postman
//DELETE http://localhost:3000/libros/ y en el body poner el isbn del libro a eliminar

