import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      search: null,
      activeDialog: false,
      messageDialog: null,
      defaultDialog: true,
      isDelete: false,
      isDeleteVehicleId: null,
      loading: true,
    };
  },
  computed: {
    ...mapGetters("vehicles", ["error", "messageError"]),
    ...mapGetters("units", ["selectedUnit"]),
    setVehicle() {
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
    ...mapActions("vehicles", ["resetErrorStatus", "deleteVehicle"]),
    ...mapActions("units", ["setSelectedUnit"]),
    toSetDeleteVehicle(values) {
      this.defaultDialog = false;
      this.messageDialog = `Deseja excluir o veículo ${values.model}?`;
      this.activeDialog = true;
      this.setDelete(values.id);
    },
    toSetEditDialog() {
      this.messageDialog = `Atenção, devido a instabilidades do 
      serviços de consulta da tabela fipe, os campos tipo, 
      modelo, marca, ano do modelo e valor estão integrados.`;
      this.activeDialog = true;
    },
    setDelete(id) {
      this.isDelete = true;
      this.isDeleteVehicleId = id;
    },
    unsetDelete() {
      this.isDelete = false;
      this.isDeleteVehicleId = null;
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
      const result = await this.deleteVehicle(this.isDeleteVehicleId);
      if (result === "success") {
        return this.afterDeleteSubmit();
      }
      this.unsetDelete();
    },
    afterDeleteSubmit() {
      this.$router.push({
        name: "Veículos",
        query: { success: true, message: "Veículo excluído com sucesso" },
      });
    },
  },
};
