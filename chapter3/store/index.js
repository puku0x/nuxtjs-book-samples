export const state = () => ({
  isLoading: false
})

export const mutations = {
  setIsLoading(state, payload) {
    const { isLoading } = payload
    state.isLoading = isLoading
  }
}

export const actions = {
  setIsLoading({ commit }, payload) {
    const { isLoading } = payload
    commit('setIsLoading', { isLoading })
  }
}
