<template>
  <div class="counter-row">
    <span class="counter">Total notes: {{ counter }}</span>
    <el-button @click="resetCounter" type="info">Reset</el-button>
  </div>
</template>

<script>
export default {
  props: {
    counter: {
      type: Number,
      required: true,
    },
  },
  methods: {
    resetCounter() {
      this.$emit("reset");
    },
  },
};
</script>
