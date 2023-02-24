import { api } from "../axios";
const prefix = "/user";

/* Alterar o cadastro */
const store = async (data, session) => {
  const axios = await api(session);
  if (data && data.id) {
    return await axios.put(`${prefix}/${data.id}`, data).then(res => res.data);
  }
  return await axios.post(`${prefix}`, data).then(res => res.data);
};

const storeNextAuth = async (data) => {
  const axios = await api();
  return await axios.post(`signin-next-auth`, data).then(res => res.data);
};

const storeAuth = async (data) => {
  const axios = await api();
  return await axios.post(`signin`, data).then(res => res.data);
};

/* Enviar email de recuperação e criar nova senha */
const storePassword = async (data, id) => {
  const axios = await api();
  if (data && id) {
    return await axios.put(`${prefix}/password/${id}`, data).then(res => res.data);
  }
  return await axios.post(`${prefix}/password`, data).then(res => res.data);
};

/* Verifica se o usuario está autenticado */
const userIsAuth = async (session) => {
  if (!session) return false
  if (!session || !session.email) return false
  if (!session || !session.cpf) return false
  if (!session || !session.contato) return false
  if (!session || !session.nome) return false
  if (!session || !session.email_auth) return false
  if (!session || !session.cep) return false
  return true
}

export { store, storeNextAuth, storeAuth, storePassword, userIsAuth }