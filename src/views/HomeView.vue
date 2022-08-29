<template>
  <div class="home">
    <button
      v-if="!showForm"
      @click="toggleForm"
      class="btn btn-add"
    >
      Add Allergy
    </button>
    <AllergyForm
      v-else
      :toggle="toggleForm"
    />
    <Home />
  </div>
</template>

<script>
import Home from '@/components/Home.vue' // @ is an alias to /src
import AllergyForm from '@/components/AllergyForm.vue'

export default {
  name: 'HomeView',
  components: {
    Home,
    AllergyForm,
  },
  data() {
    return {
      showForm: false,
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm
    },
  },
}
</script>
<style scoped>
.btn-add {
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
  border-radius: 2px;
}
</style>
