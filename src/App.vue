<template>
  <Header />
  <!-- <Spinner /> -->
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Spinner from './components/LoadingSpinner.vue'
export default {
  name: 'App',
  components: {
    Header,
    Spinner,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
