<template>
  <div>
    <md-table v-model="localValues" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell
          v-for="(i, k) in columns"
          :key="k"
          :md-label="header[k]"
          >{{ sanitizeValue(item[i]) }}</md-table-cell
        >
        <md-table-cell v-if="buttonTo">
          <md-button
            class="md-just-icon md-simple md-primary"
            @click="toView(item[propIdKey])"
          >
            <md-icon>visibility</md-icon>
            <md-tooltip md-direction="top">Ver mais</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "blue",
    },
    values: {
      type: [Object, Array],
      default: () => [],
    },
    header: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    buttonTo: {
      type: Boolean,
      default: false,
    },
    propName: {
      type: String,
      default: "Ver veículo",
    },
    propIdKey: {
      type: String,
      default: "",
    },
    originId: {
      type: String,
      default: "",
    },
    origin: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: [],
      localValues: [],
    };
  },
  created() {
    this.localValues = this.values;
  },
  methods: {
    toView(id) {
      // por completar
      this.$router.push({
        name: this.propName,
        params: { id },
        query: { origin: this.origin, id: this.originId },
      });
    },
    sanitizeValue(value) {
      if (typeof value === "boolean") {
        return value ? "Sim" : "Não";
      } else {
        return value;
      }
    },
  },
};
</script>
