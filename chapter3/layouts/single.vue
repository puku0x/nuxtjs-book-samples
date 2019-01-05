<template>
  <div>
    <span>Single</span>
    <AppNavigation />
    <hr>
    <nuxt/>
    <nuxt-link to="/">Top page</nuxt-link>
    <hr>
    <footer>footer</footer>
  </div>
</template>

<script>
import AppNavigation from '~/components/AppNavigation.vue'

export default {
  components: {
    AppNavigation
  }
}
</script>
