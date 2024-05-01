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
        <template v-else>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Nome</label>
                <md-input v-model="form.name" required></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="periodicity">Periodicidade</label>
                <md-select
                  if="type"
                  v-model="form.periodicity"
                  name="periodicity"
                  required
                >
                  <md-option
                    v-for="(period, index) in periodicityList"
                    :key="index"
                    :value="period.value"
                    >{{ period.name }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Quantidade</label>
                <md-input
                  v-model="form.quantity"
                  type="number"
                  required
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Valor no cartão de crédito</label>
                <md-input
                  v-model="form.planPrices[0].value"
                  v-money="money"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Valor no boleto</label>
                <md-input
                  v-model="form.planPrices[1].value"
                  v-money="money"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Informação adicional</label>
                <md-input v-model="form.additionalInfo"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-size-100 flex-between">
            <md-button
              v-if="isEdit"
              v-low-user="loggedUser"
              class="md-raised md-warning"
              @click="deletePlan"
              >Deletar Plano <md-icon>delete</md-icon></md-button
            >
            <md-button
              class="md-raised md-success"
              type="submit"
              :disabled="dontSubmit"
            >
              {{ textForm }}
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
    planId: null,
  },
  data() {
    return {
      form: {
        planPrices: [
          {
            payment: "creditcard",
            value: null,
          },
          {
            payment: "boleto",
            value: null,
          },
        ],
      },
      hasError: {
        origin: null,
        error: false,
      },
      loading: false,
      periodicityList: [
        { name: "Semanal", value: "WEEKLY" },
        { name: "Duas semanas", value: "BIWEEKLY" },
        { name: "Mensal", value: "MONTHLY" },
        { name: "Dois meses", value: "BIMONTHLY" },
        { name: "Trimestral", value: "QUARTERLY" },
        { name: "Semestral", value: "BIANNUAL" },
        { name: "Anual", value: "YEARLY" },
      ],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
      },
    };
  },
  computed: {
    ...mapGetters("plans", { planById: "planById", genericError: "error" }),
    ...mapGetters("users", ["loggedUser"]),
    textForm() {
      if (this.isEdit) {
        return "Editar plano";
      }
      return "Cadastrar plano";
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
  },
  async created() {
    this.setLoggedUser();
    if (this.isEdit) {
      this.loading = true;
      await this.getPlanById(this.planId).then(() => (this.loading = false));
    }
  },
  watch: {
    planById(value) {
      if (value) {
        this.form = { ...value };
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
    ...mapActions("plans", ["setPlan", "getPlanById", "editPlan"]),
    ...mapActions("users", ["setLoggedUser"]),
    // transferir e adaptar para o mixins
    async submitCreate(event) {
      event.preventDefault();
      this.loading = true;
      const result = await this.setPlan(this.form);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    async submitEdit(event) {
      event.preventDefault();
      this.loading = true;
      const data = {
        id: this.planId,
        body: this.form,
      };
      const result = await this.editPlan(data);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    afterSubmit() {
      let message = "Plano cadastrado com sucesso.";
      if (this.isEdit) {
        message = "Plano editado com sucesso.";
      }
      this.hasError = false;
      this.loading = false;
      this.$router.push({
        name: "Planos",
        query: { success: true, message },
      });
    },
    // fim transferir e adaptar para o mixins
    deletePlan() {
      this.loading = true;
      const values = {
        id: this.planById.id,
        name: this.planById.name,
      };
      this.$emit("deletePlan", values);
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
