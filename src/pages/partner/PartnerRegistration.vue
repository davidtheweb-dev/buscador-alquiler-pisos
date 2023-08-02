<script setup>
import { usePartnerStore } from '../../stores/partner/PartnerStore';
import { useRouter } from 'vue-router';

import PartnerForm from '../../components/partner/PartnerForm.vue';

const partnerStore = usePartnerStore();
const router = useRouter();

function saveData(newPartnerData) {
  partnerStore.addPartner(newPartnerData);

  router.replace('/mis-anuncios');
}
</script>

<template>
  <section>
    <base-card>
      <h2>¡Sube el anuncio de lo que buscas y encuentra piso!</h2>
      <partner-form @save-data="saveData"></partner-form>
    </base-card>
  </section>
</template>
