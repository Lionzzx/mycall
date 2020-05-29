// 分页模型
export const getModuleList = async function(name, api, params, handle) {
	if (!this[name].hasMore) {
		return;
	}
	try {
		uni.showToast({
			title: '加载中...',
			icon: 'loading'
		});

		this[name].pageNum += 1;

		const data = await api({
			...params,
			pageNum: this[name].pageNum,
			pageSize: this[name].pageSize
		});

		this[name].hasMore = data.total > data.pageNum * data.pageSize;
		if (!data.list.length) {
			return;
		}
	
		if (typeof handle == 'function') {
			data.list = handle(data.list)
		}
		this[name].list = [...this[name].list, ...data.list]
	} catch (e) {
		console.log(e)
	} finally {
		uni.hideToast();
	}
}
