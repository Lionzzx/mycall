import request from '@/libs/request'
var url = 'call'
// 获取短信验证码

export const call = (data) => {
	return request({
		url,
		method: 'CALL',
		data
	})
}

// 获取用户列表
export const getCallList = (data) => {
	return request({
		url,
		method: 'GETCALLLIST',
		data
	})
}
