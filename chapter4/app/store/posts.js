import moment from '~/plugins/moment'

export const state = () => {
  return {
    posts: []
  }
}

export const getters = {
  posts: (state) => state.posts.map(post => Object.assign({ likes: [] }, post))
}

export const mutations = {
  addPost(state, payload) {
    const { post } = payload
    state.posts = [...state.posts, post]
  },
  updatePost(state, payload) {
    const { post } = payload
    state.posts = state.posts.map(p => p.id === post.id ? post : p)
  },
  clearPosts(state) {
    state.posts = []
  }
}

export const actions = {
  async fetchPost({ commit }, payload) {
    const { id } = payload
    const post = await this.$axios.$get(`/posts/${id}.json`)
    commit('addPost', { post: { ...post, id }})
  },
  async fetchPosts({ commit }) {
    const posts = await this.$axios.$get(`/posts.json`)
    commit('clearPosts')
    Object.entries(posts)
      .reverse()
      .forEach(([id, content]) => {
        commit('addPost', {
          post: {
            id,
            ...content
          }
        })
      })
  },
  async publishPost({ commit }, payload) {
    const { post } = payload
    const user = await this.$axios.$get(`/users/${post.user.id}.json`)
    const post_id = (await this.$axios.$post(`/posts.json`, post)).name
    const created_at = moment().format()
    const p = {
      id: post_id,
      ...post,
      created_at
    }
    const putData = {
      id: post_id,
      ...post,
      created_at
    }
    delete putData.user
    await this.$axios.$put(`/users/${user.id}/posts.json`, [
      ...(user.posts || []),
      putData
    ])
    commit('addPost', { post: p })
  },
  async addLikeToPost({ commit }, payload) {
    const { user, post } = payload
    post.likes.push({
      created_at: moment().format(),
      user_id: user.id,
      post_id: post.id
    })
    const newPost = await this.$axios.put(`/posts/${post.id}.json`, post)
    commit('updatePost', { post: newPost })
  }
}
