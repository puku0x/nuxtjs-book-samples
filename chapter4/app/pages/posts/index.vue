<template>
  <section class="container posts-page">
    <el-card>
      <div slot="header" class="clearfix">
        <span>新着投稿</span>
      </div>
      <el-table v-bind:data="showPosts" style="width: 100%;" class="table" v-on:row-click="handleClick($event)">
        <el-table-column prop="title" label="タイトル"></el-table-column>
        <el-table-column prop="user.id" label="投稿者" width="180"></el-table-column>
        <el-table-column prop="created_at" label="投稿日時" width="240"></el-table-column>
      </el-table>
    </el-card>
  </section>
</template>

<script>
import moment from '~/plugins/moment'
import { mapGetters, mapActions } from 'vuex'

export default {
  async asyncData({ store }) {
    await store.dispatch('posts/fetchPosts')
  },
  computed: {
    showPosts() {
      return this.posts.map(post => {
        post.created_at = moment(post.created_at).format('YYYY/MM/DD HH:mm:ss')
        return post
      })
      // return [
      //   {
      //     id: '001',
      //     title: 'How to develop a Nuxt.js Application',
      //     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      //     created_at: '2018/08/10 12:00:00',
      //     user: {
      //       id: 'potato4d'
      //     }
      //   },
      //   {
      //     id: '002',
      //     title: 'How to deploy a Nuxt.js Application to Heroku',
      //     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      //     created_at: '2018/08/10 13:00:00',
      //     user: {
      //       id: 'potato4d'
      //     }
      //   }
      // ]
    },
    ...mapGetters('posts', ['posts'])
  },
  methods: {
    handleClick(post) {
      this.$router.push(`/posts/${post.id}`)
    }
  }
}
</script>

<style>
.posts-page .el-table__row {
  cursor: pointer;
}
</style>
