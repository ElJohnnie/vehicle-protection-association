import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      search: null,
      activeDialog: false,
      messageDialog: null,
      defaultDialog: true,
      isDelete: false,
      isDeleteContractId: null,
    };
  },
  computed: {
    ...mapGetters("contracts", ["error", "messageError"]),
    setContract() {
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
    ...mapActions("contracts", ["resetErrorStatus"]),
    toSetDeleteContract(values) {
      this.defaultDialog = false;
      this.messageDialog = `Deseja excluir o contrato?`;
      this.activeDialog = true;
      this.setDelete(values.id);
    },
    setDelete(id) {
      this.isDelete = true;
      this.isDeletePlanId = id;
    },
    unsetDelete() {
      this.isDelete = false;
      this.isDeleteContractId = null;
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
      const result = await this.deleteContract(this.isDeleteContractId);
      if (result === "success") {
        return this.afterDeleteSubmit();
      }
      this.unsetDelete();
    },
    afterDeleteSubmit() {
      this.$router.push({
        name: "Contratos",
        query: { success: true, message: "Contrato excluído com sucesso" },
      });
    },
  },
};
