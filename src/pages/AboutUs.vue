<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { MinusSmallIcon, PlusSmallIcon, ShareIcon } from '@heroicons/vue/24/solid';

const faqs = [
  {
    question: '¡Ayúdanos a mejorar Unipiso!',
    answer: `¿Tienes una idea genial? Envíanos un correo a <a href="mailto:ideas@unipiso.com" class="font-semibold text-indigo-600 hover:text-indigo-500">ideas@unipiso.com</a>.<br>¡Tomamos nota de las mejores! 📝`,
  },
  {
    question: '¿Has encontrado algún error?',
    answer:
      'Gracias por tu paciencia, envíanos los detalles y capturas de pantalla a <a href="mailto:errores@unipiso.com" class="font-semibold text-indigo-600 hover:text-indigo-500">errores@unipiso.com</a>.<br>Lo arreglaremos cuanto antes 💨',
  },
  {
    question: 'Información legal',
    answer:
      'Nos preocupamos por tu privacidad y queremos que sepas exactamente cómo recopilamos y usamos los datos personales que nos facilitas. Por eso, te invitamos a leer nuestro <a href="/aviso-legal" class="font-semibold text-indigo-600 hover:text-indigo-500">aviso legal</a>, <a href="/politica-privacidad" class="font-semibold text-indigo-600 hover:text-indigo-500">política de privacidad</a> y <a href="/politica-cookies" class="font-semibold text-indigo-600 hover:text-indigo-500">política de cookies</a>.<br>¡No te duermas! Coge palomitas 🍿',
  },
];

function shareViaWebShare() {
  navigator.share({
    title: 'Unipiso',
    text: 'Mira esta plataforma para buscar habitaciones y compañeros de piso en Madrid',
    url: 'http://www.unipiso.com',
  });
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
    <div class="mx-auto max-w-4xl">
      <h2 class="text-base font-semibold leading-7 text-indigo-600">¡Entérate!</h2>
      <h2 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Sobre Unipiso
      </h2>
      <div class="divide-y divide-gray-900/10">
        <h3 class="mt-6 text-lg leading-8 text-gray-600">
          Descubre nuestra política legal... o mejor, contribuye a perfeccionar la app💡
        </h3>

        <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
          <Disclosure
            v-for="faq in faqs"
            :key="faq.question"
            v-slot="{ open }"
            as="div"
            class="pt-6"
          >
            <dt>
              <DisclosureButton
                class="flex w-full items-start justify-between text-left text-gray-900"
              >
                <span class="text-base font-semibold leading-7">{{ faq.question }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <!--eslint-disable-next-line vue/no-v-html -->
              <p class="text-base leading-7 text-gray-600" v-html="faq.answer"></p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
    <div class="mt-32 text-center">
      <button
        type="button"
        class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="shareViaWebShare"
      >
        ¿Te gusta Unpiso? Compártelo
        <ShareIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
