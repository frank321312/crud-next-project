"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuarioPorEmail = exports.obtenerDatosPorEmail = exports.obtnerUsuario = exports.buscarEmailUsuario = exports.buscarEmailNoValidado = exports.insertarUsuario = exports.insertarUsuarioNoValidado = void 0;
const _1 = require(".");
// Insertar datos en la tabla UsuarioNoValidado
const insertarUsuarioNoValidado = async (Nombre, Email, Password, Codigo) => {
    const altaUsuarioNoValidado = `CALL altaUsuarioNoValidado(?,?,?,?)`;
    return new Promise((resolve, reject) => {
        if (!Nombre || !Email || !Password) {
            reject("Error, datos invalidos");
        }
        else {
            _1.database.query(altaUsuarioNoValidado, [Nombre, Email, Password, Codigo], (err, _results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve("Datos insertados correctamente");
                }
            });
        }
    });
};
exports.insertarUsuarioNoValidado = insertarUsuarioNoValidado;
// Inserta datos en la tabla Usuario
const insertarUsuario = async (Nombre, Email, Password, Codigo) => {
    const altaUsuario = `CALL altaUsuario(?,?,?,?)`;
    return new Promise((resolve, reject) => {
        if (!Nombre || !Email || !Password) {
            reject("Error, datos invalidos de usuario");
        }
        else {
            _1.database.query(altaUsuario, [Nombre, Email, Password, Codigo], (err, _results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve("Datos insertados correctamente");
                }
            });
        }
    });
};
exports.insertarUsuario = insertarUsuario;
// Verifica que el usuario no exista en la tabla UsuarioNoValidado, si existe quiere decir que el
// Email esta en uso por lo que lanzara un error
const buscarEmailNoValidado = async (Email) => {
    const queryEmail = "CALL obtenerEmailNoValidado(?)";
    return new Promise((resolve, reject) => {
        if (!Email) {
            reject("Error, dato invalido");
        }
        else {
            _1.database.query(queryEmail, [Email], (err, results) => {
                if (err) {
                    reject(err);
                }
                else if (results[0].length > 0) {
                    reject("Error, email en uso");
                }
                else {
                    resolve("Datos insertados correctamente");
                }
            });
        }
    });
};
exports.buscarEmailNoValidado = buscarEmailNoValidado;
// Verifica que en la tabla Usuario no existe el email que le pasamos como argumento, si existe lanzara un error
const buscarEmailUsuario = async (Email) => {
    const queryEmail = "CALL obtenerEmail(?)";
    return new Promise((resolve, reject) => {
        if (!Email) {
            reject("Error, dato invalido");
        }
        else {
            _1.database.query(queryEmail, [Email], (err, results) => {
                if (err) {
                    reject(err);
                }
                else if (results[0].length > 0) {
                    reject("Error, email en uso");
                }
                else {
                    resolve("Datos insertados correctamente");
                }
            });
        }
    });
};
exports.buscarEmailUsuario = buscarEmailUsuario;
// Verificar que el usuario exista en la tabla Usuario, si existe validara que la contraseña sea igual
// Si no lo es lanzara un error, lo mismo para el Email si no existe se asume que el usuario no existe
const obtnerUsuario = async (Email, Password) => {
    const queryEmail = "CALL obtenerEmail(?)";
    return new Promise((resolve, reject) => {
        if (!Email) {
            reject("Error, dato invalido");
        }
        else {
            _1.database.query(queryEmail, [Email], (err, results) => {
                if (err) {
                    reject(err);
                }
                else if (results[0].length > 0) {
                    if (Password == results[0][0].Contrasena) {
                        resolve("Inicio de sesion exitosa");
                    }
                    else {
                        reject("Error, contraseña invalida");
                    }
                }
                else {
                    reject("Error, no existe el usuario");
                }
            });
        }
    });
};
exports.obtnerUsuario = obtnerUsuario;
// Obtiene todos los datos del usuario de la tabla Usuario en base a un email especifico, si existe
// Devolvera todos los datos de ese usuario, si no existe lanzara un error
const obtenerDatosPorEmail = async (Email) => {
    const queryCodigo = "SELECT * FROM UsuarioNoValidado WHERE Email = ?";
    return new Promise((resolve, reject) => {
        if (!Email) {
            reject("Email no encontrado");
        }
        else {
            _1.database.query(queryCodigo, [Email], (err, results) => {
                if (err) {
                    reject(err);
                }
                else if (results[0] == undefined) {
                    reject("Error, email no encontrado");
                }
                else {
                    resolve(results[0]);
                }
            });
        }
    });
};
exports.obtenerDatosPorEmail = obtenerDatosPorEmail;
// Elimina un usuario de la tabla UsuarioNoValidado en base al Email
const eliminarUsuarioPorEmail = async (Email) => {
    const deleteUsuarioNoValidado = "DELETE FROM UsuarioNoValidado WHERE Email = ?";
    return new Promise((resolve, reject) => {
        _1.database.query(deleteUsuarioNoValidado, [Email], (err, _results) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("Usuario eliminado");
            }
        });
    });
};
exports.eliminarUsuarioPorEmail = eliminarUsuarioPorEmail;
