<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Por favor, contacta con soporte indicando el error"
      @close="handleDialogError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <housing-filter
        data-cy="housing-filter"
        @change-filter="setFilters"
      ></housing-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button
            data-cy="housing-reload-btn"
            mode="outline"
            @click="loadHousing(true)"
            >Actualizar</base-button
          >
          <base-button
            data-cy="housing-login-btn"
            link
            to="/autenticacion?redirect=registro"
            v-if="!isLoggedIn"
            >¿Quieres alquilar? Inicia sesión</base-button
          >
          <base-button
            data-cy="housing-upload-btn"
            v-if="isLoggedIn && !isHousing && !isLoading"
            link
            to="/registro"
            >¿Quieres alquilar? ¡Sube tu piso!</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasHousing">
          <housing-item
            data-cy="housing-item"
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
  </div>
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
      error: null,
      activeFilters: {
        lgtb: true,
        bath: true,
        couples: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
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
    async loadHousing(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('housing/loadHousing', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error =
          error.message || 'Error inesperado al cargar las viviendas';
      }
      this.isLoading = false;
    },
    handleDialogError() {
      this.error = null;
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
