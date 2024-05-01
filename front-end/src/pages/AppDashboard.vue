<template>
  <div class="content">
    <top-navbar></top-navbar>
    <div v-if="loading" class="md-layout md-alignment-center">
      <progress-spinner></progress-spinner>
    </div>
    <div v-else class="md-layout">
      <!-- <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="dailySalesChart.data"
          :chart-options="dailySalesChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Ver possibilidade de uso</h4>
            <p class="category">
              <span class="text-success"
                ><i class="fas fa-long-arrow-alt-up"></i> 55%
              </span>
              Um número qualquer
            </p>
          </template>
        </chart-card>
      </div> -->
      <!-- <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="emailsSubscriptionChart.data"
          :chart-options="emailsSubscriptionChart.options"
          :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Ver possibilidade de uso</h4>
            <p class="category">Um número qualquer</p>
          </template>
        </chart-card>
      </div> -->
      <!-- <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="dataCompletedTasksChart.data"
          :chart-options="dataCompletedTasksChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Ver possibilidade de uso</h4>
            <p class="category">Um número qualquer</p>
          </template>
        </chart-card>
      </div> -->
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>person</md-icon>
          </template>

          <template slot="content">
            <p class="category">Clientes</p>
            <h3 class="title">{{ clients.length }}</h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>directions_car</md-icon>
          </template>

          <template slot="content">
            <p class="category">Veículos</p>
            <h3 class="title">
              {{ allVehicles.length }}
              <small></small>
            </h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>description</md-icon>
          </template>

          <template slot="content">
            <p class="category">Contratos</p>
            <h3 class="title">{{ contracts.length }}</h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <nav-tabs-card>
          <template slot="content">
            <md-tabs class="md-info" md-alignment="center">
              <md-tab id="tab-clients" md-label="Clientes" md-icon="code">
                <nav-tabs-table
                  prop-title="fullname"
                  second-propertie="email"
                  :prop-itens="clients"
                ></nav-tabs-table>
              </md-tab>

              <md-tab id="tab-vehicles" md-label="Veículos" md-icon="code">
                <nav-tabs-table
                  prop-title="model"
                  second-propertie="licensePlate"
                  :prop-itens="allVehicles"
                ></nav-tabs-table>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </div>
      <!-- <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Exemplo de tabela</h4>
            <p class="category">Tabela básica</p>
          </md-card-header>
          <md-card-content>
            <ordeblue-table table-header-color="green"></ordeblue-table>
          </md-card-content>
        </md-card>
      </div> -->
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  // ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrdeblueTable,
  ProgressSpinner,
} from "@/components";
import { mapActions, mapGetters } from "vuex";
import TopNavbar from "./Layout/TopNavbar.vue";

export default {
  components: {
    StatsCard,
    // ChartCard,
    NavTabsCard,
    NavTabsTable,
    // OrdeblueTable,
    TopNavbar,
    ProgressSpinner,
  },
  props: {
    underConstruct: {
      type: String,
      default: require("@/assets/img/underconstruct.png"),
    },
  },
  data() {
    return {
      loading: true,
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },
  computed: {
    ...mapGetters("vehicles", ["allVehicles"]),
    ...mapGetters("clients", ["clients"]),
    contracts() {
      return this.allVehicles.map((el) => el.contracts);
    },
  },
  async created() {
    await Promise.all([this.getVehicles(), this.getClients()]).then(
      () => (this.loading = false)
    );
  },
  methods: {
    ...mapActions("clients", ["getClients"]),
    ...mapActions("vehicles", ["getVehicles"]),
  },
};
</script>
<style>
.img-width {
  max-width: 50vw;
}
</style>
