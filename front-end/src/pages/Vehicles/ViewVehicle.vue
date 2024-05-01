<template>
  <div class="content">
    <top-navbar></top-navbar>
    <div class="md-layout md-layout-button margin">
      <md-menu md-size="big" md-direction="top-start">
        <md-button @click="backButton" class="md-info md-raised toggle"
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
            <h4 class="title">Dados do veículo</h4>
          </md-card-header>
          <md-card-content class="md-layout md-alignment-center">
            <template>
              <div class="md-layout-item md-small-size-100 md-size-33 border">
                <h5 class="text-info">Informações de modelo</h5>
                <p class="text-muted">
                  <span class="tim-note">Marca:</span>
                  {{ vehicleById.brand }}
                </p>
                <p>
                  <span>Modelo:</span>
                  {{ vehicleById.model }}
                </p>
                <p>
                  <span>Ano do modelo:</span>
                  {{ vehicleById.yearModel }}
                </p>
                <p>
                  <span>Ano de fabricação:</span>
                  {{ vehicleById.yearManufacture }}
                </p>
                <p>
                  <span>Cor do veículo:</span>
                  {{ vehicleById.color }}
                </p>
                <p>
                  <span>Odômetro:</span>
                  {{ vehicleById.odometer }}
                </p>
                <p>
                  <span>Cilindradas:</span>
                  {{ vehicleById.engineCapacity }}
                </p>
                <p>
                  <span>Rastreador:</span>
                  {{ vehicleById.tracker ? "Sim" : "Não" }}
                </p>
                <p>
                  <span>Carreta:</span>
                  {{ vehicleById.trailer ? "Sim" : "Não" }}
                </p>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33 border">
                <h5 class="text-info">Informações cruciais</h5>
                <p>
                  <span>Emplacamento:</span>
                  {{ vehicleById.licensePlate }}
                </p>
                <p>
                  <span>Renavam:</span>
                  {{ vehicleById.renavam }}
                </p>
                <p>
                  <span>Chassis:</span>
                  {{ vehicleById.chassi }}
                </p>
                <p>
                  <span>FIPE:</span>
                  {{ vehicleById.value }}
                </p>
                <p>
                  <span>Alienação:</span>
                  {{ vehicleById.alieneted ? "Sim" : "Não" }}
                </p>
                <p v-if="vehicleById.alieneted">
                  <span>Valor financiado:</span>
                  {{ vehicleById.financedAmount }}
                </p>
                <p>
                  <span>Observações:</span>
                  {{ vehicleById.observations }}
                </p>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <h5 class="text-info">Imprimir documentos</h5>
                <div>
                  <md-button
                    @click="toPrint('contract')"
                    class="md-info md-icon-button md-fab"
                    ><md-icon>description</md-icon>
                    <md-tooltip md-direction="top"
                      >Gerar contrato</md-tooltip
                    ></md-button
                  >
                  <md-button
                    @click="toPrint('cancel')"
                    class="md-info md-icon-button md-fab"
                    ><md-icon>cancel</md-icon>
                    <md-tooltip md-direction="top"
                      >Termo de cancelamento</md-tooltip
                    ></md-button
                  >
                  <md-button
                    @click="toPrint('theft')"
                    class="md-info md-icon-button md-fab"
                    ><md-icon>local_police</md-icon>
                    <md-tooltip md-direction="top"
                      >Termo de furto e roubo</md-tooltip
                    ></md-button
                  >
                  <md-button
                    @click="toPrint('payment')"
                    class="md-info md-icon-button md-fab"
                    ><md-icon>car_repair</md-icon>
                    <md-tooltip md-direction="top"
                      >Termo de pagamento de veículo</md-tooltip
                    ></md-button
                  >
                  <md-button
                    @click="toPrint('receive')"
                    class="md-info md-icon-button md-fab"
                    ><md-icon>no_crash</md-icon>
                    <md-tooltip md-direction="top"
                      >Termo de recebimento de veículo</md-tooltip
                    ></md-button
                  >
                  <md-button
                    @click="toPrint('get')"
                    class="md-info md-icon-button md-fab"
                    ><md-icon>car_rental</md-icon>
                    <md-tooltip md-direction="top"
                      >Termo de entrega de veículo</md-tooltip
                    ></md-button
                  >
                </div>
              </div>
            </template>
          </md-card-content>
        </md-card>
      </div>
      <div
        v-if="vehicleById.secondDriver.id"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="blue">
            <h4 class="title">Segundo condutor</h4>
          </md-card-header>
          <md-card-content class="md-layout md-alignment-center">
            <template>
              <div class="md-layout-item md-small-size-100 md-size-33 border">
                <p>
                  <span>Nome completo:</span>
                  {{ vehicleById.secondDriver.fullname }}
                </p>
                <p>
                  <span>Documentação:</span>
                  {{ vehicleById.secondDriver.documentNumber }}
                </p>
                <p>
                  <span>Data de nascimento:</span>
                  {{ vehicleById.secondDriver.birthDate }}
                </p>
                <p>
                  <span>CNH:</span>
                  {{ vehicleById.secondDriver.licenseDocument.licenseDocument }}
                </p>
                <p>
                  <span>Categoria:</span>
                  {{ vehicleById.secondDriver.licenseDocument.licenseCategory }}
                </p>
              </div>
            </template>
          </md-card-content>
        </md-card>
      </div>
      <div
        v-if="vehicleById.events.length"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="blue">
            <h4 class="title">Ocorrências do veículo</h4>
          </md-card-header>
          <md-card-content>
            <ordered-table
              :values="vehicleById.events"
              :columns="['description', 'type', 'policeReport']"
              :header="['Descrição', 'Tipo', 'Polícia acionada']"
              :buttonTo="true"
              propIdKey="id"
              origin="veiculos"
              propName="Ver ocorrência"
              :originId="vehicleById.id"
            ></ordered-table>
          </md-card-content>
        </md-card>
      </div>
      <div
        v-if="vehicleById.contract"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="blue">
            <h4 class="title">Contrato do veículo</h4>
          </md-card-header>
          <div v-if="loading" class="md-layout md-alignment-center">
            <progress-spinner></progress-spinner>
          </div>
          <md-card-content v-else class="md-layout md-alignment-center">
            <template>
              <div class="md-layout-item md-small-size-100 md-size-33 border">
                <h5 class="text-info">Galaxy Pay</h5>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33 border">
                <h5 class="text-info">Status gerais</h5>
                <p>
                  <span>Contrato está:</span>
                  {{
                    this.contractByParam.status === "active"
                      ? "Ativo"
                      : "Inativo"
                  }}
                </p>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <h5 class="text-info">Ações</h5>
                <md-button
                  @click="toGalaxyPay()"
                  class="md-info md-icon-button md-fab"
                  ><md-icon>payments</md-icon>
                  <md-tooltip md-direction="top"
                    >Acessar Galaxy Pay do cliente</md-tooltip
                  ></md-button
                >
              </div>
            </template>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbar from "../Layout/TopNavbar.vue";
