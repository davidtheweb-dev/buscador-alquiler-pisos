<template>
  <div>
    <section>
      <base-card>
        <h2 class="title">
          {{ selectedPartner.title }} {{ emojiGenre }}
          <div class="like"><base-like id="partner"></base-like></div>
        </h2>
        <h3>Máx. {{ selectedPartner.rate }}💶/mes</h3>
        <h4>📌 Zona preferida ➡️ {{ selectedPartner.area }}</h4>
        <h4>🛬 Llega en ➡️ {{ selectedPartner.startMonth }}</h4>
        <h4>📆 Se queda ➡️ {{ selectedPartner.monthsDuration }} meses</h4>
        <h4>🐕 ¿Tiene mascota? ➡️ {{ selectedPartner.isPet ? 'Sí' : 'No' }}</h4>
        <h4>🚬 ¿Fuma? ➡️ {{ selectedPartner.isSmoke ? 'Sí' : 'No' }}</h4>

        <h4>
          🏘️ ¿Quiere compartir piso? ➡️
          {{ selectedPartner.isShared ? 'Sí' : 'No, busca estudio o apartamento individual ' }}
        </h4>

        <div v-if="selectedPartner.isShared">
          <h4 v-if="selectedPartner.typeRoom != 0">
            🧑‍🦲 Busca compartir piso con ➡️ {{ numPartners }}
          </h4>
          <h4 v-if="selectedPartner.freePlaces != 0">🪪 Busca piso con ➡️ {{ freePlaces }}</h4>
          <h4 v-if="selectedPartner.typeRoom != 0">🪟 Busca habitación ➡️ {{ typeRoom }}</h4>
        </div>

        <h4 v-if="selectedPartner.typeBed != 0">🛏️ Busca una cama ➡️ {{ typeBed }}</h4>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <div class="contact-buttons">
            <h2>¿Te cuadro? ¡Háblame!</h2>
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
        <p>{{ selectedPartner.description }}</p>
        <h3>{{ selectedPartner.title }} busca un piso con las siguientes características:</h3>
        <base-badge
          v-for="tag in selectedPartner.tags"
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
import { usePartnerStore } from '../../stores/partner/PartnerStore';

const props = defineProps({
  id: {
    type: String,
    default: 'error',
  },
});

const partnerStore = usePartnerStore();

let selectedPartner = null;

onBeforeMount(() => {
  selectedPartner = ref(partnerStore.getPartner.find((partner) => partner.id === props.id));
});

const emojiGenre = computed(() => {
  if (selectedPartner.value.genre === 'boy') {
    return '♂️';
  } else if (selectedPartner.value.genre === 'girl') {
    return '♀️';
  } else {
    return '⚧️';
  }
});

const numPartners = computed(() => {
  switch (selectedPartner.value.numPartners) {
    case '1':
      return '1 persona';
    case '2':
      return '2 personas';
    case '3':
      return '3 o más personas';
    default:
      return 'error';
  }
});

const freePlaces = computed(() => {
  switch (selectedPartner.value.freePlaces) {
    case '1':
      return '1 plaza libre';
    case '2':
      return '2 plazas libres';
    case '3':
      return '3 plazas libres';
    case '4':
      return '4 plazas libres';
    case '5':
      return '5 plazas libres';
    case '6':
      return '6 plazas libres';
    case '7':
      return 'Más de 6 plazas libres';
    default:
      return 'error';
  }
});

const typeRoom = computed(() => {
  switch (selectedPartner.value.typeRoom) {
    case 1 || '1':
      return 'Individual';
    case 2 || '2':
      return 'Doble';
    default:
      return 'error';
  }
});

const typeBed = computed(() => {
  switch (selectedPartner.value.typeBed) {
    case 1:
      return 'Individual';
    case 2:
      return 'Doble';
    default:
      return 'error';
  }
});

const contactLinkEmail = computed(() => {
  return `/companeros/${props.id}/contacto`;
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
