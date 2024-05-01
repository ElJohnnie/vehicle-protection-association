<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Editar seu perfil</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label>Nome</label>
              <md-input v-model="form.fullname" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
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
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label>email</label>
              <md-input v-model="form.email" type="email" required></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label>Senha antiga</label>
              <md-input v-model="oldPassword" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label>Nova senha</label>
              <md-input
                v-model="newPassword"
                type="password"
                :required="oldPassword !== null && oldPassword !== ''"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="{ 'md-invalid': confirmPasswordError }">
              <label>Confirme a senha</label>
              <md-input
                v-model="confirmPassword"
                type="password"
                :required="oldPassword !== null && oldPassword !== ''"
              ></md-input>
              <span class="md-error">Senhas não condizem</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button
              class="md-raised md-success"
              type="submit"
              :disabled="dontSubmit"
              @click="submitEdit"
              >Editar perfil</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import validations from "@/helpers/validations.js";

export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      form: {},
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,
      hasError: {
        origin: null,
        error: false,
      },
      changePasswordSuccess: false,
    };
  },
  computed: {
    ...mapGetters("profile", ["profile"]),
    documentNumberMask() {
      if (this.form.documentNumber && this.form.documentNumber.length > 14) {
        return "##.###.###/####-##";
      }
      return "###.###.###-##";
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
    dontSubmit() {
      return this.hasError.error;
    },
    confirmPasswordError() {
      return this.hasError.origin === "confirmPassword" && this.hasError.error;
    },
    applyPassword() {
      return (
        this.newPassword &&
        this.newPassword.length &&
        this.newPassword === this.confirmPassword
      );
    },
  },
  watch: {
    profile(value) {
      this.form = { ...value.user };
    },
    form: {
      handler(value) {
        if (value.email) this.validateEmail(value.email);
        if (value.documentNumber && value.documentNumber.length === 14) {
          return this.validateCpf(value.documentNumber);
        } else if (value.documentNumber && value.documentNumber.length === 18) {
          return this.validateCnpj(value.documentNumber);
        }
        return this.clearError();
      },
      deep: true,
    },
    newPassword(value) {
      this.validatePassword(value, this.confirmPassword);
    },
    confirmPassword(value) {
      this.validatePassword(value, this.newPassword);
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
  created() {
    this.loggedProfile();
  },
  methods: {
    ...mapActions("profile", [
      "loggedProfile",
      "editProfile",
      "editPasswordProfile",
    ]),
    async submitEdit(event) {
      event.preventDefault();
      this.loading = true;
      if (this.applyPassword) {
        const passwordResult = await this.editPasswordProfile({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        });
        if (passwordResult === "success") {
          this.changePasswordSuccess = true;
        } else {
          return null;
        }
      }
      const result = await this.editProfile(this.form);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    afterSubmit() {
      let message = "Seu perfil foi editado com sucesso";
      if (this.changePasswordSuccess) {
        message =
          "Seu perfil e também a alteração de senha foram editados com sucesso";
      }
      this.hasError = false;
      this.loading = false;
      this.changePasswordSuccess = false;
      this.$router.push({
        name: "Ver perfil",
        query: { success: true, message },
      });
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
  },
};
</script>
