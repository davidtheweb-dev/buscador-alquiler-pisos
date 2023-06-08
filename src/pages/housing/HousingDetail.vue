<template>
  <div>
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
        <base-badge v-for="tag in tags" :key="tag" :type="tag" :title="tag"></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useHousingStore } from '../../stores/housing/HousingStore';

const props = defineProps({
  id: {
    type: String,
    default: 'error',
  },
});

const housingStore = useHousingStore();

let selectedHousing = null;

onBeforeMount(() => {
  selectedHousing = ref(housingStore.getHousing.find((housing) => housing.id === props.id));
});

const title = computed(() => {
  return selectedHousing.value.title;
});

const rate = computed(() => {
  return selectedHousing.value.rate;
});

const tags = computed(() => {
  return selectedHousing.value.tags;
});

const description = computed(() => {
  return selectedHousing.value.description;
});

const contactLink = computed(() => {
  return `/viviendas/${props.id}/contacto`;
});
</script>
