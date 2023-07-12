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
      <label for="rate">Precio mensual pax (€)</label>
      <input id="rate" v-model.number="rate.value" type="number" @blur="clearValidity(rate)" />
      <p v-if="!rate.isValid" class="errors">El precio debe ser mayor de 0</p>
    </div>

    <div class="form-control" :class="{ invalid: !isIncluded.isValid }">
      <label for="isIncluded">¿Todo incluido?</label>
      <select
        id="isIncluded"
        v-model.trim="isIncluded.value"
        name="isIncluded"
        @blur="clearValidity(isIncluded)"
      >
        <option :value="null"></option>
        <option :value="true">Sí</option>
        <option :value="false">No</option>
      </select>
      <p v-if="!isIncluded.isValid" class="errors">Selecciona una opción</p>
    </div>

    <div v-if="!isIncluded.value" class="form-control" :class="{ invalid: !extraCosts.isValid }">
      <label for="extraCosts">Costes a parte</label>
      <input
        id="extraCosts"
        v-model.trim="extraCosts.value"
        type="text"
        @blur="clearValidity(extraCosts)"
      />
      <p v-if="!extraCosts.isValid" class="errors">
        Los costes a parte no pueden estar vacíos si has indicado que no está todo incluido en el
        precio
      </p>
    </div>

    <div class="form-control" :class="{ invalid: !area.isValid }">
      <label for="area">Zona</label>
      <input id="area" v-model.trim="area.value" type="text" @blur="clearValidity(area)" />
      <p v-if="!area.isValid" class="errors">La zona no puede estar vacía</p>
    </div>

    <div class="form-control" :class="{ invalid: !address.isValid }">
      <label for="address">Dirección</label>
      <input
        id="address"
        v-model.trim="address.value"
        type="text"
        placeholder="Calle Gran Vía / Calle Gran Vía, 28"
        @blur="clearValidity(address)"
      />
      <p v-if="!address.isValid" class="errors">La dirección no puede estar vacía</p>
    </div>

    <div class="form-control" :class="{ invalid: !municipality.isValid }">
      <label for="municipality">Municipio</label>
      <input
        id="municipality"
        v-model.trim="municipality.value"
        type="text"
        placeholder="Madrid"
        @blur="clearValidity(municipality)"
      />
      <p v-if="!municipality.isValid" class="errors">El municipio no puede estar vacío</p>
    </div>

    <div class="form-control" :class="{ invalid: !postalCode.isValid }">
      <label for="postalCode">Código postal</label>
      <input
        id="postalCode"
        v-model.number="postalCode.value"
        type="number"
        placeholder="28013"
        @blur="clearValidity(postalCode)"
      />
      <p v-if="!postalCode.isValid" class="errors">El código postal no puede estar vacío</p>
    </div>

    <div class="form-control" :class="{ invalid: !startMonth.isValid }">
      <label for="startMonth">Disponible en</label>
      <select
        id="startMonth"
        v-model.trim="startMonth.value"
        name="startMonth"
        @blur="clearValidity(startMonth)"
      >
        <option value=""></option>
        <option v-for="month in monthsOptions" :key="month" :value="month">{{ month }}</option>
      </select>
      <p v-if="!startMonth.isValid" class="errors">Selecciona una opción</p>
    </div>

    <div class="form-control" :class="{ invalid: !endMonth.isValid }">
      <label for="endMonth">Disponible hasta</label>
      <select
        id="endMonth"
        v-model.trim="endMonth.value"
        name="endMonth"
        @blur="clearValidity(endMonth)"
      >
        <option value=""></option>
        <option v-for="month in monthsOptions" :key="month" :value="month">{{ month }}</option>
        <option value="0">Indeterminado</option>
      </select>
      <p v-if="!endMonth.isValid" class="errors">Selecciona una opción</p>
    </div>

    <div class="form-control" :class="{ invalid: !genre.isValid }">
      <label for="genre">Admite</label>
      <select id="genre" v-model.trim="genre.value" name="genre" @blur="clearValidity(genre)">
        <option value=""></option>
        <option value="boy">Chicos</option>
        <option value="girl">Chicas</option>
        <option value="both">Chicos y chicas</option>
      </select>
      <p v-if="!genre.isValid" class="errors">Selecciona una opción</p>
    </div>

    <div class="form-control" :class="{ invalid: !isShared.isValid }">
      <label for="isShared">Piso compartido con</label>
      <select
        id="isShared"
        v-model.trim="isShared.value"
        name="isShared"
        @blur="clearValidity(isShared)"
      >
        <option :value="null"></option>
        <option :value="true">Otros estudiántes y jóvenes</option>
        <option :value="false">Estudio o apartamento pequeño</option>
      </select>
      <p v-if="!isShared.isValid" class="errors">Selecciona una opción</p>
    </div>

    <div v-if="isShared.value">
      <div class="form-control" :class="{ invalid: !numPartners.isValid }">
        <label for="numPartners">Número de personas con las que se comparte el piso</label>
        <input
          id="numPartners"
          v-model.number="numPartners.value"
          type="number"
          @blur="clearValidity(numPartners)"
        />
        <p v-if="!numPartners.isValid" class="errors">El número de personas debe ser mayor de 0</p>
      </div>

      <div class="form-control" :class="{ invalid: !freePlaces.isValid }">
        <label for="freePlaces">Nº total de plazas libres en un mismo piso</label>
        <input
          id="freePlaces"
          v-model.number="freePlaces.value"
          type="number"
          @blur="clearValidity(freePlaces)"
        />
        <p v-if="!freePlaces.isValid" class="errors">
          El número de plazas libres debe ser mayor de 0
        </p>
      </div>

      <div class="form-control" :class="{ invalid: !typeRoom.isValid }">
        <label for="typeRoom">Nº plazas de la habitación</label>
        <select
          id="typeRoom"
          v-model.trim="typeRoom.value"
          name="typeRoom"
          @blur="clearValidity(typeRoom)"
        >
          <option :value="null"></option>
          <option :value="1">Individual</option>
          <option :value="2">Doble</option>
        </select>
        <p v-if="!typeRoom.isValid" class="errors">Selecciona una opción</p>
      </div>
    </div>

    <div class="form-control" :class="{ invalid: !typeBed.isValid }">
      <label for="typeBed">Cama</label>
      <select
        id="typeBed"
        v-model.trim="typeBed.value"
        name="typeBed"
        @blur="clearValidity(typeBed)"
      >
        <option :value="null"></option>
        <option :value="1">Individual</option>
        <option :value="2">Doble</option>
        <option :value="3">Dos camas</option>
      </select>
      <p v-if="!typeBed.isValid" class="errors">Selecciona una opción</p>
    </div>

    <div class="form-control" :class="{ invalid: !isSmoke.isValid }">
      <label for="isSmoke">Fumadores</label>
      <select
        id="isSmoke"
        v-model.trim="isSmoke.value"
        name="isSmoke"
        @blur="clearValidity(isSmoke)"
      >
        <option :value="null"></option>
        <option :value="true">Se puede fumar</option>
        <option :value="false">Prohibido fumar</option>
      </select>
      <p v-if="!isSmoke.isValid" class="errors">Selecciona una opción</p>
    </div>

    <div class="form-control" :class="{ invalid: !isPet.isValid }">
      <label for="isPet">Mascotas</label>
      <select id="isPet" v-model.trim="isPet.value" name="isPet" @blur="clearValidity(isPet)">
        <option :value="null"></option>
        <option :value="true">Se admiten mascotas</option>
        <option :value="false">No se admiten mascotas</option>
      </select>
      <p v-if="!isPet.isValid" class="errors">Selecciona una opción</p>
    </div>

    <div class="form-control">
      <label for="instagram">Instagram (opcional)</label>
      <input id="instagram" v-model.trim="instagram.value" type="text" placeholder="tinder.urjc" />
    </div>

    <div class="form-control">
      <label for="whatsapp">WhatsApp (opcional)</label>
      <input id="whatsapp" v-model.number="whatsapp.value" type="number" placeholder="605347867" />
    </div>

    <div class="form-control" :class="{ invalid: !tags.isValid }">
      <h3>Características</h3>
      <div>
        <input
          id="elevator"
          v-model="tags.value"
          type="checkbox"
          value="elevator"
          @blur="clearValidity(tags)"
        />
        <label for="elevator">Ascensor</label>
      </div>
      <div>
        <input
          id="couples"
          v-model="tags.value"
          type="checkbox"
          value="couples"
          @blur="clearValidity(tags)"
        />
        <label for="couples">Admite parejas</label>
      </div>
      <div>
        <input
          id="air"
          v-model="tags.value"
          type="checkbox"
          value="air"
          @blur="clearValidity(tags)"
        />
        <label for="air">Climatizador</label>
      </div>
      <div>
        <input
          id="internet"
          v-model="tags.value"
          type="checkbox"
          value="internet"
          @blur="clearValidity(tags)"
        />
        <label for="internet">Internet WiFi</label>
      </div>
      <div>
        <input
          id="cleaner"
          v-model="tags.value"
          type="checkbox"
          value="cleaner"
          @blur="clearValidity(tags)"
        />
        <label for="cleaner">Limpieza incluida</label>
      </div>
      <div>
        <input
          id="bath"
          v-model="tags.value"
          type="checkbox"
          value="bath"
          @blur="clearValidity(tags)"
        />
        <label for="bath">Baño privado</label>
      </div>
      <div>
        <input
          id="lgtb"
          v-model="tags.value"
          type="checkbox"
          value="lgtb"
          @blur="clearValidity(tags)"
        />
        <label for="lgtb">LGTB friendly</label>
      </div>
      <p v-if="!tags.isValid" class="errors">Debes seleccionar al menos una característica</p>
    </div>
    <p v-if="!formIsValid">Por favor, corrige los campos y vuelve a intentarlo</p>
    <base-button>Guardar</base-button>
  </form>
