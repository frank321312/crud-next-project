"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const dateConnect_1 = require("./dateConnect");
const cors_1 = __importDefault(require("cors"));
const validaciones_1 = require("./validaciones");
const consultasSQL_1 = require("./consultasSQL");
const nodemailer_1 = require("./nodemailer");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
exports.database = mysql_1.default.createConnection({
    user: dateConnect_1.db_connect.USERNAME,
    host: dateConnect_1.db_connect.HOST,
    password: dateConnect_1.db_connect.PASSWORD,
    database: dateConnect_1.db_connect.DATABASE
});
exports.database.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Conexion exitosa con la base de datos");
    }
});
const PORT = process.env.PORT || 8000;
var subpilaRegistro = [validaciones_1.validarNombre, validaciones_1.validarEmail, validaciones_1.validarPassword];
var subpilaIniciarSesion = [validaciones_1.validarEmail, validaciones_1.validarPassword];
app.post("/registro", subpilaRegistro, async (req, res) => {
    const nombre = req.body.Nombre;
    const email = req.body.Email;
    const password = req.body.Password;
    try {
        await (0, consultasSQL_1.buscarEmailNoValidado)(email);
        await (0, consultasSQL_1.buscarEmailUsuario)(email);
        await (0, consultasSQL_1.insertarUsuarioNoValidado)(nombre, email, password, (0, nodemailer_1.generarNumeroAleatorio)());
        const usuario = await (0, consultasSQL_1.obtenerDatosPorEmail)(email);
        await (0, nodemailer_1.nodemailerCode)(email, usuario.Codigo);
        return res.status(200).json({ message: "Los datos se insertaron correctamente", err: false, nombre: false, email: false, password: false });
    }
    catch (error) {
        console.log("Error, promesa rechazada, no se pudieron insertar los datos");
        console.log(error);
        return res.status(400).json({ message: error, err: true });
    }
});
app.post("/validar-registro", validaciones_1.validarCodigo, async (req, res) => {
    const codigo = req.body.Codigo;
    const email = req.body.Email;
    try {
        await (0, consultasSQL_1.buscarEmailUsuario)(email);
        const usuario = await (0, consultasSQL_1.obtenerDatosPorEmail)(email);
        if (usuario.Codigo === Number(codigo)) {
            console.log(usuario);
            await (0, consultasSQL_1.insertarUsuario)(usuario.Nombre, usuario.Email, usuario.Contrasena, usuario.Codigo);
            await (0, consultasSQL_1.eliminarUsuarioPorEmail)(usuario.Email);
            return res.status(200).json({ message: "Registro exitoso" });
        }
        return res.status(400).json({ message: "Codigo invalido" });
    }
    catch (error) {
        console.log("Error, promesa rechazada");
        console.log(error);
        return res.status(400).json({ messagge: error });
    }
});
app.delete("/eliminar-usuario", async (req, res) => {
    const email = req.body.Email;
    try {
        await (0, consultasSQL_1.eliminarUsuarioPorEmail)(email);
        return res.status(200).json({ message: "Usuario eliminado" });
    }
    catch (error) {
        console.log("Error, no se pudo eliminar el usuario");
        console.log(error);
        return res.status(400).json({ message: "No se pudo eliminar el usuario" });
    }
});
app.post("/iniciar-sesion", subpilaIniciarSesion, async (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;
    try {
        var respuesta = await (0, consultasSQL_1.obtnerUsuario)(email, password);
        return res.status(200).json({ message: respuesta });
    }
    catch (error) {
        console.log("Error, promesa rechazada, no se pudieron encontrar los datos");
        console.log(error);
        return res.status(400).json({ message: error });
    }
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
