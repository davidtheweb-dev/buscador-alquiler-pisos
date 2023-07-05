<template>
  <teleport to="body">
    <div v-if="show" class="backdrop" @click="tryClose"></div>
    <transition name="dialog">
      <dialog v-if="show" open>
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button v-if="props.delete" mode="outline" @click="tryDelete"
              >Eliminar</base-button
            >
            <base-button @click="tryClose">Cerrar</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: null,
  },
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
  delete: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['close', 'delete']);

function tryClose() {
  if (props.fixed) {
    return;
  }
  emit('close');
}

function tryDelete() {
  if (props.fixed) {
    return;
  }
  emit('delete');
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--color-overlay-100);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: var(--color-surface-300);
}

header {
  background-color: var(--color-primary-500);
  color: var(--color-surface-100);
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
  color: var(--color-white-100);
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
