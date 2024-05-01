<template>
  <md-card class="md-card-profile" md-with-hove>
    <md-card-content>
      <h6 v-if="loggedUserNotEdit" class="category text-gray">
        Usuário logado
      </h6>
      <h6 v-else class="category text-gray">Usuário</h6>
      <h4 class="card-title">{{ user.fullname }}</h4>
      <p class="card-description" user.email>{{ user.email }}</p>
      <p class="card-description">{{ activated }}</p>
      <div>
        <md-button @click="toView" class="md-success md-icon-button md-fab"
          ><md-icon>visibility</md-icon
          ><md-tooltip md-direction="top">Ver mais</md-tooltip></md-button
        >
        <md-button
          @click="toEdit"
          class="md-warning md-icon-button md-fab"
          :disabled="loggedUserNotEdit"
          ><md-icon>edit</md-icon
          ><md-tooltip md-direction="top">Editar</md-tooltip></md-button
        >
        <md-button
          v-if="this.user.isActive"
          @click="activeMethod(false)"
          :disabled="loggedUserNotEdit"
          class="md-danger md-icon-button md-fab"
          ><md-icon>close</md-icon>
          <md-tooltip md-direction="top">Desativar</md-tooltip></md-button
        >
        <md-button
          v-else
          @click="activeMethod(true)"
          class="md-info md-icon-button md-fab"
          ><md-icon>done</md-icon>
          <md-tooltip md-direction="top">Ativar</md-tooltip></md-button
        >
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "user-card",
  props: {
    user: {},
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("users", ["loggedUser"]),
    loggedUserNotEdit() {
      return this.loggedUser.id === this.user.id;
    },
    activated() {
      if (this.user.isActive) {
        return "Usuário ativado";
      }
      return "Usuário não ativo";
    },
  },
  methods: {
    toView() {
      // por completar
      this.$router.push({
        name: "Ver usuário",
        params: { id: this.user.id },
      });
    },
    toEdit() {
      this.$router.push({
        name: "Editar usuário",
        params: { id: this.user.id },
      });
    },
    activeMethod(value) {
      const values = {
        id: this.user.id,
        name: this.user.fullname,
      };
      if (value) {
        return this.$emit("activeUser", values);
      }
      return this.$emit("inactiveUser", values);
    },
  },
};
</script>
