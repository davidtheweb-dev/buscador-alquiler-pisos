<template>
  <base-card>
    <h2>¡Encuentra tu piso!</h2>
    <span class="filter-option">
      <input type="checkbox" id="lgtb" checked @change="setFilter" />
      <label for="lgtb">LGTB friendly</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="bath" checked @change="setFilter" />
      <label for="bath">Baño privado</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="couples" checked @change="setFilter" />
      <label for="couples">Admite parejas</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        lgtb: true,
        bath: true,
        couples: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
