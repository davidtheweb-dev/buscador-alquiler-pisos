<template>
  <div>
    <section>
      <base-card>
        <h2 class="title">
          {{ selectedHousing.title }}
          <div class="like"><base-like id="housing"></base-like></div>
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

    <section>
      <base-card>
        <header>
          <div class="contact-buttons">
            <h2>¿Te interesa? ¡Háblame!</h2>
            <base-button @click="goToWhatsapp"
              ><i class="fa-brands fa-whatsapp fa-xl"></i
            ></base-button>
            <base-button link :to="contactLinkEmail"
              ><i class="fa-regular fa-envelope fa-xl"></i
            ></base-button>
            <base-button @click="goToInstagram"
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
  window.open('https://www.whatsapp.com/', '_blank');
}

function goToInstagram() {
  window.open('https://www.instagram.com/', '_blank');
}
</script>

<style scoped>
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

.contact-buttons {
  text-align: center;
  margin-bottom: 15px;
}
</style>
