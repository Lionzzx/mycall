'use strict';
var md5 = require('md5-node');
const db = uniCloud.database();
const _ = db.command
var code = 200
var msg = 'ok';
var data

async function setCode(phone, code, tip) { // 发送短信
	let accountSId = "8aaf07087249953401725e14fe3d0cb0";
	let accountToken = "66ac139a8e214f0f857452c6bb2f6e6c";
	let appId = "8aaf07087249953401725e14ff3b0cb6";
	let to = phone;
	let templateId = "1";
	let myDate = new Date();
	let year = myDate.getFullYear()
	let month = myDate.getMonth() + 1
	let days = myDate.getDate()
	let seconds = myDate.getSeconds()
	let minutes = myDate.getMinutes()
	let hours = (myDate.getHours() + 8) % 24
	let time =
		`${year}${month<10?'0'+month:month}${days<10?'0'+days:days}${hours<10?'0'+hours:hours}${minutes<10?'0'+minutes:minutes}${seconds<10?'0'+seconds:seconds}`


	let SigParameter = md5(`${accountSId}${accountToken}${time}`).toUpperCase()
	let url =
		`https://app.cloopen.com:8883/2013-12-26/Accounts/${accountSId}/SMS/TemplateSMS?sig=${SigParameter}`
	const resp = await uniCloud.httpclient.request(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: Buffer.from(`${accountSId}:${time}`).toString('base64')
		},
		data: {
			to,
			templateId,
			appId,
			datas: [code, tip]
		},
		dataType: 'json'
	})

	return resp.data
}

exports.main = async (event, context) => {
	const collection = db.collection('user')
	switch (event.method) {
		case 'GET':
			var page = event.page ? event.page : 1,
				pageSize = event.pageSize ? event.pageSize : 99999,
				search = {
					city: event.city ? new RegExp(event.city) : _.exists(true)
				},
				total = (await collection.where(search).count()).total,
				res = await collection.where(search).skip((page - 1) * pageSize).limit(pageSize).get();

			data = {
				total,
				page,
				pageSize,
				data: res.data
			}
			return {
				code: 200,
				msg: 'ok',
				data
			}
			break;
		case 'GETCODE':
			// 生成随机码,存到数据库中
			const userResp = await collection.where({
				phone: event.phone
			}).get();

			const randCode = [10, 9, 8, 7].map(v => Math.floor(Math.random() * v)).join('')
			if (userResp.affectedDocs < 1) {
				await collection.add({
					phone: event.phone,
					password: randCode
				})
			} else {
				await collection.where({
					phone: event.phone
				}).update({
					password: randCode,
				})
			}
			const resp = await setCode(event.phone, randCode, event.tip || '123')
			return {
				client: resp,
				code: 200,
				msg: 'ok',
			}
			break
		case 'LOGIN':
			var res = await collection.where({
				phone: event.phone,
			}).get();
			if (res.affectedDocs < 1) {
				return {
					code: 1000,
					status: 'error',
					msg: '该账户不存在'
				};
			} else {
				if (res.data[0].password == event.password) {
					return {
						code: 200,
						data: res.data[0]._id,
						status: 'ok',
						msg: '登录成功'
					};
				} else {
					return {
						code: 1000,
						status: 'error',
						msg: '密码错误'
					};
				}
			}
			break
		default:
			var code = '404',
				msg = '请求方式错误: Request mode error';
			break;
	}


	return {
		code,
		msg,
		data
	}
};
