 //en el user model se guardan los usuarios, aca puedo conectar a una base de datos para guardar los usuarios
 //intentemos eso con una base de datos de mysql en el localhost llamada libros
    //para eso necesitamos instalar el modulo mysql
    //npm install mysql
    //luego de instalarlo vamos a crear una conexion a la base de datos
    //para eso vamos a crear un archivo llamado db.js
    //en la carpeta config
    //y vamos a escribir el siguiente codigo
    //const mysql = require('mysql');
    //const connection = mysql.createConnection({
    //    host: 'localhost',
    //    user
    //    password
    //    database
    //});
    //module.exports = connection;
   
    
    //luego vamos a modificar el archivo userModels.js
    const connection = require('../config/db');
    const users = [];
    connection.query('SELECT * FROM users', (error, result) => {
        if (error) {
            console.log('Error getting the users');
        } else {
            result.forEach(user => {
                users.push(user);
            });
        }
    });
    module.exports = users;
  



//let users=[];
//module.exports = users;