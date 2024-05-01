<template>
  <div class="content">
    <top-navbar></top-navbar>
    <div class="md-layout md-layout-button margin">
      <md-menu md-size="big" md-direction="top-start">
        <md-button :to="{ name: 'Clientes' }" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <div v-if="loading" class="md-layout md-alignment-center">
      <progress-spinner></progress-spinner>
    </div>
    <div v-else class="md-alignment-center">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="blue">
            <h4 class="title">
              Dados do cliente
              {{
                allVehicles.length ? "" : "- Não possui veículos cadastrados"
              }}
            </h4>
          </md-card-header>

          <md-card-content class="md-layout md-alignment-center">
            <template>
              <div class="md-layout-item md-small-size-100 md-size-33 border">
                <h5 class="text-info">Dados pessoais</h5>
                <p class="text-muted">
                  <span class="tim-note">Data de Nascimento:</span>
                  {{ clientById.identityDocument.birthDate }}
                </p>
                <p>
                  <span>RG:</span>
                  {{ clientById.identityDocument.identityNumber }}
                </p>
                <p>
                  <span>Orgão de Expedição:</span>
                  {{ clientById.identityDocument.expeditionOrgan }}
                </p>
                <p>
                  <span>Estado de Expedição:</span>
                  {{ clientById.identityDocument.UF }}
                </p>
                <p>
                  <span>CPF/CNPJ:</span>
                  {{ formatDocumentNumber(clientById.documentNumber) }}
                </p>
                <p>
                  <span>CNH:</span>
                  {{ clientById.licenseDocument.licenseNumber }}
                </p>
                <p>
                  <span>Categoria:</span>
                  {{ clientById.licenseDocument.licenseCategory }}
                </p>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33 border">
                <h5 class="text-info">Contato</h5>
                <p><span>E-mail:</span> {{ clientById.email }}</p>
                <p>
                  <span>Celular:</span>
                  {{ formatPhone(clientById.mobilephone) }}
                </p>
                <p><span>Telefone:</span> {{ clientById.telephone }}</p>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <h5 class="text-info">Endereço</h5>
                <p><span>CEP:</span> {{ clientById.address.zipCode }}</p>
                <p>
                  <span>Cidade/Estado:</span>
                  {{ clientById.address.city }}/{{ clientById.address.state }}
                </p>
                <p><span>Rua:</span> {{ clientById.address.street }}</p>
                <p>
                  <span>Bairro:</span>
                  {{ clientById.address.neighborhood }}
                </p>
              </div>
            </template>
          </md-card-content>
        </md-card>
      </div>
      <div
        v-if="allVehicles.length"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="blue">
            <h4 class="title">Veículos do cliente</h4>
          </md-card-header>
          <md-card-content>
            <ordered-table
              :values="allVehicles"
              :columns="['brand', 'model', 'yearManufacture', 'licensePlate']"
              :header="['Marca', 'Modelo', 'Ano de fabricação', 'Emplacamento']"
              :buttonTo="true"
              propIdKey="id"
              origin="cliente"
              :originId="clientById.id"
            ></ordered-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbar from "../Layout/TopNavbar.vue";
import { ProgressSpinner, OrderedTable } from "@/components";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { parseISO, format } from "date-fns";
import { formatDocumentNumber, formatPhone } from "../../helpers/utils";

export default {
  components: {
    TopNavbar,
    OrderedTable,
    ProgressSpinner,
  },
  data: function () {
    return {
      search: null,
      loading: true,
      parseISO,
      format,
      formatDocumentNumber,
      formatPhone,
      title: null,
    };
  },
  computed: {
    ...mapGetters("clients", ["clientById"]),
    ...mapGetters("vehicles", ["allVehicles"]),
    client() {
      return this.$route.params.id;
    },
    clientIdRoute() {
      return `cliente/${this.client}`;
    },
  },
  watch: {
    clientById(value) {
      if (value) {
        this.getVehiclesByClient(value.id);
        this.title = this.clientById.name;
      }
    },
  },
  async created() {
    await this.getClientById(this.client).then(() => (this.loading = false));
  },
  methods: {
    ...mapActions("clients", ["getClientById"]),
    ...mapActions("vehicles", ["getVehiclesByClient"]),
    ...mapMutations("clients", ["RESTORE_STATE"]),
    registerVehicle() {
      this.$router.push({
        name: "Adicionar veículos",
        query: { clientId: this.clientById.id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/view";
</style>
