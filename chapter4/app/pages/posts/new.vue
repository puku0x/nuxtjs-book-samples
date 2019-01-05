<template>
  <section class="container posts-page">
    <el-card style="flex: 1;">
      <div slot="header" class="clearfix">
        <el-input placeholder="タイトル" v-model="formData.title" />
      </div>
      <div>
        <el-input placeholder="本文" type="textarea" rows="15" v-model="formData.body" />
      </div>
      <div class="text-right" style="margin-top: 16px;">
        <el-button type="primary" v-on:click="publish" round>
          <span class="el-icon-upload2" />
          <span>Publish</span>
        </el-button>
      </div>
    </el-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  asyncData({ redirect, store }) {
    if (!store.getters['user']) {
      redirect('/')
    }
    return {
      formData: {
        title: '',
        body: ''
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async publish() {
      const post = {
        user: this.user,
        ...this.formData
      }
      await this.publishPost({ post })
      this.$router.push('/posts')
    },
    // ...mapActions('users', ['updateUser']),
    ...mapActions('posts', ['publishPost'])
  }
}
</script>

<style>
.posts-page .el-table__row {
  cursor: pointer;
}
</style>
