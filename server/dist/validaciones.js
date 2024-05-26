"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCodigo = exports.validarPassword = exports.validarEmail = exports.validarNombre = void 0;
const validarNombre = (req, res, next) => {
    const body = req.body;
    const { Nombre } = body;
    console.log(req.body);
    if (!Nombre || Nombre.length < 3 || Nombre[0] == " " || Nombre[Nombre.length - 1] == " " || Nombre.length > 30) {
        return res.status(400).json({ message: "Nombre invalido", nombre: true, email: false, password: false });
    }
    next();
};
exports.validarNombre = validarNombre;
const validarEmail = (req, res, next) => {
    const body = req.body;
    const { Email } = body;
    if (!Email || Email.length < 11 || Email[0] == " " || Email[Email.length - 1] == " " || Email.length > 45 || Email.indexOf("@gmail.com") == -1) {
        return res.status(400).json({ message: "Email invalido", email: true, nombre: false, password: false });
    }
    next();
};
exports.validarEmail = validarEmail;
const validarPassword = (req, res, next) => {
    const body = req.body;
    const { Password } = body;
    if (!Password || Password[0] == " " || Password[Password.length - 1] == " " || Password.length > 25 || Password.length < 3) {
        return res.status(400).json({ message: "Contraseña invalida", password: true, email: false, nombre: false });
    }
    next();
};
exports.validarPassword = validarPassword;
const validarCodigo = (req, res, next) => {
    const body = req.body;
    const { Codigo } = body;
    if (Codigo == undefined || isNaN(Number(Codigo)) || Codigo.toString()[0] == " " || Codigo.toString()[Codigo.toString().length - 1] == " ") {
        return res.status(400).json({ message: "Codigo invalido" });
    }
    next();
};
exports.validarCodigo = validarCodigo;
