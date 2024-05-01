<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <!-- <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="selectedEmployee"
              :md-options="employees"
            >
              <label>Pesquisar...</label>
            </md-autocomplete>
          </div> -->
          <md-list>
            <md-list-item v-if="selectUnit" href="/">
              <i class="material-icons">home</i>
              <p class="hidden-lg hidden-md">Home</p>
            </md-list-item>
            <!-- <md-list-item href="#/notifications" class="dropdown">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="material-icons">notifications</i>
                  <span class="notification">5</span>
                  <p class="hidden-lg hidden-md">Notifications</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="#">Mike John responded to your email</a></li>
                  <li><a href="#">You have 5 new tasks</a></li>
                  <li><a href="#">You're now friend with Andrew</a></li>
                  <li><a href="#">Another Notification</a></li>
                  <li><a href="#">Another One</a></li>
                </ul>
              </drop-down>
            </md-list-item> -->
            <li class="md-list-item">
              <a
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>person</md-icon>
                      <p class="hidden-lg hidden-md">person</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a @click="viewProfile">Ver pefil</a></li>
                      <li><a @click="logout">Deslogar</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: "blue",
    },
    selectUnit: {
      type: Boolean,
      default: false,
    },
    clientId: null,
  },
  data() {
    return {
      selectedEmployee: null,
    };
  },
  methods: {
    ...mapActions("users", ["unsetLogin"]),
    logout() {
      this.unsetLogin();
      document.location.reload(true);
    },
    viewProfile() {
      this.$router.push({
        name: "Ver perfil",
      });
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
  },
};
</script>

<style lang="css"></style>
