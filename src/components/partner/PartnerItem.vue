<template>
  <li>
    <h3 class="title">
      {{ partner.title }} {{ emojiGenre }}
      <div class="like"><base-like id="partner"></base-like></div>
    </h3>
    <h4 class="extra-gap">Máx. {{ partner.rate }}💶/mes</h4>
    <p class="extra-gap">{{ partner.description }}</p>
    <h4 class="extra-gap">
      📌{{ partner.area }} 📆{{ partner.startMonth }} 🐕{{ partner.isPet ? 'Sí' : 'No' }} 🚬{{
        partner.isSmoke ? 'Sí' : 'No'
      }}
    </h4>
    <div>
      <base-badge v-for="tag in partner.tags" :key="tag" type="small" :title="tag"></base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" link :to="partnerContactLink">Contacto</base-button>
      <base-button link :to="partnerDetailLink">Ver más</base-button>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  partner: {
    type: Object,
    default: null,
  },
});

const emojiGenre = computed(() => {
  if (props.partner.genre === 'boy') {
    return '♂️';
  } else if (props.partner.genre === 'girl') {
    return '♀️';
  } else {
    return '⚧️';
  }
});

const route = useRoute();

const partnerContactLink = computed(() => {
  return route.path + '/' + props.partner.id + '/contacto';
});

const partnerDetailLink = computed(() => {
  return route.path + '/' + props.partner.id;
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
