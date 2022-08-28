<template>
  <Spinner v-if="getAuth.isLoading" />
  <div class="auth__wrapper">
    <h2>Login</h2>
    <form @submit="loginHandler">
      <div class="form-controller">
        <input
          type="email"
          placeholder="Enter your email"
          v-model="email"
          required
        />
      </div>
      <div class="form-controller">
        <input
          type="password"
          placeholder="Enter your password"
          v-model="password"
          required
        />
      </div>
      <div class="controller">
        <button class="btn btn--primary">Login</button>
      </div>
    </form>
  </div>
  <div class="auth__info">
    Need an account?
    <button
      type="submit"
      className="btn btn--secondary"
      @click="toggle"
    >
      Sign up
    </button>
  </div>
</template>

<script>
import router from '@/router'
import Spinner from './LoadingSpinner.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Login',
  props: ['toggle'],
  components: { Spinner },
  computed: mapGetters(['getAuth']),
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['logIn']),
    async loginHandler(e) {
      e.preventDefault()
      const userData = { email: this.email, password: this.password }
      await this.logIn(userData)
      router.push('/')
    },
  },
}
</script>

<style scoped>
h2 {
  text-align: left;
  margin-bottom: 16px;
}
</style>
