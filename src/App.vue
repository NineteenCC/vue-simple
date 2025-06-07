<template>
  <div id="app">
    <router-view @login="handleLogin"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    handleLogin(username) {
      this.$router.push({ path: "/home", query: { user: username } });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
