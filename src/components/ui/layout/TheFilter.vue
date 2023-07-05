<template>
  <base-card>
    <h2>¡Encuentra tu piso!</h2>
    <span class="filter-option">
      <input id="lgtb" type="checkbox" checked @change="setFilter" />
      <label for="lgtb">LGTB friendly</label>
    </span>
    <span class="filter-option">
      <input id="bath" type="checkbox" checked @change="setFilter" />
      <label for="bath">Baño privado</label>
    </span>
    <span class="filter-option">
      <input id="couples" type="checkbox" checked @change="setFilter" />
      <label for="couples">Admite parejas</label>
    </span>
  </base-card>
</template>

<script setup>
const emit = defineEmits(['change-filter']);

let filters = {
  lgtb: true,
  bath: true,
  couples: true,
};

function setFilter(event) {
  const inputId = event.target.id;
  const isActive = event.target.checked;

  const updatedFilters = {
    ...filters,
    [inputId]: isActive, // Overrides the filter that changed (inputId) and its new value (isActive)
  };

  filters = updatedFilters;
  emit('change-filter', updatedFilters);
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
  white-space: nowrap;
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
