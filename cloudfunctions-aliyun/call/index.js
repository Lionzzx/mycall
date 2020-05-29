'use strict';
const db = uniCloud.database();
const _ = db.command
var code = 200
var msg = 'ok';
var data


exports.main = async (event, context) => {
	const collection = db.collection('call')
	switch (event.method) {
		case 'GETCALLLIST':
			var page = event.page ? event.page : 1,
				pageSize = event.pageSize ? event.pageSize : 99999,
				search = {
					title: event.title ? event.title : _.exists(true)
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

		case 'CALL':
			delete event.method
			const resp = await collection.add({ ...event,
				createTime: Date.now()
			})
			return {
				code: 200,
				msg: 'ok',
				data: resp
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
