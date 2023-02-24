const { URL_SERVER, SECRET_KEY_SERVER, SECRET_KEY_AUTH} = require("../../../../credentials")
import axios from "axios";
const jwt = require("jwt-simple")

const api = (session = {}) => {
  const data = Math.floor(Date.now() / 1000)
  const payload = {
    id: process.env.NEXT_PUBLIC_ID,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    iat: data,
    exp: data + (30),
    /* exp: data + (60 * 60 * 24 * 30) */
  }
  const payloadSession = {
    ...session,
    iat: data,
    exp: data + (30)
  }
  return axios.create({
    baseURL: URL_SERVER,
    headers: {
      "Authorization": `Bearer ${jwt.encode(payload, SECRET_KEY_SERVER)}`,
      "Access-Control-Allow-Origin": "*",
      "userauth": jwt.encode(payloadSession, SECRET_KEY_AUTH)
    },
  })
};


export { api };
