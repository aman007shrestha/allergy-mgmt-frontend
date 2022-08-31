<template>
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
    :update="update"
    :formData="formData"
    @resetData="resetData"
  />
  <Spinner v-if="getAllergies.isLoading" />
  <div
    v-else
    class="wrapper"
  >
    <div class="legend">
      <span>Severity Guideline</span>
      <span> <span class="severe-box"></span> = Severe </span>
      <span> <span class="normal-box"></span> = Normal </span>
      <span> <span class="low-box"></span> = Low </span>
    </div>
    <div class="posts">
      <Card
        :key="allergy.allergy_id"
        v-for="allergy in getAllergies.allergies"
        :allergy="allergy"
        @updateFormData="updateFormData"
      />
    </div>
  </div>
</template>

<script>
import Spinner from './LoadingSpinner.vue'
import router from '@/router'
import Card from '@/components/Card.vue'
import AllergyForm from '@/components/AllergyForm.vue'
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default defineComponent({
  name: 'Home',
  computed: mapGetters(['getAuth', 'getAllergies']),
  components: {
    Spinner,
    Card,
    AllergyForm,
  },

  data() {
    return {
      showForm: false,
      update: false,
      formData: {},
    }
  },

  methods: {
    ...mapActions(['fetchAllergies']),
    toggleForm() {
      this.showForm = !this.showForm
      this.update = false
      this.formData = {}
    },
    updateFormData(formData) {
      this.formData = formData
      this.update = true
      this.showForm = true
    },
    resetData() {
      this.showForm = false
      this.update = false
      this.formData = {}
    },
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

<style scoped>
.wrapper {
  margin: 1rem 0;
}
.legend {
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.severe-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #e02c2c;
}
.normal-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #dbd967;
}
.low-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #688ec7;
}
.posts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}
.btn-add {
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
  border-radius: 2px;
}
</style>
