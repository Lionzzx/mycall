import Vue from 'vue'
import App from './App'
import store from '@/store';
Vue.config.productionTip = false
App.mpType = 'app'
/* 全局方法 */
Vue.prototype.$msg = function(title, icon = "none", duration = 1000) {
	return uni.showToast({
		title,
		icon,
		duration
	})
}
const app = new Vue({
	...App,
	store
})
app.$mount()
