<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/tasks">Tasks</router-link>
  </nav>
  <router-view />
</template>

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
