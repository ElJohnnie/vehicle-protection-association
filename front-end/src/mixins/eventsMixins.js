import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      search: null,
      activeDialog: false,
      messageDialog: null,
      defaultDialog: true,
      isDelete: false,
      isDeleteEventId: null,
    };
  },
  computed: {
    ...mapGetters("events", ["error", "messageError"]),
    setEvent() {
      return this.$route.params.id;
    },
  },
  watch: {
    error(error) {
      if (error) {
        this.defaultDialog = true;
        this.messageDialog = this.messageError;
        this.activeDialog = true;
      } else {
        this.activeDialog = false;
      }
    },
  },
  methods: {
    ...mapActions("events", ["resetErrorStatus", "deleteEvent"]),
    toSetDeleteEvent(values) {
      this.defaultDialog = false;
      this.messageDialog = `Deseja excluir a ocorrência ${values.name}?`;
      this.activeDialog = true;
      this.setDelete(values.id);
    },
    setDelete(id) {
      this.isDelete = true;
      this.isDeleteEventId = id;
    },
    unsetDelete() {
      this.isDelete = false;
      this.isDeleteEventId = null;
    },
    confirmDialog() {
      if (this.error) {
        this.resetErrorStatus();
      }
      if (this.isDelete) {
        this.confirmDelete();
      }
      this.activeDialog = false;
    },
    closeDialog() {
      this.activeDialog = false;
    },
    async confirmDelete() {
      const result = await this.deleteEvent(this.isDeleteEventId);
      if (result === "success") {
        return this.afterDeleteSubmit();
      }
      this.unsetDelete();
    },
    afterDeleteSubmit() {
      this.$router.push({
        name: "Ocorrências",
        query: { success: true, message: "Ocorrência excluído com sucesso" },
      });
    },
  },
};
