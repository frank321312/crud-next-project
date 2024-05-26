"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodemailerCode = exports.generarNumeroAleatorio = void 0;
const nodemailer_1 = require("nodemailer");
const dateConnect_1 = require("./dateConnect");
function generarNumeroAleatorio() {
    // Genera un número aleatorio entre 0 y 99999999 (8 dígitos)
    var numero = Math.floor(Math.random() * 100000000);
    return numero;
}
exports.generarNumeroAleatorio = generarNumeroAleatorio;
const nodemailerCode = async (Email, Codigo) => {
    return new Promise((resolve, reject) => {
        const traportar = (0, nodemailer_1.createTransport)({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: 'hectorsacaca1123@gmail.com',
                clientId: dateConnect_1.email_connect.clientId,
                clientSecret: dateConnect_1.email_connect.clientSecret,
                refreshToken: dateConnect_1.email_connect.refreshToken,
                accessToken: dateConnect_1.email_connect.accessToken
            }
        });
        var mailOptions = {
            from: "hectorsacaca1123@gmail.com",
            to: Email,
            subject: "Codigo de verificación",
            text: `<h2>${Codigo}</h2>`
        };
        traportar.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject("Error, no se pudo enviar el email");
            }
            else {
                resolve(`Envio con exito: ${info.response}`);
            }
        });
    });
};
exports.nodemailerCode = nodemailerCode;
