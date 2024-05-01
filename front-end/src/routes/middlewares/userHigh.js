import users from "@/usecases/users";
import units from "@/usecases/units";

export default (to, from, next) => {
  const user = users.getDecodedAccessToken();
  if (user.role !== "HIGH") {
    next({ name: "Selecione a unidade" });
    return false;
  }
};
