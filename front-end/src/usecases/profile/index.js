import gateways from "@/gateways";

const profile = {
  loggedProfile(headers) {
    return gateways
      .loggedProfile(headers)
      .then(({ data }) => ({ status: "success", data }))
      .catch(() => ({
        status: "generic_error",
        message: "Erro ao buscar suas credenciais no momento",
      }));
  },
  editProfile(headers, body) {
    return gateways
      .editProfile(headers, body)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  editPasswordProfile(headers, body) {
    return gateways
      .editPasswordProfile(headers, body)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
};

export default profile;
