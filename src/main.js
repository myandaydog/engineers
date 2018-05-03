// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import Vuex from "vuex"
/*import vuei18n from 'vue-i18n'*/
import store from './vuex/store.js'
//Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
//const store = new Vuex.Store({})



/*store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})*/
router.beforeEach(function (to, from, next) {
	
	store.commit('updateLoadingStatus', {isLoading: true})
	  next()

  
})

router.afterEach(function (to) {
	setTimeout(function(){
  		store.commit('updateLoadingStatus', {isLoading: false})
	},0)
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})