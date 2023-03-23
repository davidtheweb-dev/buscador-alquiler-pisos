<template>
  <section>
    <base-card>
      <h2>¡Sube el anuncio de tu piso y encuentra compañero!</h2>
      <housing-form @save-data="saveData"></housing-form>
    </base-card>
  </section>
</template>

<script>
import HousingForm from '../../components/housing/HousingForm.vue';

export default {
  components: {
    HousingForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('housing/registerHousing', data);
      this.$router.replace('/viviendas');
    },
  },
};
</script>
