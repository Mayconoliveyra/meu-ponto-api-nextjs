import { api } from "../axios";
const prefix = "/user";
import getKnex from "../../../../knex"

const login = async (data) => {
  const axios = await api(session);
  if (data && data.id) {
    return await axios.put(`${prefix}/${data.id}`, data).then(res => res.data);
  }
  return await axios.post(`${prefix}`, data).then(res => res.data);
};


export { login }