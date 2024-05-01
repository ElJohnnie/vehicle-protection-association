<template>
  <div class="content">
    <top-navbar></top-navbar>
    <div class="md-layout md-layout-button margin">
      <md-menu md-size="big" md-direction="top-start">
        <md-button @click="backButton()" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <div v-if="loading" class="md-layout md-alignment-center">
      <progress-spinner></progress-spinner>
    </div>
    <md-card v-else class="md-card-plain">
      <md-card-header data-background-color="blue">
        <h4 class="title">Dados completos da ocorrência</h4>
      </md-card-header>
      <md-card-content class="md-layout">
        <template>
          <div class="md-layout-item md-small-size-100 md-size-33 border">
            <h5 class="text-info">Informações cruciais</h5>
            <p>
              <span>Tipo de ocorrência:</span>
              {{ eventById.type }}
            </p>
            <p>
              <span>Policia acionada:</span>
              {{ eventById.policeReport ? "Sim" : "Não" }}
            </p>
            <p>
              <span>Data da ocorrência:</span>
              {{ eventById.occurrenceDateTime }}
            </p>
            <p>
              <span>Descrição:</span>
              {{ eventById.description }}
            </p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33 border">
            <h5 class="text-info">Endereço do ocorrido</h5>
            <p>
              <span>Cidade:</span>
              {{ eventById.address.city }}
            </p>
            <p>
              <span>Estado:</span>
              {{ eventById.address.state }}
            </p>
            <p>
              <span>Bairro:</span>
              {{ eventById.address.neighborhood }}
            </p>
            <p>
              <span>Rua:</span>
              {{ eventById.address.street }}
            </p>
            <p>
              <span>Número:</span>
              {{ eventById.address.number }}
            </p>
            <p>
              <span>Complemento:</span>
              {{ eventById.address.complement }}
            </p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33 border">
            <h5 class="text-info">Detalhes do veículo</h5>
            <p>
              <span>Marca:</span>
              {{ eventById.vehicle.brand }}
            </p>
            <p>
              <span>Modelo:</span>
              {{ eventById.vehicle.model }}
            </p>
            <p>
              <span>Ano do modelo:</span>
              {{ eventById.vehicle.yearModel }}
            </p>
          </div>
        </template>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import TopNavbar from "../Layout/TopNavbar.vue";
import { ProgressSpinner } from "@/components";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TopNavbar,
    ProgressSpinner,
  },
  data: function () {
    return {
      search: null,
      loading: true,
    };
  },
  computed: {
    ...mapGetters("events", ["eventById"]),
    eventId() {
      return this.$route.params.id;
    },
    origin() {
      return this.$route.query.origin;
    },
    originId() {
      return this.$route.query.id;
    },
  },
  watch: {
    eventById(value) {
      if (value) {
        this.title = this.eventById.name;
      }
    },
  },
  async created() {
    await this.getEventById(this.eventId).then(() => (this.loading = false));
  },
  methods: {
    ...mapActions("events", ["getEventById"]),
    backButton() {
      if (this.origin && this.originId) {
        return this.$router.push({
          name: "Ver veículo",
          params: { id: this.originId },
        });
      }
      return this.$router.push({
        name: "Ocorrências",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/view";
.md-layout-button {
  display: flex;
  align-content: flex-end;
  justify-content: end;
  margin-bottom: 36px;
  margin-right: 36px;
}
.md-alignment-center {
  align-items: initial !important;
}

.border {
  border-right: 1px solid #9e9e9e;
}
</style>
