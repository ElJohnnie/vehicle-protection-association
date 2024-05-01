import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      search: null,
      activeDialog: false,
      messageDialog: null,
      defaultDialog: true,
      isDelete: false,
      currentUserId: null,
      isInactive: false,
      isActive: false,
      loading: true,
    };
  },
  computed: {
    ...mapGetters("users", ["loggedUser", "users", "error", "messageError"]),
    ...mapGetters("units", ["selectedUnit"]),
    setUser() {
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
        this.loading = false;
      }
    },
  },
  methods: {
    ...mapActions("users", [
      "resetErrorStatus",
      "deleteUser",
      "inactivateUser",
      "activateUser",
      "getUsersByUnit",
    ]),
    ...mapActions("units", ["setSelectedUnit"]),
    ...mapActions("users", ["setLoggedUser"]),
    toSetDeleteUser(values) {
      this.defaultDialog = false;
      this.messageDialog = `Deseja excluir o perfil de ${values.name}?`;
      this.activeDialog = true;
      this.setDelete(values.id);
    },
    setDelete(id) {
      this.isDelete = true;
      this.currentUserId = id;
    },
    unsetDelete() {
      this.isDelete = false;
      this.currentUserId = null;
    },
    toSetInactivateUser(values) {
      this.defaultDialog = false;
      this.messageDialog = `Deseja desativar o perfil de ${values.name}?`;
      this.activeDialog = true;
      this.setInactive(values.id);
    },
    setInactive(id) {
      this.isInactive = true;
      this.currentUserId = id;
    },
    unsetInactive() {
      this.isInactive = false;
      this.currentUserId = null;
    },
    toSetActivateUser(values) {
      this.defaultDialog = false;
      this.messageDialog = `Deseja ativar o perfil de ${values.name}?`;
      this.activeDialog = true;
      this.setActive(values.id);
    },
    setActive(id) {
      this.isActive = true;
      this.currentUserId = id;
    },
    unsetActive() {
      this.isActive = false;
      this.currentUserId = null;
    },
    confirmDialog() {
      if (this.error) {
        this.resetErrorStatus();
      }
      if (this.isDelete) {
        this.confirmDelete();
      }
      if (this.isInactive) {
        this.confirmInactive();
      }
      if (this.isActive) {
        this.confirmActive();
      }
      this.activeDialog = false;
    },
    closeDialog() {
      this.activeDialog = false;
    },
    async confirmDelete() {
      const result = await this.deleteUser(this.currentUserId);
      if (result === "success") {
        return this.afterDeleteSubmit();
      }
      this.unsetDelete();
    },
    async confirmInactive() {
      const result = await this.inactivateUser(this.currentUserId);
      if (result === "success") {
        return this.afterActiveSubmit("Usuário inativo com sucesso!");
      }
      this.unsetInactive();
    },
    async confirmActive() {
      const result = await this.activateUser(this.currentUserId);
      if (result === "success") {
        return this.afterActiveSubmit("Usuário ativo com sucesso!");
      }
      this.unsetActive();
    },
    afterDeleteSubmit() {
      this.$router.push({
        name: "Usuários",
        query: { success: true, message: "Usuário excluído com sucesso" },
      });
    },
    afterActiveSubmit() {
      document.location.reload(true);
    },
  },
};
