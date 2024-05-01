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
                <label for="broken-escape">Selecionar gerência</label>
                <md-select v-model="form.userId" name="broken-escape" required>
                  <md-option
                    v-for="(user, index) in users"
                    :key="index"
                    :value="user.id"
                    >{{ user.fullname }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-size-100 flex-between">
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
  },
  data() {
    return {
      form: {},
      management: null,
      hasError: {
        origin: null,
        error: false,
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters("units", { unit: "unit", genericError: "error" }),
    ...mapGetters("users", ["users"]),
    textForm() {
      return "Gerente da unidade";
    },
    computedSubmit() {
      return this.submitCreate;
    },
    dontSubmit() {
      return this.hasError.error;
    },
  },
  async created() {
    this.loading = true;
    this.form.businessUnitId = this.$route.params.id;
    await Promise.all([
      this.getUsers(),
      this.getUnitById(this.$route.params.id),
    ]).then(() => (this.loading = false));
  },
  watch: {
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
    ...mapActions("users", ["getUsers"]),
    ...mapActions("units", ["getUnitById", "setUnitManager"]),
    // transferir e adaptar para o mixins
    async submitCreate(event) {
      event.preventDefault();
      this.loading = true;
      const result = await this.setUnitManager(this.form);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    afterSubmit() {
      let message = "Gerente da unidade alocado com sucesso.";
      this.hasError = false;
      this.loading = false;
      this.$router.push({
        name: "Unidades",
        query: { success: true, message },
      });
    },
    // fim transferir e adaptar para o mixins
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
