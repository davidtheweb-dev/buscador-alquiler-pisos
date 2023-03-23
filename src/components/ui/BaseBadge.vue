<template>
  <span class="badge" :class="formattedType">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    formattedType() {
      switch (this.type) {
        case 'LGTB friendly':
          return 'style-a';
        case 'Baño privado':
          return 'style-b';
        case 'Admite parejas':
          return 'style-c';
        default:
          return null;
      }
    },
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.style-a {
  background-color: #3d008d;
  color: white;
}

.style-b {
  background-color: #71008d;
  color: white;
}

.style-c {
  background-color: #8d006e;
  color: white;
}
</style>
