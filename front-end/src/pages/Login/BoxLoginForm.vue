<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Login</h4>
        <p class="category">Faça login na plataforma</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter md-alignment-center">
          <progress-spinner v-if="loading"></progress-spinner>
          <div v-else class="md-layout-item md-size-80">
            <form @submit.prevent="submitLogin">
              <div>
                <md-field>
                  <label>E-mail</label>
                  <md-input
                    v-model="emailadress"
                    type="email"
                    required
                  ></md-input>
                </md-field>
              </div>
              <div>
                <md-field>
                  <label>Senha</label>
                  <md-input
                    v-model="password"
                    type="password"
                    required
                  ></md-input>
                  <span class="md-error">Error Test</span>
                </md-field>
              </div>
              <div class="layout-button">
                <md-button class="md-raised md-info" type="submit"
                  >Entrar</md-button
                >
              </div>
            </form>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { ProgressSpinner } from "@/components";

export default {
  name: "box-login-form",
  components: {
    ProgressSpinner,
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      emailadress: null,
      password: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters("users", ["user", "error"]),
  },
  watch: {
    error(error) {
      if (error) {
        this.loading = false;
      }
    },
  },
  methods: {
    ...mapActions("users", ["setLogin", "setLoggedUser"]),
    async submitLogin() {
      this.loading = true;
      const params = {
        email: this.emailadress,
        password: this.password,
      };
      const result = await this.setLogin(params);
      if (result === "success") {
        this.afterSubmit();
      }
    },
    afterSubmit() {
      this.$router.push({
        name: "Selecione a unidade",
      });
    },
  },
};
</script>
<style>
.layout-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
