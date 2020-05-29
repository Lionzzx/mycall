import store from '@/store/index.js'
import time from '@/utils/time.js'
/**
 * 时间轮换器
 * 目前仅支持小时的轮换
 * @param {Number} interval 时间间隔，默认2小时
 * @param {Date} startTime 计算间隔的起始时间， 比如间隔为[23, 1] [1, 3] [3, 5], 则startTime为1点的时间
 * @param {Function} callback 轮询执行的回调函数
 */
export function timeSwiper(callback, interval = 2, startTime) {
	if (interval >= 1) {
		// 测试数据，模拟当前时间
		// var now = new Date(`${time.formatTime('yyyy-MM-dd')} 14:10:00`)
		var now = new Date();
		var nowTime = {
			hours: now.getHours(),
			minutes: now.getMinutes(),
			seconds: now.getSeconds()
		};
		// 默认从当天的1点算起
		startTime =
			startTime || new Date(`${time.formatTime(null,"yyyy/MM/dd")} 01:00:00`);
		// 最近距离满点小时的时间
		var recentHour =
			(60 - nowTime.seconds) * 1000 + (60 - nowTime.minutes - 1) * 60 * 1000;
		// 一小时经过需要的时间
		var oneHour = 60 * 60 * 1000;
		// 下一次轮询的时间点
		var nextTime =
			Math.ceil(nowTime.hours / interval) * interval + startTime.getHours();
		console.log("下一次更新的时间: ", nextTime > 24 ? nextTime - 24 : nextTime);
		var intervalTime = oneHour * (nextTime - nowTime.hours - 1) + recentHour;
		console.log("需要定时(分钟)：", intervalTime / 1000 / 60);
		var ret = {
			nextTime: nextTime > 24 ? nextTime - 24 : nextTime,
			intervalTime
		};
		if (callback) {
			callback(ret);
			if (store.state.timeSwiperTimer) {
				clearTimeout(store.state.timeSwiperTimer)
			}
			store.state.timeSwiperTimer = setTimeout(() => {
				timeSwiper(callback)
			}, intervalTime);
		}
		return ret;
	}
}


/**
 * 高亮显示关键字
 * @param str
 * @param key
 */
export const keywordsColorful = (str, key) => {
	var reg = new RegExp("(" + key + ")", "g");
	var newstr = str.replace(reg, "##" + key + "##");
	var newArr = newstr.split("##")
	return newArr;
}

/**
 * 防抖
 * @param str
 * @param key
 */
export function debounce(fn, wait) {
	let timer = null;
	return function(value, that) {
		if (timer !== null) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => fn(value, that), wait);
	}
}
