<template>
  <section>
    <base-card>
      <h2>{{ title }}</h2>
      <h3>{{ rate }}€/mes</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>¿Te interesa? ¡Háblame!</h2>
        <base-button link :to="contactLink">Contactar</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="tag in tags"
        :key="tag"
        :type="tag"
        :title="tag"
      ></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedHousing: null,
    };
  },
  computed: {
    title() {
      return this.selectedHousing.title;
    },
    rate() {
      return this.selectedHousing.rate;
    },
    tags() {
      return this.selectedHousing.tags;
    },
    description() {
      return this.selectedHousing.description;
    },
    contactLink() {
      return this.$route.path + '/contacto';
    },
  },
  created() {
    this.selectedHousing = this.$store.getters['housing/housing'].find(
      (housing) => housing.id === this.id
    );
  },
};
</script>

<style scoped></style>
