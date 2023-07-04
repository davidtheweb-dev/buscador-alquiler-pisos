<template>
  <section>
    <div class="overlayer"></div>
    <p>{{ adLocal }}</p>
    <div class="actions">
      <div class="container">
        <base-button mode="outline" link :to="'/editar-piso'">Editar</base-button>
        <base-button @click="deleteAd">Eliminar</base-button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  ad: {
    type: Object,
    default: () => ({
      mode: 'error',
    }),
  },
});

const emit = defineEmits(['delete-ad']);

const adLocal = { ...props.ad[0] };

function deleteAd() {
  emit('delete-ad');
}
</script>

<style scoped>
section {
  position: relative;
  margin: 1rem 0;
  border: 1px solid var(--color-surface-600);
  border-radius: 4px;
  padding: 1rem;
}

p {
  margin: 0.5rem 0 0 0;
}

.actions {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
}

.container {
  display: flex;
  justify-content: center;
}

.overlayer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  background-color: var(--color-overlay-200);
  border-radius: 4px;
}
</style>
