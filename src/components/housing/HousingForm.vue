<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !title.isValid }">
      <label for="title">Título</label>
      <input id="title" v-model.trim="title.value" type="text" @blur="clearValidity(title)" />
      <p v-if="!title.isValid" class="errors">El título no puede estar vacío</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Descripción</label>
      <textarea
        id="description"
        v-model.trim="description.value"
        rows="5"
        @blur="clearValidity(description)"
      ></textarea>
      <p v-if="!description.isValid" class="errors">La descripción no puede estar vacía</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Precio mensual (€)</label>
      <input id="rate" v-model.number="rate.value" type="number" @blur="clearValidity(rate)" />
      <p v-if="!rate.isValid" class="errors">El precio debe ser mayor de 0</p>
    </div>
    <div class="form-control" :class="{ invalid: !tags.isValid }">
      <h3>Características</h3>
      <div>
        <input
          id="lgtb"
          v-model="tags.value"
          type="checkbox"
          value="LGTB friendly"
          @blur="clearValidity(tags)"
        />
        <label for="lgtb">LGTB friendly</label>
      </div>
      <div>
        <input
          id="bath"
          v-model="tags.value"
          type="checkbox"
          value="Baño privado"
          @blur="clearValidity(tags)"
        />
        <label for="bath">Baño privado</label>
      </div>
      <div>
        <input
          id="couples"
          v-model="tags.value"
          type="checkbox"
          value="Admite parejas"
          @blur="clearValidity(tags)"
        />
        <label for="couples">Admite parejas</label>
      </div>
      <p v-if="!tags.isValid" class="errors">Debes seleccionar al menos una característica</p>
    </div>
    <p v-if="!formIsValid">Por favor, corrige los campos y vuelve a intentarlo</p>
    <base-button>Registrarme</base-button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['save-data']);

const title = reactive({
  value: '',
  isValid: true,
});
const description = reactive({
  value: '',
  isValid: true,
});
const rate = reactive({
  value: null,
  isValid: true,
});
const tags = reactive({
  value: [],
  isValid: true,
});
let formIsValid = true;

function clearValidity(input) {
  input.isValid = true;
}

function validateForm() {
  formIsValid = true;
  if (title.value === '') {
    title.isValid = false;
    formIsValid = false;
  }

  if (description.value === '') {
    description.isValid = false;
    formIsValid = false;
  }

  if (!rate.value || rate.value < 0) {
    rate.isValid = false;
    formIsValid = false;
  }

  if (tags.value.length === 0) {
    tags.isValid = false;
    formIsValid = false;
  }
}

function submitForm() {
  validateForm();

  if (!formIsValid) {
    return;
  }

  const formData = {
    title: title.value,
    description: description.value,
    rate: rate.value,
    tags: tags.value,
  };

  emit('save-data', formData);
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid var(--color-white-100);
  font: inherit;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary-600);
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: var(--color-primary-600) solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.errors {
  font-weight: bold;
  color: red;
}
</style>
