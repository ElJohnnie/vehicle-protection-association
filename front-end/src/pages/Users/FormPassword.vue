<template>
  <form @submit="submitPassword">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Alterar senha do usuário</h4>
      </md-card-header>

      <md-card-content>
        <div v-if="loading" class="md-layout md-gutter md-alignment-top-center">
          <progress-spinner class="md-alignment-top-center"></progress-spinner>
        </div>
        <template v-else>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Senha</label>
                <md-input
                  v-model="password"
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
                  v-model="confirmPassword"
                  type="password"
                  required
                ></md-input>
                <span class="md-error">Senhas não condizem</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-size-100 flex-between">
            <md-button
              class="md-raised md-success"
              type="submit"
              :disabled="dontSubmit"
              @click="submitPassword"
            >
              Alterar senha
              <md-icon>edit</md-icon>
            </md-button>
          </div>
        </template>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { ProgressSpinner } from "@/components";
import { mapActions } from "vuex";

export default {
  components: {
    ProgressSpinner,
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: "blue",
    },
    userId: null,
  },
  data() {
    return {
      password: null,
      confirmPassword: null,
      hasError: {
        origin: null,
        error: false,
      },
    };
  },
  computed: {
    dontSubmit() {
      return this.hasError.error;
    },
    confirmPasswordError() {
      return this.hasError.origin === "confirmPassword" && this.hasError.error;
    },
  },
  watch: {
    password(value) {
      this.validatePassword(value, this.confirmPassword);
    },
    confirmPassword(value) {
      this.validatePassword(value, this.password);
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
    ...mapActions("users", ["changeUserPassword"]),
    async submitPassword(event) {
      event.preventDefault();
      this.loading = true;
      const body = {
        password: this.$data.password,
        confirmPassword: this.$data.confirmPassword,
      };
      const data = {
        id: this.userId,
        body,
      };
      const result = await this.changeUserPassword(data);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    afterSubmit() {
      let message = "Senha do usuário alterada com sucesso.";
      this.hasError = false;
      this.loading = false;
      this.$router.push({
        name: "Usuários",
        query: { success: true, message },
      });
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
<style>
input[type="number"],
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -moz-appearance: textfield;
  -webkit-appearance: none;
}
</style>