</template>

<script setup>
import { reactive, computed, onBeforeMount } from 'vue';

const props = defineProps({
  housingInfo: {
    type: Object,
    default: () => ({
      registration: true,
    }),
  },
});

const emit = defineEmits(['save-data']);

const housingInfoLocal = { ...props.housingInfo[0] };

onBeforeMount(() => {
  if (!props.housingInfo.registration) {
    title.value = housingInfoLocal.title;
    description.value = housingInfoLocal.description;
    rate.value = housingInfoLocal.rate;
    isIncluded.value = housingInfoLocal.isIncluded;
    extraCosts.value = housingInfoLocal.extraCosts;
    area.value = housingInfoLocal.area;
    address.value = housingInfoLocal.address;
    municipality.value = housingInfoLocal.municipality;
    postalCode.value = housingInfoLocal.postalCode;
    startMonth.value = housingInfoLocal.startMonth;
    endMonth.value = housingInfoLocal.endMonth;
    genre.value = housingInfoLocal.genre;
    isShared.value = housingInfoLocal.isShared;
    numPartners.value = housingInfoLocal.numPartners;
    freePlaces.value = housingInfoLocal.freePlaces;
    typeRoom.value = housingInfoLocal.typeRoom;
    typeBed.value = housingInfoLocal.typeBed;
    isSmoke.value = housingInfoLocal.isSmoke;
    isPet.value = housingInfoLocal.isPet;
    instagram.value = housingInfoLocal.instagram;
    whatsapp.value = housingInfoLocal.whatsapp;
    tags.value = housingInfoLocal.tags;
  }
});

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
const isIncluded = reactive({
  value: null,
  isValid: true,
});
const extraCosts = reactive({
  value: '',
  isValid: true,
});
const area = reactive({
  value: '',
  isValid: true,
});
const address = reactive({
  value: '',
  isValid: true,
});
const municipality = reactive({
  value: '',
  isValid: true,
});
const postalCode = reactive({
  value: '',
  isValid: true,
});
const monthsOptions = computed(() => {
  let months = [];
  for (let i = 0; i < 6; i++) {
    let today = new Date();
    today.setMonth(today.getMonth() + i);
    let thisMonth = today.toLocaleString('es-ES', {
      month: 'long',
    });

    const upperThisMonth = thisMonth.charAt(0).toUpperCase() + thisMonth.slice(1);

    months.push(upperThisMonth);
  }
  return months;
});
const startMonth = reactive({
  value: '',
  isValid: true,
});
const endMonth = reactive({
  value: '',
  isValid: true,
});
const genre = reactive({
  value: '',
  isValid: true,
});
const isShared = reactive({
  value: null,
  isValid: true,
});
const numPartners = reactive({
  value: '',
  isValid: true,
});
const freePlaces = reactive({
  value: null,
  isValid: true,
});
const typeRoom = reactive({
  value: null,
  isValid: true,
});
const typeBed = reactive({
  value: null,
  isValid: true,
});
const isSmoke = reactive({
  value: null,
  isValid: true,
});
const isPet = reactive({
  value: null,
  isValid: true,
});
const instagram = reactive({
  value: '',
  isValid: true,
});
const whatsapp = reactive({
  value: '',
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

  if (isIncluded.value === null) {
    isIncluded.isValid = false;
    formIsValid = false;
  }

  if (extraCosts.value === '' && !isIncluded.value) {
    extraCosts.isValid = false;
    formIsValid = false;
  }

  if (area.value === '') {
    area.isValid = false;
    formIsValid = false;
  }

  if (address.value === '') {
    address.isValid = false;
    formIsValid = false;
  }

  if (municipality.value === '') {
    municipality.isValid = false;
    formIsValid = false;
  }

  if (!postalCode.value || postalCode.value < 0) {
    postalCode.isValid = false;
    formIsValid = false;
  }

  if (startMonth.value === '') {
    startMonth.isValid = false;
    formIsValid = false;
  }

  if (endMonth.value === '') {
    endMonth.isValid = false;
    formIsValid = false;
  }

  if (genre.value === '') {
    genre.isValid = false;
    formIsValid = false;
  }

  if (isShared.value === null) {
    isShared.isValid = false;
    formIsValid = false;
  }

  if (numPartners.value === '' && isShared.value) {
    numPartners.isValid = false;
    formIsValid = false;
  }

  if (freePlaces.value === '' && isShared.value) {
    freePlaces.isValid = false;
    formIsValid = false;
  }

  if ((typeRoom.value === null || typeRoom.value === undefined) && isShared.value) {
    typeRoom.isValid = false;
    formIsValid = false;
  }

  if (typeBed.value === null) {
    typeBed.isValid = false;
    formIsValid = false;
  }

  if (isSmoke.value === null) {
    isSmoke.isValid = false;
    formIsValid = false;
  }

  if (isPet.value === null) {
    isPet.isValid = false;
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
    isIncluded: isIncluded.value,
    extraCosts: extraCosts.value,
    area: area.value,
    address: address.value,
    municipality: municipality.value,
    postalCode: postalCode.value,
    startMonth: startMonth.value,
    endMonth: endMonth.value,
    genre: genre.value,
    isShared: isShared.value,
    numPartners: numPartners.value,
    freePlaces: freePlaces.value,
    typeRoom: typeRoom.value,
    typeBed: typeBed.value,
    isSmoke: isSmoke.value,
    isPet: isPet.value,
    instagram: instagram.value,
    whatsapp: whatsapp.value,
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
