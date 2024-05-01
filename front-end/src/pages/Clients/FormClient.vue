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
          <div class="md-layout md-info md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field :class="{ 'md-invalid': cpfError }">
                <label>CPF/CNPJ</label>
                <md-input
                  v-mask="documentNumberMask"
                  v-model="form.documentNumber"
                  required
                ></md-input>
                <span class="md-error">Valor inválido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Nome completo</label>
                <md-input
                  v-model="form.fullname"
                  type="text"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field :class="{ 'md-invalid': emailError }">
                <label>E-mail</label>
                <md-input v-model="form.email" type="email" required></md-input>
                <span class="md-error">Valor inválido</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div
              class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            >
              <md-field>
                <label>Identidade</label>
                <md-input
                  v-mask="'##########'"
                  v-model="form.identityDocument.identityNumber"
                  required
                ></md-input>
              </md-field>
            </div>
            <div
              class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            >
              <md-field>
                <label>Orgão de expedição</label>
                <md-input
                  v-model="form.identityDocument.expeditionOrgan"
                  type="text"
                  required
                ></md-input>
              </md-field>
            </div>
            <div
              class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            >
              <md-field>
                <label for="UF">Expedição (UF)</label>
                <md-select
                  v-model="form.identityDocument.UF"
                  name="uf"
                  required
                >
                  <md-option
                    v-for="(state, index) in states.UF"
                    :key="index"
                    :value="state.sigla"
                    >{{ state.sigla }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div
              class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            >
              <md-field>
                <label>Data de expedição</label>
                <md-input
                  class="input-date"
                  v-mask="'##/##/####'"
                  v-model="form.identityDocument.expeditionDate"
                  required
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Data de Nascimento</label>
                <md-input
                  v-mask="'##/##/####'"
                  v-model="form.identityDocument.birthDate"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Telefone</label>
                <md-input
                  v-mask="'(##) ####-####'"
                  v-model="form.telephone"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Celular</label>
                <md-input
                  v-mask="'(##) #####-####'"
                  v-model="form.mobilephone"
                  required
                ></md-input>
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
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Cidade</label>
                <md-input
                  v-model="form.address.city"
                  type="text"
                  required
                ></md-input>
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
                <md-input
                  v-model="form.address.street"
                  type="text"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Número</label>
                <md-input
                  v-model="form.address.number"
                  type="text"
                  v-mask="'##########'"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Bairro</label>
                <md-input
                  v-model="form.address.neighborhood"
                  type="text"
                  required
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div
              class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            >
              <md-field>
                <label>Código CNH</label>
                <md-input
                  v-mask="'###########'"
                  v-model="form.licenseDocument.licenseNumber"
                  type="number"
                  required
                ></md-input>
              </md-field>
            </div>
            <div
              class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            >
              <md-field>
                <label for="license-category">Categoria CNH</label>
                <md-select
                  id="license-category"
                  v-model="form.licenseDocument.licenseCategory"
                  required
                >
                  <md-option
                    v-for="(category, index) in cnhCategory.CNH"
                    :key="index"
                    :value="category.category"
                    >{{ category.category }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div
              class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            >
              <md-field>
                <label>Indicação</label>
                <md-input v-model="form.indication" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div
            v-if="showBusinnessList"
            class="md-layout md-gutter md-alignment-center"
          >
            <div
              class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            >
              <md-field>
                <label for="unidade">Unidade vinculada</label>
                <md-select name="unidade" v-model="setBusinessUnitId" required>
                  <md-option
                    v-for="(unit, index) in units"
                    :key="index"
                    :value="unit.id"
                    >{{ unit.corporateName }}</md-option
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
              @click="deleteClient"
              >Deletar cliente <md-icon>delete</md-icon></md-button
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
import { mapActions, mapGetters } from "vuex";
import validations from "@/helpers/validations.js";
import { ProgressSpinner } from "@/components";

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
    clientId: null,
  },
  data() {
    return {
      form: {
        documentNumber: null,
        identityDocument: {},
        telephone: null,
        mobilephone: null,
        address: {},
        licenseDocument: {},
        indication: null,
        businessUnitId: null,
      },
      hasError: {
        origin: null,
        error: false,
      },
      loading: true,
    };
  },
  computed: {
    ...mapGetters("clients", {
      clientById: "clientById",
      genericError: "error",
    }),
    ...mapGetters("users", ["loggedUser"]),
    ...mapGetters("units", ["units", "selectedUnit"]),
    textForm() {
      if (this.isEdit) {
        return "Editar cliente";
      }
      return "Cadastrar cliente";
    },
    showBusinnessList() {
      return this.selectedUnit.allUnits;
    },
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
    cnhCategory() {
      return {
        CNH: [
          { category: "A" },
          { category: "B" },
          { category: "C" },
          { category: "D" },
          { category: "E" },
          { category: "AB" },
          { category: "AC" },
          { category: "AD" },
          { category: "AE" },
          { category: "ACC" },
        ],
      };
    },
    // corrigindo aqui
    setBusinessUnitId: {
      get() {
        if (this.isEdit && this.clientById) {
          const unit = this.units.find(
            (el) => el.id === this.clientById.businessUnitId
          );
          return unit.id;
        }
        return null;
      },
      set(newValue) {
        this.form.businessUnitId = newValue;
      },
    },
    // corrigindo aqui
    documentNumberMask() {
      if (this.form.documentNumber && this.form.documentNumber.length > 14) {
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
    emailError() {
      return this.hasError.origin === "email" && this.hasError.error;
    },
  },
  async created() {
    if (this.isEdit) {
      await Promise.all([
        this.setLoggedUser(),
        this.setSelectedUnit(),
        this.getClientById(this.clientId),
      ]).then(() => (this.loading = false));
    } else {
      await Promise.all([this.setLoggedUser(), this.setSelectedUnit()]).then(
        () => (this.loading = false)
      );
    }
  },
  watch: {
    form: {
      handler(value) {
        if (value.email) this.validateEmail(value.email);
        if (value.address.zipCode.length >= 9) {
          this.searchCep(value.address.zipCode);
        }
        if (value.documentNumber && value.documentNumber.length === 14) {
          return this.validateCpf(value.documentNumber);
        } else if (value.documentNumber && value.documentNumber.length === 18) {
          return this.validateCnpj(value.documentNumber);
        }

        return this.clearError();
      },
      deep: true,
    },
    // passar essa metodologia de watch para os outros formulários
    clientById(value) {
      if (value) {
        this.form = { ...value };
      }
    },
    selectedUnit(value) {
      if (value && value.allUnits) {
        this.getUnits();
      }
      if (value && !value.allUnits) {
        this.businessUnitId = value.selectedUnitId;
      }
    },
    setBusinessUnitId: {
      immediate: true,
      handler(newValue) {
        if (this.isEdit) {
          this.form.businessUnitId = newValue;
        }
      },
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
    ...mapActions("clients", ["getClientById", "setClient", "editClient"]),
    ...mapActions("address", ["getAddressByCep"]),
    ...mapActions("users", ["setLoggedUser"]),
    ...mapActions("units", ["getUnits", "setSelectedUnit"]),
    async searchCep(value) {
      const res = await this.getAddressByCep(value);
      if (!res.erro) {
        this.setAddress(res);
      }
    },
    setAddress(value) {
      this.form.address.city = value.localidade;
      this.form.address.state = value.uf;
      if (value.logradouro) this.form.address.street = value.logradouro;
      if (value.bairro) this.form.address.neighborhood = value.bairro;
    },
    // transferir e adaptar para o mixins
    async submitCreate(event) {
      event.preventDefault();
      this.loading = true;
      const result = await this.setClient(this.form);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    async submitEdit(event) {
      event.preventDefault();
      this.loading = true;
      const data = {
        id: this.clientId,
        body: this.form,
      };
      const result = await this.editClient(data);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    afterSubmit() {
      let message = "Cliente cadastrado com sucesso.";
      if (this.isEdit) {
        message = "Cliente editado com sucesso.";
      }
      this.hasError = false;
      this.loading = false;
      this.$router.push({
        name: "Clientes",
        query: { success: true, message },
      });
    },
    // fim transferir e adaptar para o mixins
    deleteClient() {
      const values = {
        id: this.clientById.id,
        name: this.clientById.fullname,
      };
      this.$emit("deleteClient", values);
    },
    validateCpf(value) {
      const res = validations.cpf(value);
      this.setError("cpf", !res);
    },
    validateCnpj(value) {
      const res = validations.cnpj(value);
      this.setError("cnpj", !res);
    },
    validateEmail(value) {
      const res = validations.email(value);
      this.setError("email", !res);
    },
    setError(origin, error) {
      this.hasError = { origin: origin, error: error };
    },
    clearError() {
      this.hasError = { origin: null, error: false };
    },
    setUnitsList(value) {
      value.forEach((element) => this.unitsList.push(element.corporateName));
    },
    getBusinessUnitIdByName(name, unitsList) {
      const unit = unitsList.find((el) => el.corporateName === name);
      return unit.id;
    },
    getBusinessUnitNameById(id, unitsList) {
      const unit = unitsList.find((el) => el.id === id);
      return unit.name;
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
