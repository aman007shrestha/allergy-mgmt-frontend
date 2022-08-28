import { userState, IAllergyState } from '../interface'

import { Commit } from 'vuex'
import { createToast } from 'mosha-vue-toastify'
import axios from 'axios'

const state = {
  allergies: [],
  isLoading: false,
}

const getters = {
  getAllergies: (state: IAllergyState) => state,
}
const actions = {
  async fetchAllergies({
    commit,
    rootState,
  }: {
    commit: Commit
    rootState: any
  }) {
    console.log(rootState.auth.user.accessToken)
    const token = rootState.auth.user.accessToken as string
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    commit('setLoadingStatus', true)
    try {
      const response = await axios.get(
        'http://localhost:5000/api/allergy',
        config
      )
      commit('setAllergies', response.data.data)
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
}
const mutations = {
  setAllergies: (state: IAllergyState, payload: any) =>
    (state.allergies = payload),
  setLoadingStatus: (state: userState, value: boolean) =>
    (state.isLoading = value),
}

export default {
  state,
  getters,
  actions,
  mutations,
}
