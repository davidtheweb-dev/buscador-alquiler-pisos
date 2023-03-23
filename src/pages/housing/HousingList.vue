<template>
  <section>FILTER COMPONENT</section>
  <section>
    <div class="controls">
      <button>Actualizar</button>
      <router-link to="/registro">¿Quieres alquilar? ¡Regístrate!</router-link>
    </div>
    <ul v-if="hasHousing">
      <housing-item
        v-for="housing in filteredHousing"
        :key="housing.id"
        :id="housing.id"
        :title="housing.title"
        :rate="housing.monthRate"
        :tags="housing.tags"
      ></housing-item>
    </ul>
    <h3 v-else>No se han encontrado viviendas.</h3>
  </section>
</template>

<script>
import HousingItem from '../../components/housing/HousingItem.vue';

export default {
  components: {
    HousingItem,
  },
  computed: {
    filteredHousing() {
      return this.$store.getters['housing/getHousing'];
    },
    hasHousing() {
      return this.$store.getters['housing/hasHousing'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
