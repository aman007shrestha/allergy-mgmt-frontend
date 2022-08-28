<template>
  <div class="home">
    <Home />
  </div>
</template>

<script lang="ts">
import Home from '@/components/Home.vue' // @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
    Home,
  },
}
</script>
