<template>
  <div>
    <h2>What to do next:</h2>
    <p>
      *It turned out that I read the task description and lost access to it, so
      I was doing it from memory.
    </p>
    <p>I'll stop here, knowing that I have demonstrated the main functions.</p>
    <h4>Here is a list of what else I would do:</h4>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">- {{ task }}</li>
    </ul>
    <h2>I do want to became a part of your team!</h2>
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
