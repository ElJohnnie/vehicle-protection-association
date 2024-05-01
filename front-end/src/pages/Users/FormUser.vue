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
              <md-field :class="{ 'md-invalid': cpfError }">
                <label>CPF/CNPJ</label>
                <md-input
                  v-mask="documentNumberMask"
                  v-model="form.documentNumber"
                  :value="form.documentNumber"
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
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="user-type">Tipo de usuário</label>
                <md-select id="user-type" v-model="form.role" required>
                  <md-option
                    v-for="(user, index) in userRole"
                    :key="index"
                    :value="getUserRoleValue(Object.values(user))"
                    >{{ getUserRoleValue(Object.keys(user)) }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="type">Ativo</label>
                <md-select
                  if="type"
                  v-model="form.isActive"
                  name="type"
                  required
                >
                  <md-option
                    v-for="(type, index) in activatedOptions"
                    :key="index"
                    :value="type.value"
                    >{{ type.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div
              class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            >
              <md-field>
                <label for="unidade">Unidade vinculada</label>
                <md-select
                  name="unidade"
                  v-model="form.unitsIds"
                  required
                  multiple
                >
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
          <div class="md-layout md-gutter md-alignment-center">
            <div
              v-if="!this.isEdit"
              class="md-layout-item md-small-size-100 md-size-33"
            >
              <md-field>
                <label>Senha</label>
                <md-input
                  v-model="form.password"
                  type="password"
                  required
                ></md-input>
              </md-field>
            </div>
            <div
              v-if="!this.isEdit"
              class="md-layout-item md-small-size-100 md-size-33"
            >
              <md-field :class="{ 'md-invalid': confirmPasswordError }">
                <label>Confirme a senha</label>
                <md-input
                  v-model="form.confirmPassword"
                  type="password"
                  required
                ></md-input>
                <span class="md-error">Senhas não condizem</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-size-100 flex-between">
            <md-button
              v-if="isEdit"
              class="md-raised md-warning"
              @click="deleteUser"
              >Deletar Usuário <md-icon>delete</md-icon></md-button
            >
            <md-button
              v-if="isEdit"
              class="md-raised md-info"
              @click="toChangePasswordForm"
              >Alterar senha <md-icon>lock</md-icon></md-button
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
    userId: null,
  },
  data() {
    return {
      form: {},
      documentNumber: null,
      fullname: null,
      email: null,
      role: null,
      isActive: null,
      password: null,
      confirmPassword: null,
      unitsIds: [],
      unitsList: [],
      hasError: {
        origin: null,
        error: false,
      },
      loading: false,
      isChangePassword: false,
    };
  },
  computed: {
    ...mapGetters("users", { user: "userById", genericError: "error" }),
    ...mapGetters("users", ["loggedUser"]),
    ...mapGetters("units", ["units", "selectedUnit"]),
    textForm() {
      if (this.isEdit) {
        return "Editar usuário";
      }
      return "Cadastrar usuário";
    },
    showBusinnessList() {
      return this.selectedUnit.allUnits;
    },
    userRole() {
      return [{ Alto: "HIGH" }, { Médio: "MEDIUM" }, { Baixo: "LOW" }];
    },
    activatedOptions() {
      return [
        { name: "Sim", value: true },
        { name: "Não", value: false },
      ];
    },
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
    confirmPasswordError() {
      return this.hasError.origin === "confirmPassword" && this.hasError.error;
    },
  },
  async created() {
    this.loading = true;
    if (this.isEdit) {
      await Promise.all([
        this.setLoggedUser(),
        this.setSelectedUnit(),
        this.getUnits(),
        this.getUserById(this.userId),
      ]).then(() => (this.loading = false));
    } else {
      await Promise.all([
        this.setLoggedUser(),
        this.setSelectedUnit(),
        this.getUnits(),
      ]).then(() => (this.loading = false));
    }
  },
  watch: {
    user(value) {
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
    "form.documentNumber"(value) {
      if (value.length === 14) {
        return this.validateCpf(value);
      } else if (value.length === 18) {
        return this.validateCnpj(value);
      }
      return this.clearError();
    },
    "form.email"(value) {
      return this.validateEmail(value);
    },
    "form.password"(value) {
      this.validatePassword(value, this.form.confirmPassword);
    },
    "form.confirmPassword"(value) {
      this.validatePassword(value, this.form.password);
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
    ...mapActions("users", ["setUser", "getUserById", "editUser"]),
    ...mapActions("users", ["setLoggedUser"]),
    ...mapActions("units", ["getUnits", "setSelectedUnit"]),
    getUserRoleValue(value) {
      return value
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    },
    // transferir e adaptar para o mixins
    async submitCreate(event) {
      event.preventDefault();
      this.loading = true;
      const result = await this.setUser(this.form);
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
      const result = await this.editUser(data);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    afterSubmit() {
      let message = "Usuário cadastrado com sucesso.";
      if (this.isEdit) {
        message = "Usuário editado com sucesso.";
      }
      this.hasError = false;
      this.loading = false;
      this.$router.push({
        name: "Usuários",
        query: { success: true, message },
      });
    },
    // fim transferir e adaptar para o mixins
    deleteUser() {
      const values = {
        id: this.user.id,
        name: this.user.fullname,
      };
      this.$emit("deleteUser", values);
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
    validatePassword(value, otherValue) {
      if (value !== otherValue) {
        return this.setError("confirmPassword", true);
      }
      return this.setError("confirmPassword", false);
    },
    setError(origin, error) {
      this.hasError = { origin: origin, error: error };
    },
    clearError() {
      this.hasError = { origin: null, error: false };
    },
    toChangePasswordForm() {
      this.$router.push({
        name: "Alterar senha do usuário",
        params: { id: this.userId },
      });
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
