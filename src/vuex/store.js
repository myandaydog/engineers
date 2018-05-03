import Vue from "vue"
import Vuex from "vuex"
import vux from "./vuxloading.js"
import judgeload from "./judgeload.js"
import getters from "./getters.js"
Vue.use(Vuex)




const store = new Vuex.Store({
				modules:{
					vux,judgeload
				},
				getters
})






export default store;