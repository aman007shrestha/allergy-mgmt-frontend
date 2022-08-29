import {
  userState,
  IAllergyState,
  IAllergyToInsert,
  IPosts,
} from '../interface'
import { getConfig } from '@/utils/utils'

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
  // Get All Allergies Post
  async fetchAllergies({
    commit,
    rootState,
  }: {
    commit: Commit
    rootState: any
  }) {
    const token = rootState.auth.user.accessToken as string
    const config = getConfig(token)
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
  async addAllergy(
    {
      commit,
      rootState,
    }: {
      commit: Commit
      rootState: any
    },
    payload: IAllergyToInsert
  ) {
    const token = rootState.auth.user.accessToken as string
    const config = getConfig(token)
    commit('setLoadingStatus', true)
    try {
      const response = await axios.post(
        'http://localhost:5000/api/allergy',
        payload,
        config
      )
      commit('addAllergy', response.data.data)
      createToast(response.data.message, { type: 'success' })
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
  setAllergies: (state: IAllergyState, payload: IPosts[]) =>
    (state.allergies = payload),
  setLoadingStatus: (state: userState, value: boolean) =>
    (state.isLoading = value),
  addAllergy: (state: IAllergyState, payload: IPosts[]) => {
    state.allergies = [...payload, ...state.allergies]
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
