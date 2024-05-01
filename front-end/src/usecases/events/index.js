import gateways from "@/gateways";

const units = {
  getEvents(headers) {
    return gateways
      .getEvents(headers)
      .then(({ data }) => ({ status: "success", data }))
      .catch(() => ({ status: "generic_error" }));
  },
  getEventById(headers, id) {
    return gateways
      .getEventById(headers, id)
      .then(({ data }) => ({ status: "success", data }))
      .catch(() => ({ status: "generic_error" }));
  },
  setEvent(headers, data) {
    return gateways
      .setEvent(headers, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  editEvent(headers, id, data) {
    return gateways
      .editEvent(headers, id, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response,
      }));
  },
  deleteEvent(headers, id, data) {
    return gateways
      .deleteEvent(headers, id, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
};

export default units;
