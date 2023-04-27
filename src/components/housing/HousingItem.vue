<template>
  <li>
    <h3>{{ title }}</h3>
    <h4>{{ rate }}€/mes</h4>
    <div>
      <base-badge
        v-for="tag in tags"
        :key="tag"
        :type="tag"
        :title="tag"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" link :to="housingContactLink"
        >Contacto</base-button
      >
      <base-button link :to="housingDetailLink">Ver más</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'title', 'rate', 'tags'],
  computed: {
    housingContactLink() {
      return this.$route.path + '/' + this.id + '/contacto';
    },
    housingDetailLink() {
      return this.$route.path + '/' + this.id;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
