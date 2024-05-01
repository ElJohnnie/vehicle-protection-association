<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">Perfil</h6>
      <h4 class="card-title">{{ user.email }}</h4>
      <p class="card-description">{{ user.fullname }}</p>
      <md-button :to="{ name: 'Editar perfil' }" class="md-round md-success"
        >Editar</md-button
      >
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg"),
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
};
</script>
<style></style>
