<template>
  <Spinner v-if="getAuth.isLoading" />
  <div class="auth__wrapper">
    <h2>Sign Up</h2>
    <form @submit="signUpHandler">
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
      <div class="form-controller">
        <input
          type="password"
          placeholder="Confirm your password"
          v-model="confirmPassword"
          required
        />
      </div>
      <div class="controller">
        <button class="btn btn--primary">Sign Up</button>
      </div>
    </form>
  </div>
  <div class="auth__info">
    Have an account?
    <button
      type="submit"
      className="btn btn--secondary"
      @click="toggle"
    >
      Log In
    </button>
  </div>
</template>

<script>
import Spinner from './LoadingSpinner.vue'
import { DANGER, WARNING } from '../constants/constant'
import { mapActions, mapGetters } from 'vuex'
import { createToast } from 'mosha-vue-toastify'

export default {
  name: 'Signup',
  props: ['toggle'],
  computed: mapGetters(['getAuth']),
  components: {
    Spinner,
  },

  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  },

  methods: {
    ...mapActions(['signUp']),

    async signUpHandler(e) {
      e.preventDefault()
      if (this.password !== this.confirmPassword) {
        createToast('Password dont match', { type: DANGER })
        this.password = ''
        this.confirmPassword = ''
        return
      }
      if (this.password.length <= 4) {
        createToast('Password too weak', { type: WARNING })
        this.password = ''
        this.confirmPassword = ''
        return
      }
      console.log(`${this.email}, ${this.password}, ${this.confirmPassword}`)
      const userData = { email: this.email, password: this.password }
      await this.signUp(userData)
      // toggle login view
      this.toggle()
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
