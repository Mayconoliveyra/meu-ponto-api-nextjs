const axios = require("axios")
const jwt = require("jwt-simple")
const moment = require("moment")
require("moment/locale/pt-br")
moment.locale('pt-br')

/* const URL_SERVER = "http://10.0.0.200:3000/api/"; */
const URL_SERVER = "http://localhost:3000/api/";
const SECRET_KEY_SERVER = "H9vLGUXfVErDcSyUu6pKF2jdkANZsqvHt7KcifD8DaiwZ";

function api(session = {}) {
    const data = Math.floor(Date.now() / 1000)
    const payload = {
        ...session,
        iat: data,
        exp: data + (30),
    }

    return axios.create({
        baseURL: URL_SERVER,
        headers: {
            "Authorization": `${jwt.encode(payload, SECRET_KEY_SERVER)}`,
            "Access-Control-Allow-Origin": "*",
        },
    })
};

function passport(req) {
    try {
        if (!req.headers || !req.headers.authorization) throw "[1] Autenticação inválida"
        const body = jwt.decode(req.headers.authorization, SECRET_KEY_SERVER);

        if (body && body.id) {
            return body
        } else {
            throw "[2] Autenticação inválida"
        }
    } catch (error) {
        throw error
    }
}

/* Ultiliza no updated_at, created_at, deleted_at */
function dataHoraAtual() {
    return new Date();
}

/* Formata em ex:"08/04/2023 13:39:02" */
function horaFormatada(date) {
    if (!date) return ""
    return moment(date).format('L HH:mm:ss')
}

/* Converte as conulas "" em NULL. ex: {nome: ""} => {nome: NULL} */
function FormatObjNull(obj) {
    const objReturn = obj;
    Object.keys(obj).forEach(key => {
        if (!isNaN(obj[key])) objReturn[key] = Number(obj[key]);
        if (obj[key] == "") objReturn[key] = undefined;
        if (obj[key] == "true") objReturn[key] = true;
        if (obj[key] == "false") objReturn[key] = false;
    });
    return objReturn
}

module.exports = { api, passport, FormatObjNull, dataHoraAtual, horaFormatada }