<template>
  <nav>
    <div class="nav-wrapper">
      <router-link to="/">Allergy Management</router-link>
      <router-link
        to="/about"
        v-if="getAuth.user"
        >About</router-link
      >
      <router-link
        v-if="!getAuth.user"
        to="/login"
        >Login</router-link
      >
      <a
        class="logout"
        @click="handleLogout"
        v-else
        >Logout</a
      >
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import router from '@/router'

export default {
  name: 'Header',
  computed: mapGetters(['getAuth']),

  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout()
      router.push('/login')
    },
  },

  created() {
    const { user } = this.getAuth
    if (!user) {
      router.push('/login')
    }
  },
}
</script>

<style scoped>
nav {
  height: 80px;
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100%;
  background-color: #f9f9f9;
  background-image: linear-gradient(
    to right,
    #fdfbfb,
    #ebedee,
    #d2e0da,
    #abe0c9
  );
  display: flex;
  justify-content: center;
}

.nav-wrapper {
  max-width: 1200px;
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.logout {
  cursor: pointer;
}
</style>
