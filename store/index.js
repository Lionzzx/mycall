import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		token: uni.getStorageSync('token'),
		store: {},
		cart: [],
		orderType: 'takein',
		address: {},
		addresses: {},
		member: {},
		order: {}
	},
	getters: {
		isLogin: state => Object.keys(state.member).length > 0 //是否登录
	},
	mutations: {
		SET_ORDER_TYPE(state, type) {
			state.orderType = type
		},
		SET_MEMBER(state, member) {
			state.member = member
		},
		SET_ADDRESS(state, address) {
			state.address = address
		},
		SET_ADDRESSES(state, addresses) {
			state.addresses = addresses
		},
		SET_STORE(state, store) {
			state.store = store
		},
		SET_CART(state, cart) {
			state.cart = cart
		},
		REMOVE_CART(state) {
			state.cart = []
		},
		SET_ORDER(state, order) {
			state.order = order
		}
	},
	actions: {
		async getStore({
			commit
		}) {
			const store = {}
			commit('SET_STORE', store)
		}
	}
})
