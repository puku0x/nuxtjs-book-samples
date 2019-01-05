export const state = () => {
  return {
    users: [],
    userPosts: {}
  }
}

export const getters = {
  users: (state) => state.users
}

export const mutations = {
  addUser(state, payload) {
    const { user } = payload
    state.users = [...state.users, user]
  },
  addUserPost(state, payload) {
    const { user, post } = payload
    state.userPosts[user.id].push(post)
  },
  clearUserPosts(state, payload) {
    const { user } = payload
   state.userPosts[user.id] = []
  }
}

export const actions = {
  async fetchUser({ commit }, payload) {
    const { id } = payload
    const user = await this.$axios.$get(`/users/${id}.json`)
    commit('addUser', { user })
  }
}
