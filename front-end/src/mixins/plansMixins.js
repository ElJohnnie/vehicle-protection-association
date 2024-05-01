import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      search: null,
      activeDialog: false,
      messageDialog: null,
      defaultDialog: true,
      isDelete: false,
      isDeletePlanId: null,
    };
  },
  computed: {
    ...mapGetters("plans", ["error", "messageError"]),
    setPlan() {
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
    ...mapActions("plans", ["resetErrorStatus", "deletePlan"]),
    toSetDeletePlan(values) {
      this.defaultDialog = false;
      this.messageDialog = `Deseja excluir o plano ${values.name}?`;
      this.activeDialog = true;
      this.setDelete(values.id);
    },
    setDelete(id) {
      this.isDelete = true;
      this.isDeletePlanId = id;
    },
    unsetDelete() {
      this.isDelete = false;
      this.isDeletePlanId = null;
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
      const result = await this.deletePlan(this.isDeletePlanId);
      if (result === "success") {
        return this.afterDeleteSubmit();
      }
      this.unsetDelete();
    },
    afterDeleteSubmit() {
      this.$router.push({
        name: "Planos",
        query: { success: true, message: "Plano excluído com sucesso" },
      });
    },
  },
};
