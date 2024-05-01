import units from "@/usecases/units";

export default (to, from, next) => {
  const unit = units.getSelectedUnit();
  if (!unit) {
    console.log("entrou aqui");
    next({ name: "Selecione a base" });
    return false;
  }
};
