import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    isLogin: state => {
      return !!state.user.cookie
    }
  },
  mutations: {
    setUser (state, val) {
      state.user = val
    }
  },
  actions: {
  },
  modules: {
  }
})
