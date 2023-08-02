<script setup>
// import { reactive } from 'vue';

// const emit = defineEmits(['save-data']);

// let formIsValid = true;

// const email = reactive({
//   value: '',
//   isValid: true,
// });

// function clearValidity(input) {
//   input.isValid = true;
// }

// function validateForm() {
//   formIsValid = true;
//   if (email.value === '') {
//     email.isValid = false;
//     formIsValid = false;
//   }
// }

// function submitForm() {
//   validateForm();

//   if (!formIsValid) {
//     return;
//   }

//   const formData = {
//     email: email.value,
//   };

//   emit('save-data', formData);
// }
</script>

<template>
  <section>
    <!-- <base-card>
      <h2>Correo por defecto</h2>
      <p>Guarda un correo para contactar en los anúncios y evita escribirlo una y otra vez:</p>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !email.isValid }">
          <input id="email" v-model.trim="email.value" type="email" @blur="clearValidity(email)" />
          <p v-if="!email.isValid" class="errors">El campo no puede estar vacío</p>
        </div>
        <base-button>Guardar</base-button>
      </form>
    </base-card> -->

    <base-card>
      <h2>¡Ayúdanos a mejorar la app!</h2>
      <p>
        ¿Tienes una idea genial? Envíanos un correo a
        <a href="mailto:sugerencias@unipisomadrid.com">sugerencias@unipisomadrid.com</a>.
      </p>
      <p>¡Tomamos nota de las mejores! 📝</p>
    </base-card>

    <base-card>
      <h2>¿Has encontrado algún error?</h2>
      <p>
        Gracias por tu paciencia, envíanos un correo a
        <a href="mailto:errores@unipisomadrid.com">errores@unipisomadrid.com</a> con los detalles y
        capturas de pantalla.
      </p>
      <p>Lo arreglaremos en cuanto podamos 💨</p>
    </base-card>

    <base-card>
      <h2>Información legal</h2>
      <p>
        Nos preocupamos por tu privacidad y queremos que sepas exactamente cómo recopilamos y usamos
        los datos personales que nos facilitas. Por eso, te invitamos a leer nuestro
        <router-link to="/">aviso legal</router-link>,
        <router-link to="/">política de privacidad</router-link> y
        <router-link to="/">política de cookies</router-link>.
      </p>
      <p>¡No te quedes dormido! Coge palomitas 🍿</p>
    </base-card>
  </section>
</template>

<style scoped>
a {
  color: var(--color-primary-500);
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: var(--color-primary-600);
}

.form-control {
  margin: 1.5rem 0;
}

input {
  display: block;
  width: 90%;
  border: 1px solid var(--color-white-100);
  font: inherit;
  border-radius: 4px;
}

input:focus {
  outline: none;
  border-color: var(--color-primary-600);
}

.invalid input {
  border: 1px solid red;
}

.errors {
  font-weight: bold;
  color: red;
}
</style>
