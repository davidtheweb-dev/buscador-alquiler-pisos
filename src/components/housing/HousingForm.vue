<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="title">Título</label>
      <input type="text" id="title" v-model.trim="title" />
    </div>
    <div class="form-control">
      <label for="description">Descripción</label>
      <textarea id="description" rows="5" v-model.trim="description"></textarea>
    </div>
    <div class="form-control">
      <label for="rate">Precio mensual (€)</label>
      <input type="number" id="rate" v-model.number="rate" />
    </div>
    <div class="form-control">
      <h3>Características</h3>
      <div>
        <input type="checkbox" id="lgtb" value="LGTB friendly" v-model="tags" />
        <label for="lgtb">LGTB friendly</label>
      </div>
      <div>
        <input type="checkbox" id="bath" value="Baño privado" v-model="tags" />
        <label for="bath">Baño privado</label>
      </div>
      <div>
        <input type="checkbox" id="couples" value="Admite parejas" v-model="tags" />
        <label for="couples">Admite parejas</label>
      </div>
    </div>
    <base-button>Registrarme</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      title: '',
      description: '',
      rate: null,
      tags: [],
    };
  },
  methods: {
    submitForm() {
      const formData = {
        title: this.title,
        description: this.description,
        rate: this.rate,
        tags: this.tags,
      };

      this.$emit('save-data', formData);
    },
  },
};
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
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
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
</style>
