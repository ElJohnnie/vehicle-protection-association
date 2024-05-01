<template>
  <div>
    <md-table v-model="allItems">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell>{{ item[propTitle] }}</md-table-cell>
        <md-table-cell>{{ item[secondPropertie] }}</md-table-cell>
        <md-table-cell>{{ item[thirtPropertie] }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-just-icon md-simple md-info">
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
  name: "nav-tabs-table",
  props: {
    propItens: {
      type: Array,
      default: () => [],
    },
    propTitle: {
      type: String,
      default: null,
    },
    secondPropertie: {
      type: String,
      default: null,
    },
    thirtPropertie: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      selected: [],
      allItems: [],
    };
  },
  created() {
    this.allItems = this.propItens;
  },
  methods: {
    onSelect: function (items) {
      this.selected = items;
    },
  },
};
</script>
