<template>
  <div>
    <h2>What to do next:</h2>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">{{ task }}</li>
    </ul>
  </div>
</template>

<script setup>
const tasks = [
  "Responsive: mobile + tablet",
  "Separate component to smaller once",
  "Use VueX and split it to modules",
  "Structure styles (Storybook is a good idea)",
  "And so on.",
];
</script>
