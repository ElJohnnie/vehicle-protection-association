import events from "@/usecases/events";
import users from "@/usecases/users";

const actions = {
  getEvents: async ({ commit }) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { data, status, message } = await events.getEvents(headers);
    if (status !== "success") {
      commit("SET_EVENTS_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_EVENTS", data.events);
  },
  getEventById: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { data, status, message } = await events.getEventById(headers, id);
    if (status !== "success") {
      commit("SET_EVENTS_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_EVENT_BY_ID", data.event);
  },
  setEvent: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await events.setEvent(headers, data);
    if (status !== "success") {
      commit("SET_EVENTS_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  editEvent: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await events.editEvent(
      headers,
      data.id,
      data.body
    );
    if (status !== "success") {
      commit("SET_EVENTS_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  deleteEvent: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await events.deleteEvent(headers, id);
    if (status !== "success") {
      commit("SET_EVENTS_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  resetErrorStatus: ({ commit }) => {
    commit("SET_EVENTS_ERROR", { hasError: false, message: null });
  },
};

export default actions;
