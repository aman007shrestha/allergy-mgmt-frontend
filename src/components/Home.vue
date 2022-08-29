<template>
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
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Spinner from './LoadingSpinner.vue'
import router from '@/router'
import Card from '@/components/Card.vue'
export default defineComponent({
  name: 'Home',
  computed: mapGetters(['getAuth', 'getAllergies']),
  components: {
    Spinner,
    Card,
  },
  methods: {
    ...mapActions(['fetchAllergies']),
  },
  created() {
    console.log(this.getAllergies)

    const { user } = this.getAuth
    if (!user) {
      router.push('/login')
    }
    this.fetchAllergies()
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
