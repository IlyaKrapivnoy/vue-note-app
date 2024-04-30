<template>
  <div class="main-wrapper">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/tasks">Tasks</router-link>
    </nav>
    <div class="content">
      <router-view />
    </div>
    <Footer :footerText="'front-end vue test'" />
  </div>
</template>

<script setup>
import Footer from "../src/components/Footer.vue";
</script>

<style lang="scss">
@import "@/styles/variables.scss";

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $white;
  list-style: none;
  background-color: #131313;
}

.main-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

ul {
  list-style: none;
  padding: 0;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $white;

    &.router-link-exact-active {
      color: $primary-color;
    }
  }
}
</style>
