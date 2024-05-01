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
                <label>Tipo</label>
                <md-input v-model="form.type" required></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Data da ocorrência</label>
                <md-input
                  class="input-date"
                  v-mask="'##/##/####'"
                  v-model="form.occurrenceDateTime"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="police-report">Policia acionada</label>
                <md-select
                  name="police-report"
                  v-model="form.policeReport"
                  required
                >
                  <md-option
                    v-for="(type, index) in selectOptionsComputed"
                    :key="index"
                    :value="type.value"
                    >{{ type.name }}</md-option
                  >
                </md-select>
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
                <md-select id="state" name="state" v-model="form.address.state">
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
          <div class="md-layout md-gutter md-alignment-left">
            <div
              class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100"
            >
              <md-field>
                <label>Descrição da ocorrência</label>
                <md-textarea v-model="form.description" required></md-textarea>
              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-size-100 flex-between">
            <md-button
              v-if="isEdit"
              v-low-user="loggedUser"
              class="md-raised md-warning"
              @click="deleteEvent"
              >Deletar corrência <md-icon>delete</md-icon></md-button
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
    eventId: null,
  },
  data() {
    return {
      form: {
        address: {},
      },
      hasError: {
        origin: null,
        error: false,
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters("events", { eventById: "eventById", genericError: "error" }),
    ...mapGetters("users", ["loggedUser"]),
    textForm() {
      if (this.isEdit) {
        return "Editar ocorrência";
      }
      return "Cadastrar ocorrência";
    },
    computedSubmit() {
      if (this.isEdit) {
        return this.submitEdit;
      }
      return this.submitCreate;
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
    selectOptionsComputed() {
      return [
        { name: "Sim", value: true },
        { name: "Não", value: false },
      ];
    },
    dontSubmit() {
      return this.hasError.error;
    },
  },
  async created() {
    this.setLoggedUser();
    if (this.isEdit) {
      this.loading = true;
      await this.getEventById(this.eventId).then(() => (this.loading = false));
    } else {
      this.form.vehicleId = this.$route.params.id;
    }
  },
  watch: {
    "form.address.zipCode"(value) {
      if (value.length >= 9) {
        this.searchCep(value);
      }
      return this.clearError();
    },
    eventById(value) {
      if (value) {
        this.form = { ...value };
      }
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
    ...mapActions("events", ["setEvent", "getEventById", "editEvent"]),
    ...mapActions("address", ["getAddressByCep"]),
    ...mapActions("users", ["setLoggedUser"]),
    // transferir e adaptar para o mixins
    async submitCreate(event) {
      event.preventDefault();
      this.loading = true;
      const result = await this.setEvent(this.form);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    async submitEdit(event) {
      event.preventDefault();
      this.loading = true;
      const data = {
        id: this.eventId,
        body: this.form,
      };
      const result = await this.editEvent(data);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    afterSubmit() {
      let message = "Ocorrência criada com sucesso.";
      if (this.isEdit) {
        message = "Ocorrência editada com sucesso.";
      }
      this.hasError = false;
      this.loading = false;
      this.$router.push({
        name: "Ocorrências",
        query: { success: true, message },
      });
    },
    // fim transferir e adaptar para o mixins
    deleteEvent() {
      const values = {
        id: this.eventById.id,
        name: this.eventById.type,
      };
      this.$emit("deleteEvent", values);
    },
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
