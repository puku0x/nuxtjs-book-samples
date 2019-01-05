<template>
  <div>
    <h2>Login page</h2>
    <p>
      <button type="button" v-on:click="login">Login</button>
    </p>
  </div>
</template>

<script>
import Cookies from 'universal-cookie'

export default {
  methods: {
    login() {
      const cookies = new Cookies()
      cookies.set('credential', 'true', { maxAge: 90 })
      this.$router.push('/')
    }
  }
}
</script>
