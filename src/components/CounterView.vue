<template>
  <div class="counter-row">
    <span class="counter">Total notes: {{ counter }}</span>
    <button @click="resetCounter" class="button-regular">Reset</button>
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
