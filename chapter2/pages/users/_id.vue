<template>
  <section class="container">
    <div>
      <h3>{{user.id}}</h3>
      <img v-bind:src="user.profile_image_url" width="120" alt>
      <p>{{user.description || 'No description'}}</p>
      <p>
        <nuxt-link to="/">
          <small>
            <b>Return to top</b>
          </small>
        </nuxt-link>
      </p>
      <h3>{{user.id}} articles</h3>
      <ul>
        <li v-for="item in items" v-bind:key="item.id">
          <h4>
            <span>{{item.title}}</span>
          </h4>
          <div>{{item.body.slice(0, 130)}}...</div>
          <p>
            <a target="_blank" v-bind:href="item.url">{{item.url}}</a>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  head() {
    return {
      title: this.user.id
    }
  },
  async asyncData({ route, store, redirect }) {
    const userId = route.params.id
    console.log(store.getters['users'] );

    if (store.getters['users'][userId]) {
      return
    }
    try {
      await store.dispatch('fetchUserInfo', { id: userId })
    } catch (e) {
      redirect('/')
    }
  },
  computed: {
    user() {
      return this.users[this.$route.params.id]
    },
    items() {
      return this.userItems[this.$route.params.id]
    },
    ...mapGetters(['users', 'userItems'])
  }
  // async asyncData({ route, app }) {
  //   const id = route.params.id
  //   const user = await app.$axios.$get(`https://qiita.com/api/v2/users/${id}`)
  //   const items = await app.$axios.$get(`https://qiita.com/api/v2/items?query=user:${id}`)
  //   return {
  //     user,
  //     items
  //   }
  // }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding: 16px;
}

h3 {
  margin: 16px 0;
  padding: 8px 0;
  border-bottom: solid 1px #e5e5e5;
}

li + li {
  margin: 16px 0;
}

p {
  margin: 8px 0;
}
</style>


