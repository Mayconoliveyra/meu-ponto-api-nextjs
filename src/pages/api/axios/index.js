import axios from "axios";
const jwt = require("jwt-simple")

const api = (session = {}) => {
  const data = Math.floor(Date.now() / 1000)
  const payload = {
    ...session,
    iat: data,
    exp: data + (30),
  }

  return axios.create({
    baseURL: process.env.URL_SERVER,
    headers: {
      "Authorization": `Bearer ${jwt.encode(payload, process.env.SECRET_KEY_SERVER)}`,
      "Access-Control-Allow-Origin": "*",
    },
  })
};

export default api;
