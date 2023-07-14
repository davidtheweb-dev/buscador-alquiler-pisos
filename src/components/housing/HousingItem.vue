<template>
  <li>
    <h3 class="title">
      {{ housing.title }}
      <div class="like"><base-like :id="housing.id"></base-like></div>
    </h3>
    <h4 class="extra-gap">{{ housing.rate }}💶/mes</h4>
    <p class="extra-gap">{{ housing.description }}</p>
    <h4 class="extra-gap">
      📌{{ housing.area }} 📆{{ housing.startMonth }} 🐕{{ housing.isPet ? 'Sí' : 'No' }} 🚬{{
        housing.isSmoke ? 'Sí' : 'No'
      }}
    </h4>
    <div>
      <base-badge v-for="tag in housing.tags" :key="tag" type="small" :title="tag"></base-badge>
    </div>
    <div v-if="!modeMyAds" class="actions">
      <base-button mode="outline" link :to="housingContactLink">Contacto</base-button>
      <base-button link :to="housingDetailLink">Ver más</base-button>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  housing: {
    type: Object,
    default: null,
  },
  modeMyAds: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const housingContactLink = computed(() => {
  return route.path + '/' + props.housing.id + '/contacto';
});

const housingDetailLink = computed(() => {
  return route.path + '/' + props.housing.id;
});
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid var(--color-surface-600);
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4,
p {
  margin: 0.5rem 0;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}

.title {
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: visible;
}

.like {
  margin: 0 -10px 0 0;
}

.extra-gap {
  margin-bottom: 1rem;
}

.actions {
  margin-top: 0.6rem;
  display: flex;
  justify-content: flex-end;
}
</style>
