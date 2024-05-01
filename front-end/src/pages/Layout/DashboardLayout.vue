<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <Sidebar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <MobileMenu slot="content"></MobileMenu>
      <sidebar-link :to="{ name: 'Dashboard' }">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link :to="{ name: 'Clientes' }">
        <md-icon>groups</md-icon>
        <p>Clientes</p>
      </sidebar-link>
      <sidebar-link :to="{ name: 'Veículos' }">
        <md-icon>directions_car_filled</md-icon>
        <p>Veículos</p>
      </sidebar-link>
      <!-- <sidebar-link :to="{ name: 'Contratos' }">
        <md-icon></md-icon>
        <p>Contratos</p>
      </sidebar-link> -->
      <sidebar-link :to="{ name: 'Ocorrências' }">
        <md-icon>car_crash</md-icon>
        <p>Ocorrências</p>
      </sidebar-link>
      <sidebar-link :to="{ name: 'Planos' }">
        <md-icon>sell</md-icon>
        <p>Planos</p>
      </sidebar-link>
      <sidebar-link :to="{ name: 'Usuários' }">
        <md-icon>account_circle</md-icon>
        <p>Usuários</p>
      </sidebar-link>
      <sidebar-link v-low-user="loggedUser" :to="{ name: 'Unidades' }">
        <md-icon>apartment</md-icon>
        <p>Unidades</p>
      </sidebar-link>
      <sidebar-link :to="{ name: 'Mapa' }">
        <md-icon>location_on</md-icon>
        <p>Geolocalização</p>
      </sidebar-link>
    </Sidebar>

    <div class="main-panel">
      <DashboardContent> </DashboardContent>
      <ContentFooter v-if="!$route.meta.hideFooter"></ContentFooter>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    DashboardContent,
    ContentFooter,
    MobileMenu,
  },
  data() {
    return {
      sidebarBackground: "blue",
      sidebarBackgroundImage: require("@/assets/img/background.jpg"),
    };
  },
  async created() {
    await Promise.all([this.setLoggedUser()]);
  },
  computed: {
    ...mapGetters("users", ["loggedUser"]),
  },
  methods: {
    ...mapActions("users", ["setLoggedUser"]),
  },
};
</script>
