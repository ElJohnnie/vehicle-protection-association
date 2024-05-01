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
                <label>Nome da unidade</label>
                <md-input
                  v-model="form.corporateName"
                  type="text"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field :class="{ 'md-invalid': cpfError }">
                <label>CPF/CNPJ</label>
                <md-input
                  v-model="form.documentNumber"
                  v-mask="documentNumberMask"
                  required
                ></md-input>
                <span class="md-error">Valor inválido</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-left">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>CEP</label>
                <md-input
                  v-mask="'#####-###'"
                  v-model="form.address.zipCode"
                  type="cep"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Cidade</label>
                <md-input v-model="form.address.city" type="text"></md-input>
              </md-field>
            </div>
            <div
              class="md-layout-item alignRight md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            >
              <md-field>
                <label for="state">Estado</label>
                <md-select
                  id="state"
                  name="state"
                  v-model="form.address.state"
                  required
                >
                  <md-option
                    v-for="(state, index) in states.UF"
                    :key="index"
                    :value="state.sigla"
                    >{{ state.nome }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Rua</label>
                <md-input v-model="form.address.street" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Número</label>
                <md-input
                  v-model="form.address.number"
                  type="text"
                  v-mask="'##########'"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Bairro</label>
                <md-input
                  v-model="form.address.neighborhood"
                  type="text"
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-size-100 flex-between">
            <md-button
              v-if="isEdit"
              v-low-user="loggedUser"
              class="md-raised md-warning"
              @click="deleteUnit"
              >Deletar unidade <md-icon>delete</md-icon></md-button
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
import validations from "@/helpers/validations.js";
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
    unitId: null,
  },
  data() {
    return {
      form: {
        address: {},
      },
      corporateName: null,
      documentNumber: null,
      hasError: {
        origin: null,
        error: false,
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters("units", { unit: "unit", genericError: "error" }),
    states() {
      return {
        UF: [
          { nome: "Acre", sigla: "AC" },
          { nome: "Alagoas", sigla: "AL" },
          { nome: "Amapá", sigla: "AP" },
          { nome: "Amazonas", sigla: "AM" },
          { nome: "Bahia", sigla: "BA" },
          { nome: "Ceará", sigla: "CE" },
          { nome: "Distrito Federal", sigla: "DF" },
          { nome: "Espírito Santo", sigla: "ES" },
          { nome: "Goiás", sigla: "GO" },
          { nome: "Maranhão", sigla: "MA" },
          { nome: "Mato Grosso", sigla: "MT" },
          { nome: "Mato Grosso do Sul", sigla: "MS" },
          { nome: "Minas Gerais", sigla: "MG" },
          { nome: "Pará", sigla: "PA" },
          { nome: "Paraíba", sigla: "PB" },
          { nome: "Paraná", sigla: "PR" },
          { nome: "Pernambuco", sigla: "PE" },
          { nome: "Piauí", sigla: "PI" },
          { nome: "Rio de Janeiro", sigla: "RJ" },
          { nome: "Rio Grande do Norte", sigla: "RN" },
          { nome: "Rio Grande do Sul", sigla: "RS" },
          { nome: "Rondônia", sigla: "RO" },
          { nome: "Roraima", sigla: "RR" },
          { nome: "Santa Catarina", sigla: "SC" },
          { nome: "São Paulo", sigla: "SP" },
          { nome: "Sergipe", sigla: "SE" },
          { nome: "Tocantins", sigla: "TO" },
        ],
      };
    },
    textForm() {
      if (this.isEdit) {
        return "Editar unidade";
      }
      return "Cadastrar unidade";
    },
    documentNumberMask() {
      if (this.documentNumber && this.documentNumber.length >= 14) {
        return "##.###.###/####-##";
      }
      return "###.###.###-##";
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
    cpfError() {
      return (
        (this.hasError.origin === "cpf" || this.hasError.origin === "cnpj") &&
        this.hasError.error
      );
    },
  },
  async created() {
    if (this.isEdit) {
      this.loading = true;
      await this.getUnitById(this.unitId).then(() => (this.loading = false));
    }
  },
  watch: {
    unit(value) {
      if (value) {
        this.form = { ...value };
      }
    },
    documentNumber(value) {
      if (value.length === 14) {
        return this.validateCpf(value);
      } else if (value.length === 18) {
        return this.validateCnpj(value);
      }
      return this.clearError();
    },
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
    ...mapActions("units", ["setUnit", "getUnitById", "editUnit"]),
    // transferir e adaptar para o mixins
    async submitCreate(event) {
      event.preventDefault();
      this.loading = true;
      const result = await this.setUnit(this.form);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    async submitEdit(event) {
      event.preventDefault();
      this.loading = true;
      const data = {
        id: this.unitId,
        body: this.form,
      };
      const result = await this.editUnit(data);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    afterSubmit() {
      let message = "Unidade cadastrada com sucesso.";
      if (this.isEdit) {
        message = "Unidade editada com sucesso.";
      }
      this.hasError = false;
      this.loading = false;
      this.$router.push({
        name: "Unidades",
        query: { success: true, message },
      });
    },
    // fim transferir e adaptar para o mixins
    deleteUnit() {
      const values = {
        id: this.unit.id,
        name: this.unit.corporateName,
      };
      this.$emit("deleteUnit", values);
    },
    validateCpf(value) {
      const res = validations.cpf(value);
      this.setError("cpf", !res);
    },
    validateCnpj(value) {
      const res = validations.cnpj(value);
      this.setError("cnpj", !res);
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
