import {
  userState,
  IAllergyState,
  IAllergyToInsert,
  IPosts,
} from '../interface'
import { getConfig } from '@/utils/utils'
import {
  MAIN_URL,
  SUCCESS,
  DANGER,
  SET_LOADING_STATUS,
  SET_ALLERGIES,
  ADD_ALLERGY,
  UPDATE_ALLERGY,
  DELETE_ALLERGY,
} from '@/constants/constant'

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
    commit(SET_LOADING_STATUS, true)
    try {
      const response = await axios.get(`${MAIN_URL}/api/allergy`, config)
      commit(SET_ALLERGIES, response.data.data)
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
  // POST request
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
    commit(SET_LOADING_STATUS, true)
    try {
      const response = await axios.post(
        `${MAIN_URL}/api/allergy`,
        payload,
        config
      )
      commit(ADD_ALLERGY, response.data.data)
      createToast(response.data.message, { type: SUCCESS })
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
  // Delete Request
  async deleteAllergy(
    {
      commit,
      rootState,
    }: {
      commit: Commit
      rootState: any
    },
    id: number
  ) {
    const token = rootState.auth.user.accessToken as string
    const config = getConfig(token)
    commit(SET_LOADING_STATUS, true)
    try {
      const response = await axios.delete(
        `${MAIN_URL}/api/allergy/${id}`,
        config
      )
      commit(DELETE_ALLERGY, id)
      createToast(response.data.message, { type: SUCCESS })
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

  // PUT request
  async updateAllergy(
    {
      commit,
      rootState,
    }: {
      commit: Commit
      rootState: any
    },
    { payload, id }: { payload: IAllergyToInsert; id: number }
  ) {
    const token = rootState.auth.user.accessToken as string
    const config = getConfig(token)
    commit(SET_LOADING_STATUS, true)
    try {
      const response = await axios.put(
        `${MAIN_URL}/api/allergy/${id}`,
        payload,
        config
      )
      commit(UPDATE_ALLERGY, response.data.data)

      createToast(response.data.message, { type: SUCCESS })
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
}
const mutations = {
  setAllergies: (state: IAllergyState, payload: IPosts[]) =>
    (state.allergies = payload),
  setLoadingStatus: (state: userState, value: boolean) =>
    (state.isLoading = value),
  addAllergy: (state: IAllergyState, payload: IPosts[]) => {
    state.allergies = [...payload, ...state.allergies]
  },
  deleteAllergy: (state: IAllergyState, id: number) =>
    (state.allergies = state.allergies.filter(
      (allergy) => allergy.allergy_id !== id
    )),
  updateAllergy: (state: IAllergyState, payload: IPosts[]) => {
    const index = state.allergies.findIndex(
      (allergy) => allergy.allergy_id === payload[0].allergy_id
    )
    if (index !== -1) {
      state.allergies.splice(index, 1, payload[0])
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
