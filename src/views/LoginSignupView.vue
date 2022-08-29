<template>
  <div class="wrapper">
    <div class="content">
      <div class="intro">Allergy Management</div>
      <Login
        v-if="loggedIn"
        :toggle="toggleLoggedIn"
      />
      <SignUp
        v-else
        :toggle="toggleLoggedIn"
      />
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import SignUp from '@/components/Signup.vue'
export default {
  name: 'LoginSignupView',
  components: {
    Login,
    SignUp,
  },
  data() {
    return {
      loggedIn: true,
    }
  },
  methods: {
    toggleLoggedIn() {
      this.loggedIn = !this.loggedIn
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
}
.content {
  height: 500px;
}
.intro {
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
  @media screen and (max-width: 500px) {
    font-size: 30px;
  }
}
</style>
