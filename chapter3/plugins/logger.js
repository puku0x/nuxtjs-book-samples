export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    console.log(`[Router] move to '${to.fullPath}'`)
    next()
  })
}
