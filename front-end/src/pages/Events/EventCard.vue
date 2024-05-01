<template>
  <md-card class="md-card-profile" md-with-hove>
    <md-card-content>
      <h6 class="category text-gray">Ocorrência</h6>
      <h4 class="card-title">{{ event.type }}</h4>
      <p class="card-description">{{ event.occurrenceDateTime }}</p>
      <p class="card-description">{{ event.description }}</p>
      <p class="card-description">
        {{ event.vehicle.model }}
      </p>
      <p class="card-description">
        {{ event.vehicle.licensePlate }}
      </p>
      <div>
        <md-button @click="toView" class="md-success md-icon-button md-fab"
          ><md-icon>visibility</md-icon
          ><md-tooltip md-direction="top">Ver mais</md-tooltip></md-button
        >
        <md-button @click="toEdit" class="md-warning md-icon-button md-fab"
          ><md-icon>edit</md-icon
          ><md-tooltip md-direction="top">Editar</md-tooltip></md-button
        >
        <md-button @click="toVehicle" class="md-info md-icon-button md-fab"
          ><md-icon>directions_car_filled</md-icon
          ><md-tooltip md-direction="top"
            >Ver veículo envolvido</md-tooltip
          ></md-button
        >
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import { parseISO, format } from "date-fns";
export default {
  name: "event-card",
  props: {
    event: {},
  },
  data() {
    return {
      parseISO,
      format,
    };
  },
  computed: {},
  methods: {
    toView() {
      // por completar
      this.$router.push({
        name: "Ver ocorrência",
        params: { id: this.event.id },
      });
    },
    toEdit() {
      this.$router.push({
        name: "Editar ocorrência",
        params: { id: this.event.id },
      });
    },
    toVehicle() {
      this.$router.push({
        name: "Ver veículo",
        params: { id: this.event.vehicle.id },
        query: { event: true },
      });
    },
  },
};
</script>
