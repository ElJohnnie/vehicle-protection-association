// É preciso finalizar o bug do dialog repetido quando excluir cliente
import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      search: null,
      activeDialog: false,
      messageDialog: null,
      defaultDialog: true,
      isDelete: false,
      isDeleteUserId: null,
      loading: true,
    };
  },
  computed: {
    ...mapGetters("clients", ["error", "messageError"]),
    ...mapGetters("units", ["selectedUnit"]),
    setClient() {
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
        this.loading = false;
        this.activeDialog = false;
      }
    },
  },
  methods: {
    ...mapActions("clients", [
      "getClientsByUnit",
      "resetErrorStatus",
      "deleteClient",
    ]),
    ...mapActions("units", ["setSelectedUnit"]),
    toSetDeleteClient(values) {
      this.defaultDialog = false;
      this.messageDialog = `Deseja excluir o perfil de ${values.name}?`;
      this.activeDialog = true;
      this.setDelete(values.id);
    },
    setDelete(id) {
      this.isDelete = true;
      this.isDeleteUserId = id;
    },
    unsetDelete() {
      this.isDelete = false;
      this.isDeleteUserId = null;
    },
    confirmDialog() {
      if (this.error) {
        this.resetErrorStatus();
      }
      if (this.isDelete) {
        this.confirmDelete(this.isDeleteUserId);
      }
      this.activeDialog = false;
    },
    closeDialog() {
      this.activeDialog = false;
    },
    async confirmDelete() {
      const result = await this.deleteClient(this.isDeleteUserId);
      if (result === "success") {
        return this.afterDeleteSubmit();
      }
      this.unsetDelete();
    },
    afterDeleteSubmit() {
      this.$router.push({
        name: "Clientes",
        query: { success: true, message: "Cliente excluído com sucesso" },
      });
    },
  },
};