import { ProgressSpinner, OrderedTable } from "@/components";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TopNavbar,
    ProgressSpinner,
    OrderedTable,
  },
  data: function () {
    return {
      search: null,
      loading: true,
      title: null,
    };
  },
  computed: {
    ...mapGetters("vehicles", ["vehicleById"]),
    ...mapGetters("contracts", ["contractByParam"]),
    paramId() {
      return this.$route.params.id;
    },
    origin() {
      return this.$route.query.origin;
    },
    originId() {
      return this.$route.query.id;
    },
    isEvent() {
      return this.$route.query.event;
    },
  },
  watch: {
    vehicleById(value) {
      if (value) {
        this.title = `${value.model} - ${value.fullname}`;
      }
    },
  },
  async created() {
    await this.getVehicleById(this.paramId).then(() => {
      if (this.vehicleById.contract) {
        this.getContractByParam(this.vehicleById.licensePlate).then(
          () => (this.loading = false)
        );
      } else {
        this.loading = false;
      }
    });
  },
  methods: {
    ...mapActions("vehicles", ["getVehicleById"]),
    ...mapActions("contracts", ["getContractByParam"]),
    toPrint(value) {
      return this.$router.push({
        name: "Gerar impressão",
        params: { type: value },
        query: { vehicle: this.paramId, client: this.vehicleById.clientId },
      });
    },
    periodicityTranslate(value) {
      if (value === "yearly") return "Anual";
    },
    backButton() {
      if (this.origin && this.originId) {
        return this.$router.push({
          name: "Ver cliente",
          params: { id: this.originId },
        });
      }
      if (this.isEvent) {
        return this.$router.push({
          name: "Ocorrências",
        });
      }
      return this.$router.push({
        name: "Veículos",
      });
    },
    returnBankRealValue(value) {
      const sanitizedValue = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      if (sanitizedValue === "itau") {
        return "Banco Itaú";
      }
    },
    toGalaxyPay() {
      window.open(this.contractByParam.paymentLink, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/view";
</style>
