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

const emojiGenre = computed(() => {
  if (selectedHousing.value.genre === 'boy') {
    return '♂️';
  } else if (selectedHousing.value.genre === 'girl') {
    return '♀️';
  } else {
    return '♂️♀️';
  }
});

const textGenre = computed(() => {
  if (selectedHousing.value.genre === 'boy') {
    return 'chicos solo';
  } else if (selectedHousing.value.genre === 'girl') {
    return 'chicas solo';
  } else {
    return 'chicos y chicas';
  }
});

const typeRoom = computed(() => {
  switch (selectedHousing.value.typeRoom) {
    case 1 || '1':
      return 'Individual';
    case 2 || '2':
      return 'Doble';
    default:
      return 'error';
  }
});

const typeBed = computed(() => {
  switch (selectedHousing.value.typeBed) {
    case 1:
      return 'Individual';
    case 2:
      return 'Doble';
    case 3:
      return 'Dos camas';
    default:
      return 'error';
  }
});

const contactLinkEmail = computed(() => {
  return `/pisos/${props.id}/contacto`;
});

function goToWhatsapp() {
  window.open(`https://wa.me/${selectedHousing.value.whatsapp}`, '_blank');
}

function goToInstagram() {
  window.open(`https://instagram.com/${selectedHousing.value.instagram}`, '_blank');
}
</script>

<template>
  <div>
    <section>
      <base-card>
        <h2 class="m-0 flex items-center justify-between overflow-visible">
          {{ selectedHousing.title }}
          <div class="-mr-3"><base-like id="housing"></base-like></div>
        </h2>
        <p>{{ emojiGenre }} (admite {{ textGenre }})</p>
        <h3>{{ selectedHousing.rate }}💶/mes</h3>
        <h4>
          👛 ¿Todo incluido? ➡️
          {{ selectedHousing.isIncluded ? 'Sí' : 'No' }}
        </h4>
        <h4 v-if="!selectedHousing.isIncluded">
          🗂️ Costes a parte ➡️
          {{ selectedHousing.extraCosts }}
        </h4>
        <h4>📌 Zona ➡️ {{ selectedHousing.area }}</h4>
        <h4>🛬 Disponible en ➡️ {{ selectedHousing.startMonth }}</h4>
        <h4>📆 Libre hasta ➡️ {{ selectedHousing.endMonth }}</h4>
        <h4>🐕 ¿Se permiten mascotas? ➡️ {{ selectedHousing.isPet ? 'Sí' : 'No' }}</h4>
        <h4>🚬 ¿Se permite fumar? ➡️ {{ selectedHousing.isSmoke ? 'Sí' : 'No' }}</h4>

        <h4>
          🏘️ ¿Es un piso compartido? ➡️
          {{ selectedHousing.isShared ? 'Sí' : 'No, estudio o apartamento individual' }}
        </h4>

        <div v-if="selectedHousing.isShared">
          <h4 v-if="selectedHousing.numPartners != 0">
            🧑‍🦲 Nº de compañeros de piso ➡️ {{ selectedHousing.numPartners }}
          </h4>
          <h4 v-if="selectedHousing.freePlaces != 0">
            🪪 Nº plazas libres en el piso ➡️ {{ selectedHousing.freePlaces }}
          </h4>
          <h4 v-if="selectedHousing.typeRoom != 0">🪟 Tipo de habitación ➡️ {{ typeRoom }}</h4>
        </div>

        <h4 v-if="selectedHousing.typeBed != 0">🛏️ Tipo de cama ➡️ {{ typeBed }}</h4>
      </base-card>
    </section>

    <section class="mx-auto my-0 max-w-[92%] text-center md:max-w-2xl">
      <iframe
        class="text-center"
        :src="`https://maps.google.com/maps?hl=es&amp;q=${selectedHousing.address},%20${selectedHousing.postalCode}%20${selectedHousing.municipality},%20Espa%C3%B1a+()&amp;z=14&amp;ie=UTF8&amp;iwloc=&amp;output=embed`"
        width="100%"
        height="350"
        style="border: 0; border-radius: 6px"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>

    <section>
      <base-card>
        <header>
          <div class="mb-4 text-center">
            <h2>¿Te interesa? ¡Háblame!</h2>
            <base-button :class="{ disabled: !selectedHousing.whatsapp }" @click="goToWhatsapp"
              ><i class="fa-brands fa-whatsapp fa-xl"></i
            ></base-button>
            <base-button link :to="contactLinkEmail"
              ><i class="fa-regular fa-envelope fa-xl"></i
            ></base-button>
            <base-button :class="{ disabled: !selectedHousing.instagram }" @click="goToInstagram"
              ><i class="fa-brands fa-instagram fa-xl"></i
            ></base-button>
          </div>
        </header>
        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <p>{{ selectedHousing.description }}</p>
        <h3>Características extra del piso:</h3>
        <base-badge
          v-for="tag in selectedHousing.tags"
          :key="tag"
          type="big"
          :title="tag"
        ></base-badge>
      </base-card>
    </section>
  </div>
</template>

<style scoped>
.disabled {
  background-color: var(--color-surface-600);
  pointer-events: none;
}
</style>
