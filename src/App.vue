<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/tasks">Tasks</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "@/styles/variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $secondary-color;
  list-style: none;
}

ul {
  list-style: none;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $secondary-color;

    &.router-link-exact-active {
      color: $primary-color;
    }
  }
}
</style>
