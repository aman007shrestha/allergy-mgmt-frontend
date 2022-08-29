<template>
  <Spinner v-if="getAllergies.isLoading" />
  <h1>Allergy Management Home Component</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Spinner from './LoadingSpinner.vue'
import router from '@/router'
export default defineComponent({
  name: 'Home',
  computed: mapGetters(['getAuth', 'getAllergies']),

  components: {
    Spinner,
  },
  methods: {
    ...mapActions(['fetchAllergies']),
  },
  created() {
    const { user } = this.getAuth
    if (!user) {
      router.push('/login')
    }
    this.fetchAllergies()
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
