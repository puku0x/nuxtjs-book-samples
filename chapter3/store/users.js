export const state = () => ({
  list: []
})

export const mutations = {
  addUser(state, payload) {
    const { user } = payload
    state.list = [...state.list, user]
  }
}

export const actions = {
  addUser({ commit }, payload) {
    const { user } = payload
    commit('addUser', { user })
  }
}
