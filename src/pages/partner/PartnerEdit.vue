<template>
  <section>
    <base-card>
      <h2>¡Edita tu anuncio!</h2>
      <partner-form :partner-info="userPartner" @save-data="saveData"></partner-form>
    </base-card>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { usePartnerStore } from '../../stores/partner/PartnerStore';
import { useRouter } from 'vue-router';

import PartnerForm from '../../components/partner/PartnerForm.vue';

const partnerStore = usePartnerStore();
const router = useRouter();

const userPartner = computed(() => {
  return partnerStore.getUserPartner;
});

function saveData(newPartnerData) {
  partnerStore.addPartner(newPartnerData);

  router.replace('/mis-anuncios');
}
</script>
