import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    items: [],
    users: {},
    userItems: {}
  },
  getters: {
    items: (state) => state.items,
    users: (state) => state.users,
    userItems: (state) => state.userItems
  },
  mutations: {
    setItems(state, payload) {
      const { items } = payload
      state.items = items
    },
    setUser(state, payload) {
      const { user } = payload
      state.users[user.id] = user
    },
    setUserItems(state, payload) {
      const { user, items } = payload
      state.userItems[user.id] = items
    }
  },
  actions: {
    async fetchItems({ commit }) {
      const items = await this.$axios.$get('https://qiita.com/api/v2/items?query=tag:nuxt.js')
      commit('setItems', { items })
    },
    async fetchUserInfo({ commit }, { id }) {
      const [user, items] = await Promise.all([
        this.$axios.$get(`https://qiita.com/api/v2/users/${id}`),
        this.$axios.$get(`https://qiita.com/api/v2/items?query=user:${id}`)
      ])
      commit('setUser', { user })
      commit('setUserItems', { user, items })
    }
  }
})
