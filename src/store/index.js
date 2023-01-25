import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/localStorage'

Vue.use(Vuex)
const TOKEN_KTY = 'USER_KEY'

export default new Vuex.Store({
  state: {
    // user: null
    user: getItem(TOKEN_KTY)
  },
  getters: {
  },
  mutations: {
    getToken(state, data) {
      state.user = data

      setItem(TOKEN_KTY, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
