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
        Work
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
        Personal
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

    <section class="sort-section">
      <label for="sort">Sort by:</label>
      <select v-model="sortBy" @change="sortNotes" class="sort-dropdown">
        <option value="all">All</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>
    </section>

    <section>
      <ul v-if="notes.length > 0" class="note-list">
        <li v-for="(note, i) in sortedNotes" :key="note.id" class="note-item">
          <div class="button-wrapper">
            <button
              @click="toggleFavourite(i)"
              :class="{
                'button-regular button-small button-success': note.favourite,
                'button-regular button-small': !note.favourite,
              }"
            >
              Favourite
            </button>
            <div class="button-wrapper-edit">
              <button
                v-if="editIndex !== i"
                @click="toggleEditMode(i)"
                class="button-regular button-small"
              >
                Edit
              </button>
              <button
                v-else
                @click="saveEditedNote"
                class="button-regular button-small button-success"
              >
                Save
              </button>
              <button
                v-if="editIndex !== i"
                @click="removeTodo(i)"
                class="button-regular button-danger button-small"
              >
                x
              </button>
            </div>
          </div>
          <div class="note-content">
            <h3 v-if="editIndex === i">
              <input v-model="editedNote" @keyup.enter="saveEditedNote" />
            </h3>
            <h3 v-else>{{ note.value }}</h3>
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
import { onMounted, ref, watch, computed } from "vue";

const notesCounter = ref(0);
const userName = ref("");
const newNote = ref("");
const notes = ref([]);
const selectedCategory = ref("work");
const sortBy = ref("all");
const editIndex = ref(null);
const editedNote = ref("");

const sortedNotes = computed(() => {
  if (sortBy.value === "all") {
    return notes.value;
  } else {
    return notes.value.filter((note) => note.category === sortBy.value);
  }
});

const sortNotes = () => {
  if (sortBy.value === "all") return;

  notes.value.sort((a, b) => {
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;
    return 0;
  });
};

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
  notesCounter.value = parseInt(localStorage.getItem("notesCounter"), 10) || 0;

  notes.value = JSON.parse(localStorage.getItem("notes")) || [];

  if (notes.value.length === 0) {
    const defaultNotes = [
      {
        id: 1,
        value: "The things you used to own, now they own you.",
        date: "4/8/2024 2:35:26 PM",
        username: "Chuck Palahniuk",
        category: "work",
        favourite: true,
      },
      {
        id: 2,
        value:
          "When did the future switch from being a promise to being a threat?",
        date: "2/8/2024 4:35:26 PM",
        username: "Chuck Palahniuk",
        category: "work",
        favourite: false,
      },
      {
        id: 3,
        value: "We'll never be as young as we are tonight.",
        date: "2/8/2024 4:35:26 PM",
        username: "Chuck Palahniuk",
        category: "personal",
        favourite: true,
      },
      {
        id: 4,
        value: "We'll never be as young as we are tonight.",
        date: "2/8/2024 4:35:26 PM",
        username: "Chuck Palahniuk",
        category: "personal",
        favourite: true,
      },
      {
        id: 5,
        value: "We'll never be as young as we are tonight.",
        date: "2/8/2024 4:35:26 PM",
        username: "Chuck Palahniuk",
        category: "work",
        favourite: true,
      },
      {
        id: 6,
        value: "We'll never be as young as we are tonight.",
        date: "2/8/2024 4:35:26 PM",
        username: "Chuck Palahniuk",
        category: "personal",
        favourite: false,
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
      alert("This note already exists");
      return;
    }
  }

  notes.value.push({
    id: notes.value.length + 1,
    value: newNote.value,
    date: `${formattedDate} ${formattedTime}`,
    username: userName.value,
    category: selectedCategory.value,
    favourite: false,
  });

  notesCounter.value++;

  newNote.value = "";
};

const removeTodo = (i) => {
  notes.value.splice(i, 1);
};

const toggleEditMode = (index) => {
  editIndex.value = index;
  editedNote.value = notes.value[index].value;
};

const saveEditedNote = () => {
  notes.value[editIndex.value].value = editedNote.value;
  notes.value[editIndex.value].date = `${formattedDate} ${formattedTime}`; // this will update the date
  editIndex.value = null;
};

const toggleFavourite = (index) => {
  notes.value[index].favourite = !notes.value[index].favourite;
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.top-section {
  padding-bottom: 20px;
  border-bottom: 2px solid $primary-color;

  h1 {
    text-transform: uppercase;
    font-weight: 900;
  }

  .counter-row {
    @include alignedFlex();
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
    border-bottom: 1px solid $secondary-color;
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
  @include flexColumn();
  align-items: center;
  margin-bottom: 40px;

  .form-textarea {
    width: 50%;
    min-height: 100px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid $secondary-color;
    border-radius: 5px;
    resize: vertical;
    outline-color: $primary-color;
  }
}

.button-regular {
  background-color: #626161;
  color: #fff;
  font-weight: 700;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease 0s;

  &:hover {
    background-color: #151515;
  }
}

.button-danger {
  background-color: #e86e7f;

  &:hover {
    background-color: #de2a46;
  }
}

.button-success {
  background-color: #000;
}

.button-small {
  padding: 4px 10px;
}

.button-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 10px;

  .button-wrapper-edit {
    display: flex;
    gap: 10px;
  }
}

.note-list {
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
      min-height: 50px;

      input {
        font-size: 16px;
        padding: 10px;
        border: 1px solid $secondary-color;
        border-radius: 5px;
        outline: none;
        width: 90%;
      }

      h3 {
        @include ellipsis(400px);
      }
    }

    .note-details {
      @include alignedFlex($justify: space-between);

      .note-info {
        @include flexColumn();
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

.sort-section {
  @include alignedFlex();
  margin-bottom: 20px;

  label {
    font-weight: bold;
    margin-right: 10px;
  }

  .sort-dropdown {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    font-size: 14px;
    outline: none;
    cursor: pointer;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
}
</style>
