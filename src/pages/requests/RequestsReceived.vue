<template>
  <section>
    <base-card>
      <header>
        <h2>Solicitudes recibidas</h2>
      </header>
      <ul v-if="hasRequests">
        <requests-item
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.email"
          :message="req.message"
        ></requests-item>
      </ul>
      <h3 v-else>No has recibido ninguna solicitud todavía</h3>
    </base-card>
  </section>
</template>

<script>
import RequestsItem from '../../components/requests/RequestsItem.vue';
export default {
  components: {
    RequestsItem,
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
