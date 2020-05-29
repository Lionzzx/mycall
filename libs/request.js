import store from '@/store/index.js'
const white = ['LOGIN', 'GETCODE']
export default function(obj) {
	console.log(white.includes(obj.method))
	if (!white.includes(obj.method)) {
		if (!store.state.token) {
			uni.navigateTo({
				url: '/pages/login/register'
			})
			return Promise.reject('请登录')
		} else {
			obj.data = { ...obj.data,
				userId: store.state.token
			}
		}
	}

	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: obj.url,
			data: Object.assign(obj.data, {
				method: obj.method
			}),
			success(res) {
				console.log(res)
				var data = res.result
				if (data.code == 200) {
					resolve(data.data)
				} else {
					uni.showToast({
						title: data.msg,
						icon: "none"
					})
					reject(data)
				}
			},
			fail(error) {
				reject(error)
			}
		})
	})
}
