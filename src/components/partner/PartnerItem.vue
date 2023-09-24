<!-- <template>
  <li class="my-4 rounded-xl border border-color-surface-600 p-4">
    <h3 class="m-0 flex items-center justify-between overflow-visible text-2xl">
      {{ partner.title }} {{ emojiGenre }}
      <div class="-mr-2"><base-like :id="partner.id"></base-like></div>
    </h3>
    <h4 class="mb-4">Máx. {{ partner.rate }}💶/mes</h4>
    <p class="mb-4 line-clamp-5">{{ partner.description }}</p>
    <h4 class="mb-4">
      📌{{ partner.area }} 📆{{ partner.startMonth }} 🐕{{ partner.isPet ? 'Sí' : 'No' }} 🚬{{
        partner.isSmoke ? 'Sí' : 'No'
      }}
    </h4>
    <div>
      <base-badge v-for="tag in partner.tags" :key="tag" type="small" :title="tag"></base-badge>
    </div>
    <div v-if="!modeMyAds" class="mt-3 flex justify-end">
      <base-button mode="outline" link :to="partnerContactLink">Contacto</base-button>
      <base-button link :to="partnerDetailLink">Ver más</base-button>
    </div>
  </li>
</template> -->

<script setup>
import { EnvelopeIcon, EyeIcon } from '@heroicons/vue/24/solid';
import { BanknotesIcon } from '@heroicons/vue/24/outline';

import { computed } from 'vue';
// import { useRoute } from 'vue-router';

const props = defineProps({
  partner: {
    type: Object,
    default: null,
  },
  modeMyAds: {
    type: Boolean,
    default: false,
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

// const route = useRoute();

// const partnerContactLink = computed(() => {
//   return route.path + '/' + props.partner.id + '/contacto';
// });

// const partnerDetailLink = computed(() => {
//   return route.path + '/' + props.partner.id;
// });

const person = {
  name: 'Jane Cooper',
  title: 'Paradigm Representative',
  role: 'Admin',
  email: 'janecooper@example.com',
  telephone: '+1-202-555-0170',
  imageUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
};
</script>

<template>
  <li
    class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg border border-gray-300 bg-white text-center shadow"
  >
    <div class="relative flex flex-1 flex-col p-8">
      <base-like :id="partner.id" class="absolute right-5 top-5"></base-like>
      <img class="mx-auto h-32 w-32 shrink-0 rounded-full" :src="person.imageUrl" alt="" />
      <h3 class="mt-6 text-lg font-medium text-gray-900">{{ partner.title }} {{ emojiGenre }}</h3>
      <h3 class="mt-1 text-base font-medium text-gray-900">
        Máx. {{ partner.rate }} <BanknotesIcon class="inline h-5 w-5 text-green-800" />/mes
      </h3>
      <dl class="mt-2 flex grow flex-col justify-between">
        <dt class="sr-only">Descripción</dt>
        <dd class="line-clamp-5 text-sm text-gray-500">{{ partner.description }}</dd>
        <dt class="sr-only">Información clave</dt>
        <dd class="mt-2 text-base font-medium text-gray-900">
          📌{{ partner.area }} 📆{{ partner.startMonth }} 🐕{{ partner.isPet ? 'Sí' : 'No' }} 🚬{{
            partner.isSmoke ? 'Sí' : 'No'
          }}
        </dd>
        <dt class="sr-only">Role</dt>
        <dd class="mt-3">
          <span
            class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
            >{{ person.role }}</span
          >
          <base-badge v-for="tag in partner.tags" :key="tag" type="small" :title="tag"></base-badge>
        </dd>
      </dl>
    </div>
    <div>
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="flex w-0 flex-1">
          <a
            :href="`mailto:${person.email}`"
            class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
          >
            <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            Contacto
          </a>
        </div>
        <div class="-ml-px flex w-0 flex-1">
          <a
            :href="`tel:${person.telephone}`"
            class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
          >
            <EyeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            Ver más
          </a>
        </div>
      </div>
    </div>
  </li>
</template>
