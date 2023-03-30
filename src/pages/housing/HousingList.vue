<template>
  <section>
    <housing-filter @change-filter="setFilters"></housing-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadHousing"
          >Actualizar</base-button
        >
        <base-button v-if="!isHousing && !isLoading" link to="/registro"
          >¿Quieres alquilar? ¡Regístrate!</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasHousing">
        <housing-item
          v-for="housing in filteredHousing"
          :key="housing.id"
          :id="housing.id"
          :title="housing.title"
          :rate="housing.rate"
          :tags="housing.tags"
        ></housing-item>
      </ul>
      <h3 v-else>No se han encontrado viviendas.</h3>
    </base-card>
  </section>
</template>

<script>
import HousingItem from '../../components/housing/HousingItem.vue';
import HousingFilter from '../../components/housing/HousingFilter.vue';

export default {
  components: {
    HousingItem,
    HousingFilter,
  },
  data() {
    return {
      isLoading: false,
      activeFilters: {
        lgtb: true,
        bath: true,
        couples: true,
      },
    };
  },
  computed: {
    filteredHousing() {
      const housing = this.$store.getters['housing/housing'];
      return housing.filter((housing) => {
        if (this.activeFilters.lgtb && housing.tags.includes('LGTB friendly')) {
          return true;
        }
        if (this.activeFilters.bath && housing.tags.includes('Baño privado')) {
          return true;
        }
        if (
          this.activeFilters.couples &&
          housing.tags.includes('Admite parejas')
        ) {
          return true;
        }
        return false;
      });
    },
    hasHousing() {
      return !this.isLoading && this.$store.getters['housing/hasHousing'];
    },
    isHousing() {
      return this.$store.getters['housing/isHousing'];
    },
  },
  created() {
    this.loadHousing();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadHousing() {
      this.isLoading = true;
      await this.$store.dispatch('housing/loadHousing');
      this.isLoading = false;
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
