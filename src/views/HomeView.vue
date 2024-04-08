<template>
  <main>
    <section class="top-section">
      <h1>My Notes</h1>
      <div class="counter-row">
        <span class="counter">Total notes: {{ notesCounter }}</span>
        <button @click="reset" class="button-regular">Reset</button>
      </div>
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

    <section class="category-section">
      <label>
        <input
          type="radio"
          name="category"
          id="work"
          value="work"
          v-model="selectedCategory"
          class="category-item"
        />
        <span class="bubble business"></span>
        <div>Work</div>
      </label>
      <label>
        <input
          type="radio"
          name="category"
          id="personal"
          value="personal"
          v-model="selectedCategory"
          class="category-item"
        />
        <span class="bubble business"></span>
        <div>Personal</div>
      </label>
    </section>

    <section class="form-section">
      <textarea
        class="form-textarea"
        placeholder="Enter your text here..."
        v-model="newNote"
      ></textarea>
      <button @click.prevent="addNewNote" class="button-regular">Submit</button>
    </section>

    <section>
      <ul v-if="notes.length > 0" class="note-list">
        <li v-for="(note, i) in notes" :key="note.id" class="note-item">
          <div class="button-wrapper">
            <button
              @click="removeTodo(i)"
              class="button-regular button-danger button-small"
            >
              x
            </button>
          </div>
          <div class="note-content">
            <h3>{{ note.value }}</h3>
          </div>
          <div class="note-details">
            <div class="note-info">
              <span class="note-category">{{ note.category }}</span>
              <span class="note-date">{{ note.date }}</span>
            </div>
            <span class="note-username">{{ note.username }}</span>
          </div>
        </li>
      </ul>

      <p v-else>No more notes</p>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const notesCounter = ref(0);
const userName = ref("");
const newNote = ref("");
const notes = ref([]);
const selectedCategory = ref("work");

watch(
  notes,
  (newVal) => {
    localStorage.setItem("notes", JSON.stringify(newVal));
  },
  {
    deep: true,
  },
);

watch(userName, (newVal) => {
  localStorage.setItem("userName", newVal);
});

watch(notesCounter, (newVal) => {
  localStorage.setItem("notesCounter", newVal);
});

onMounted(() => {
  userName.value = localStorage.getItem("userName") || "";
  notesCounter.value = localStorage.getItem("notesCounter") || 0;
  notes.value = JSON.parse(localStorage.getItem("notes")) || [];

  if (notes.value.length === 0) {
    const defaultNotes = [
      {
        id: 1,
        value: "The things you used to own, now they own you.",
        date: "4/8/2024 2:35:26 PM",
        username: "Chuck Palahniuk",
        category: "personal",
      },
      {
        id: 2,
        value:
          "When did the future switch from being a promise to being a threat?",
        date: "2/8/2024 4:35:26 PM",
        username: "Chuck Palahniuk",
        category: "personal",
      },
      {
        id: 2,
        value: "We'll never be as young as we are tonight.",
        date: "2/8/2024 4:35:26 PM",
        username: "Chuck Palahniuk",
        category: "personal",
      },
    ];
    notes.value.push(...defaultNotes);
    notesCounter.value += defaultNotes.length;
  }
});

const reset = () => {
  notes.value = [];
  notesCounter.value = 0;
};

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-US");
const formattedTime = currentDate.toLocaleTimeString("en-US");

const addNewNote = () => {
  if (newNote.value === "") {
    alert("Please, enter text before submitting a note");
    return;
  }

  if (userName.value === "") {
    alert("Please, enter your name");
    return;
  }

  for (let i = 0; i < notes.value.length; i++) {
    if (newNote.value === notes.value[i].value) {
      alert("You already have this task");
      return;
    }
  }

  notes.value.push({
    id: notes.value.length + 1,
    value: newNote.value,
    date: `${formattedDate} ${formattedTime}`,
    username: userName.value,
    category: selectedCategory.value,
  });

  notesCounter.value++;

  newNote.value = "";
};

const removeTodo = (i) => {
  notes.value.splice(i, 1);
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

  .counter-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .counter {
      font-weight: 800;
    }
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

.category-section {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;

  .category-item {
    cursor: pointer;
  }
}

.form-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

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
}

.button-regular {
  background-color: #007bff;
  color: #fff;
  font-weight: 700;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease 0s;

  &:hover {
    background-color: #0056b3;
  }
}

.button-danger {
  background-color: #ff3753;

  &:hover {
    background-color: #de2a46;
  }
}

.button-small {
  padding: 4px 10px;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
}

.note-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  .note-item {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;

    .note-content {
      min-height: 100px;
    }

    .note-details {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .note-info {
        display: flex;
        flex-direction: column;
        text-align: left;
      }

      .note-date,
      .note-username {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
</style>
