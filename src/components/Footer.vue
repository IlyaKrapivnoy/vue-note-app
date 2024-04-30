<template>
  <div class="wrapper">{{ footerText }} / {{ currentYear }}</div>
</template>

<script setup>
import { currentYear } from "@/helpers/functions";

defineProps({
  footerText: String,
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px 0;
  text-transform: uppercase;
  font-size: 14px;
}
</style>
