<template>
  <div class="home">
    <AllergyForm />
    <Home />
  </div>
</template>

<script lang="ts">
import Home from '@/components/Home.vue' // @ is an alias to /src
import AllergyForm from '@/components/AllergyForm.vue'

export default {
  name: 'HomeView',
  components: {
    Home,
    AllergyForm,
  },
}
</script>
