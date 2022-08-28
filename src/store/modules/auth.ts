import { userState } from '../interface'
import { Commit } from 'vuex'
import { createToast } from 'mosha-vue-toastify'
import axios from 'axios'

const user = JSON.parse(localStorage.getItem('user') as string)

const state = {
  user: user ? user : null,
  isLoading: false,
}

const getters = {
  getAuth: (state: userState) => state,
}
const actions = {
  async logIn({ commit }: { commit: Commit }, userData: any) {
    commit('setLoadingStatus', true)
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        userData
      )
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data))
      }
      commit('setLogin', response.data.data)
      commit('setLoadingStatus', false)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      createToast(message, { type: 'danger' })
      commit('setLoadingStatus', false)
      throw new Error(error)
    }
  },
  async signUp({ commit }: { commit: Commit }, userData: any) {
    commit('setLoadingStatus', true)
    try {
      await axios.post('http://localhost:5000/api/auth/register', userData)
      commit('setLoadingStatus', false)
      createToast('User Registered. Proceed login', { type: 'success' })
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      createToast(message, { type: 'danger' })
      commit('setLoadingStatus', false)
      throw new Error(error)
    }
  },
  async logout({ commit }: { commit: Commit }) {
    localStorage.removeItem('user')
    commit('setLogout')
  },
}
const mutations = {
  setLogin: (state: userState, payload: any) => (state.user = payload),
  setLogout: (state: userState) => (state.user = null),
  setLoadingStatus: (state: userState, value: boolean) =>
    (state.isLoading = value),
}

export default {
  state,
  getters,
  actions,
  mutations,
}
