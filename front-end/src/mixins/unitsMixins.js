import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      search: null,
      activeDialog: false,
      messageDialog: null,
      defaultDialog: true,
      isDelete: false,
      isDeleteUnitId: null,
      loading: true,
      unitsError: false,
      maintenance: false,
    };
  },
  computed: {
    ...mapGetters("units", ["units", "userUnits", "error", "messageError"]),
    ...mapGetters("users", ["loggedUser"]),
    setUnit() {
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
    async loggedUser(value) {
      if (value && value.role === "HIGH") {
        return await this.getUnits();
      }
      this.loading = false;
      this.maintenance = true;
    },
    units(value) {
      if (value.length !== 0) {
        this.loading = false;
      } else {
        this.loading = false;
        this.unitsError = true;
      }
    },
  },
  methods: {
    ...mapActions("users", ["setLoggedUser"]),
    ...mapActions("units", [
      "getLoggedUserUnits",
      "getUnits",
      "resetErrorStatus",
      "deleteUnit",
      "getUnits",
      "getUnitById",
    ]),
    async getLoggedUnitsMethod() {
      await this.getLoggedUserUnits();
    },
    toSetDeleteUnit(values) {
      this.defaultDialog = false;
      this.messageDialog = `Deseja excluir a unidade ${values.name}?`;
      this.activeDialog = true;
      this.setDelete(values.id);
    },
    setDelete(id) {
      this.isDelete = true;
      this.isDeleteUnitId = id;
    },
    unsetDelete() {
      this.isDelete = false;
      this.isDeleteUnitId = null;
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
      const result = await this.deleteUnit(this.isDeleteUnitId);
      if (result === "success") {
        return this.afterDeleteSubmit();
      }
      this.unsetDelete();
    },
    afterDeleteSubmit() {
      this.$router.push({
        name: "Unidades",
        query: { success: true, message: "Unidade excluída com sucesso" },
      });
    },
  },
};
