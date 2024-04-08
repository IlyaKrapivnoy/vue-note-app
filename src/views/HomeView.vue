<template>
  <main>
    <section class="top-section">
      <h1>My Notes</h1>
      <span class="top-section_counter">Total notes: {{ notesCounter }}</span>
    </section>
    <section class="greeting-section">
      <h2 class="title">
        Enter your username:
        <input
          type="text"
          placeholder="Type here..."
          v-model="userName"
          class="username-input"
        />
      </h2>
    </section>

    <section class="form-section">
      <textarea
        class="form-textarea"
        placeholder="Enter your text here..."
        v-model="newNote"
      ></textarea>
      <button @click.prevent="addNewNote" class="form-button">Submit</button>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const notesCounter = ref(0);
const userName = ref("");
const newNote = ref("");

watch(userName, (newVal) => {
  localStorage.setItem("userName", newVal);
});

watch(notesCounter, (newVal) => {
  localStorage.setItem("notesCounter", newVal);
});

onMounted(() => {
  userName.value = localStorage.getItem("userName") || "";
  notesCounter.value = localStorage.getItem("notesCounter") || 0;
});

const addNewNote = () => {
  if (newNote.value === "") {
    alert("Please, enter text before submitting a note");
    return;
  }

  console.log("newNote", newNote.value);
  newNote.value = "";
};
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

.greeting-section {
  margin-bottom: 40px;

  .username-input {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    border: none;
    border-bottom: 1px solid #2c3e50;
    padding-bottom: 5px;
    outline: none;
  }
}

.form-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  .form-textarea {
    width: 50%;
    min-height: 100px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #2c3e50;
    border-radius: 5px;
    resize: vertical;
    outline-color: #42b983;
  }

  .form-button {
    background-color: #007bff;
    color: #fff;
    font-weight: 700;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
