<template>
  <main>
    <section class="top-section">
      <h1>My Notes</h1>
      <span class="top-section_counter">Total notes {{ notesCounter }}</span>
    </section>
    <section class="greeting">
      <h2 class="title">
        Enter your username:
        <input type="text" placeholder="Type here..." v-model="userName" />
      </h2>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const notesCounter = ref(0);
const userName = ref("");

watch(userName, (newVal) => {
  localStorage.setItem("userName", newVal);
});

onMounted(() => {
  userName.value = localStorage.getItem("userName") || "";
});
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

.greeting {
  input {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    border: none;
    border-bottom: 1px solid #42b983;
    padding-bottom: 5px;
    outline: none;
  }
}
</style>
