// import { sortItemsDesc } from '../util/filters'
// import { filterDate } from '../util/filters'

export default {
  // pages (state) {
  //   // state.data.pages.filter(page => page.id === this.$route.params.id )[0]
  //   // console.log(state.data.pages)
  //   return state.data.pages
  // },
  // searchPosts (state) {
  //   // console.log(state.data.searchPosts)
  //   return state.data.searchPosts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  // },
  isAuthenticated (state, getters) {
    return state.data.isAuthenticated
  },
  navbarHeight (state) {
    console.log(state)
    return state.data.render.navbarHeight
  },
  recipe(state) {
    return keyword => state.data.recipes.filter(item => {
      return item.recipe.slug === keyword
    })[0];
  },
  recipes (state) {
    return state.data.recipes
  },
  user (state) {
    return state.data.user
  },
  // userPinnedPost (state) {
  //   return state.data.userShow.posts.filter(item => item.pin === true)
  // },
  // userShow (state, getters) {
  //   const pin = getters.userPinnedPost.length > 0 ? getters.userPinnedPost[0] : false
  //   console.log(pin)
  //   let arr = state.data.userShow.posts
  //   console.log(arr)
  //   if (pin) {
  //     arr.unshift(arr.splice(arr.indexOf(pin), 1)[0])
  //   }
  //   arr = arr.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  //   console.log(arr)
  //   return {
  //     user: state.data.userShow,
  //     posts: arr
  //   }
  //   // return state.data.userShow.posts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  // },
  // posts (state, getters) {
  //   console.log(state.data.posts)
  //   // let arr = []
  //   // state.data.posts.forEach (post => {
  //   //   arr.push(post)
  //   //   post.forwards.forEach(item => arr.push(item))
  //   // })
  //   // // arr.push(state.data.posts)
  //   // console.log(arr)
  //   // return arr.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  //   return state.data.posts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  // },
  // // last24hoursFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > filterDate(1)))
  // // },
  // // last7daysFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > filterDate(7)))
  // // },
  // // last30daysFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > filterDate(30)))
  // // },
  // // todayFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > new Date().setHours(0,0,0,0)))
  // // },
}