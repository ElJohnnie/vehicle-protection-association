import gateways from "@/gateways";

const units = {
  // usuários gerais
  getUnits(headers) {
    return gateways
      .getUnits(headers)
      .then(({ data }) => ({ status: "success", data }))
      .catch(() => ({ status: "generic_error" }));
  },
  getUnitById(headers, params) {
    return gateways
      .getUnitById(headers, params)
      .then(({ data }) => ({ status: "success", data }))
      .catch(() => ({ status: "generic_error" }));
  },
  setUnit(headers, data) {
    return gateways
      .setUnit(headers, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  editUnit(headers, id, data) {
    return gateways
      .editUnit(headers, id, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  deleteUnit(headers, id, data) {
    return gateways
      .deleteUnit(headers, id, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  setUnitManager(headers, data) {
    return gateways
      .setUnitManager(headers, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  removeUnitManager(headers, data) {
    return gateways
      .removeUnitManager(headers, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  getLoggedUserUnits(headers) {
    return gateways
      .getLoggedUserUnits(headers)
      .then(({ data }) => ({ status: "success", data }))
      .catch(() => ({ status: "generic_error" }));
  },
  setSelectedUnit(value) {
    let item = {
      selectedUnitId: null,
      allUnits: true,
    };
    if (value) {
      item = {
        selectedUnitId: value.id,
        selectedUnitName: value.corporateName,
        allUnits: false,
      };
    }
    return localStorage.setItem("selectedUnit", JSON.stringify(item));
  },
  getSelectedUnit() {
    const itemStr = localStorage.getItem("selectedUnit");
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    return item;
  },
};

export default units;
