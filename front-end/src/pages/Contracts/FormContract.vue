<template>
  <form @submit="computedSubmit">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">{{ textForm }}</h4>
      </md-card-header>

      <md-card-content>
        <div v-if="loading" class="md-layout md-gutter md-alignment-top-center">
          <progress-spinner class="md-alignment-top-center"></progress-spinner>
        </div>
        <div
          v-else-if="plansError"
          class="md-layout md-gutter md-alignment-center"
        >
          <div class="flex-column">
            <span class="md-subheading"
              >Cadastre um plano clicando no botão abaixo</span
            >
            <md-button
              class="md-raised md-success"
              type="submit"
              :to="{ name: 'Adicionar plano' }"
              >Criar plano</md-button
            >
          </div>
        </div>
        <template v-else>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field :class="{ 'md-invalid': dateError }">
                <label>Data do primeiro pagamento</label>
                <md-input
                  v-mask="'##/##/####'"
                  v-model="form.firstPayDayDate"
                  required
                ></md-input>
                <span class="md-error">Data de pagamento invalida</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="movie">Selecione o plano</label>
                <md-select v-model="form.planMyId">
                  <md-option
                    v-for="(plan, index) in plans"
                    :key="index"
                    :value="plan.id"
                    >{{ plan.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-size-100 flex-between">
            <md-button
              v-if="isEdit"
              v-low-user="loggedUser"
              class="md-raised md-warning"
              @click="deleteContract"
              >Deletar contrato <md-icon>delete</md-icon></md-button
            >
            <md-button
              class="md-raised md-success"
              type="submit"
              :disabled="dontSubmit"
            >
              {{ textButton }}
              <md-icon v-if="isEdit">edit</md-icon>
              <md-icon v-else>add</md-icon>
            </md-button>
          </div>
        </template>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { ProgressSpinner } from "@/components";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ProgressSpinner,
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: "blue",
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    contractId: null,
    vehicleId: null,
  },
  data() {
    return {
      form: {},
      hasError: {
        origin: null,
        error: false,
      },
      loading: true,
      plansError: false,
    };
  },
  computed: {
    ...mapGetters("plans", ["plans"]),
    ...mapGetters("vehicles", ["vehicleById"]),
    ...mapGetters("contracts", { genericError: "error" }),
    textForm() {
      if (this.isEdit) {
        return `Editar contrato - ${this.vehicleById.model} - ${this.vehicleById.licensePlate}`;
      }
      return `Gerar contrato - ${this.vehicleById.model} - ${this.vehicleById.licensePlate}`;
    },
    textButton() {
      if (this.isEdit) {
        return `Editar contrato`;
      }
      return `Gerar contrato`;
    },
    computedSubmit() {
      if (this.isEdit) {
        return this.submitEdit;
      }
      return this.submitCreate;
    },
    dontSubmit() {
      return this.hasError.error;
    },
    dateError() {
      return this.hasError.origin === "date" && this.hasError.error;
    },
  },
  async created() {
    this.form.vehicleId = this.vehicleId;
    await Promise.all([
      this.getPlans(),
      this.getVehicleById(this.vehicleId),
    ]).then(() => (this.loading = false));
  },
  watch: {
    plans(value) {
      if (value && value.length > 0) {
        this.plansError = false;
      } else {
        this.plansError = true;
      }
    },
    "form.firstPayDayDate"(value) {
      if (value.length === 10) {
        return this.validateDate(value);
      } else {
        this.setError("date", true);
      }
    },
    // fazer para a lista
    genericError(error) {
      if (error) {
        this.hasError = { origin: "generic_error", error: error };
        this.loading = false;
      } else {
        this.hasError = { origin: "", error: error };
      }
    },
  },
  methods: {
    ...mapActions("plans", ["getPlans"]),
    ...mapActions("vehicles", ["getVehicleById"]),
    ...mapActions("contracts", ["setContract", "editContract"]),
    // transferir e adaptar para o mixins
    async submitCreate(event) {
      event.preventDefault();
      this.loading = true;
      const result = await this.setContract(this.form);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    async submitEdit(event) {
      event.preventDefault();
      this.loading = true;
      const data = {
        id: this.userId,
        body: this.form,
      };
      const result = await this.editContract(data);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    afterSubmit() {
      let message = "Contrado cadastrado com sucesso.";
      if (this.isEdit) {
        message = "Contrato editado com sucesso.";
      }
      this.hasError = false;
      this.loading = false;
      this.$router.push({
        name: "Contratos",
        query: { success: true, message },
      });
    },
    // fim transferir e adaptar para o mixins
    deleteContract() {
      const values = {
        id: this.contract.id,
        name: this.contract.name,
      };
      this.$emit("deleteContract", values);
    },
    validateDate(value) {
      const [day, month, year] = value.split("/");
      const selectedDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();
      if (selectedDate < today) {
        this.setError("date", true);
      } else {
        this.clearError();
      }
    },
    setError(origin, error) {
      this.hasError = { origin: origin, error: error };
    },
    clearError() {
      this.hasError = { origin: null, error: false };
    },
  },
};
</script>
<style>
input[type="number"],
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -moz-appearance: textfield;
  -webkit-appearance: none;
}
</style>
