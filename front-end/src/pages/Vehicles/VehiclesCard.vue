<template>
  <md-card class="md-card-profile">
    <md-card-content>
      <h4 class="card-title">
        {{ vehicle.model }} - {{ vehicle.licensePlate }}
      </h4>
      <p class="card-description">
        {{ vehiclesType }}
      </p>
      <h6 class="category text-gray">
        Proprietário {{ vehicle.client.fullname }} -
        {{ vehicle.client.documentNumber }}
      </h6>
      <div>
        <md-button @click="toView" class="md-success md-icon-button md-fab"
          ><md-icon>visibility</md-icon>
          <md-tooltip md-direction="top"
            >Ver veículo e contrato</md-tooltip
          ></md-button
        >
        <md-button @click="toEdit" class="md-warning md-icon-button md-fab"
          ><md-icon>edit</md-icon>
          <md-tooltip md-direction="top">Editar veículo</md-tooltip></md-button
        >
        <md-button @click="toEvent" class="md-danger md-icon-button md-fab"
          ><md-icon>car_crash</md-icon>
          <md-tooltip md-direction="top"
            >Cadastrar ocorrência</md-tooltip
          ></md-button
        >
        <md-button
          @click="createContract"
          class="md-info md-icon-button md-fab"
          :disabled="vehicle.contract !== null"
          ><md-icon>task</md-icon>
          <md-tooltip md-direction="top">Gerar contrato</md-tooltip></md-button
        >
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "vehicles-card",
  props: {
    vehicle: {},
  },
  data() {
    return {};
  },
  computed: {
    vehiclesType() {
      if (this.vehicle.type === "cars") return "Carro";
      else if (this.vehicle.type === "truck") return "Caminhão";
      else if (this.vehicle.type === "motorcycle") return "Moto";
      else return "Outros";
    },
  },
  methods: {
    toView() {
      this.$router.push({
        name: "Ver veículo",
        params: { id: this.vehicle.id },
      });
    },
    toEdit() {
      this.$router.push({
        name: "Editar veículo",
        params: { id: this.vehicle.id },
      });
    },
    toEvent() {
      this.$router.push({
        name: "Cadastrar ocorrência",
        params: { id: this.vehicle.id },
      });
    },
    createContract() {
      this.$router.push({
        name: "Criar contrato",
        params: { id: this.vehicle.id },
        query: { origin: "Veículos" },
      });
    },
  },
};
</script>
