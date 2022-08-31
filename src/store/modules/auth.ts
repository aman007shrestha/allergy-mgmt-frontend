import { userState, IUserData } from '../interface'
import { Commit } from 'vuex'
import { createToast } from 'mosha-vue-toastify'
import axios from 'axios'
import {
  MAIN_URL,
  SET_LOADING_STATUS,
  SET_LOGIN,
  SET_LOGOUT,
  SUCCESS,
  DANGER,
  USER_LOCALSTORAGE,
} from '@/constants/constant'

const user = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE) as string)

const state = {
  user: user ? user : null,
  isLoading: false,
}

const getters = {
  getAuth: (state: userState) => state,
}
const actions = {
  async logIn({ commit }: { commit: Commit }, userData: IUserData) {
    commit(SET_LOADING_STATUS, true)
    try {
      const response = await axios.post(`${MAIN_URL}/api/auth/login`, userData)
      if (response.data) {
        localStorage.setItem(
          USER_LOCALSTORAGE,
          JSON.stringify(response.data.data)
        )
      }
      commit(SET_LOGIN, response.data.data)
      commit(SET_LOADING_STATUS, false)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      createToast(message, { type: DANGER })
      commit(SET_LOADING_STATUS, false)
      throw new Error(error)
    }
  },
  async signUp({ commit }: { commit: Commit }, userData: IUserData) {
    commit(SET_LOADING_STATUS, true)
    try {
      await axios.post(`${MAIN_URL}/api/auth/register`, userData)
      commit(SET_LOADING_STATUS, false)
      createToast('User Registered. Proceed login', { type: SUCCESS })
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      createToast(message, { type: DANGER })
      commit(SET_LOADING_STATUS, false)
      throw new Error(error)
    }
  },
  async logout({ commit }: { commit: Commit }) {
    localStorage.removeItem(USER_LOCALSTORAGE)
    commit(SET_LOGOUT)
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
