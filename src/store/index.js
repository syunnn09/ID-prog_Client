import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      console.log(user);
      state.user = user;
    }
  },
  actions: {
    async nuxtServerInit({ commit }, { req, app }) {
      if (req.session.authToken) {
        const data = await app.$axios.$get('/api/me/');
        commit('setUser', data);
      } else {
        commit('setUser', null);
      }
    },
    async login({ commit }, creds) {
      await this.$axios.$post('/login/', creds);
      const data = await this.$axios.$get('/api/me/');
      commit('setUser', data);
    },
    logout({ commit }) {
      commit('setUser', null);
      this.$axios.$post('/logout/');
    }
  }
});

export default store
