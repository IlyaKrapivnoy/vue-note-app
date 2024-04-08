<template>
  <main>
    <section class="top-section">
      <h1>My Notes</h1>
      <span class="top-section_counter">Total notes {{ notesCounter }}</span>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";

const notesCounter = ref(0);
</script>

<style scoped lang="scss">
.top-section {
  padding-bottom: 20px;
  border-bottom: 2px solid #42b983;

  h1 {
    text-transform: uppercase;
    font-weight: 900;
  }

  .top-section_counter {
    font-weight: 800;
  }
}
</style>
