import { createStore } from 'vuex'
import auth from './modules/auth'
import allergies from './modules/allergies'

export default createStore({
  modules: {
    auth,
    allergies,
  },
})
