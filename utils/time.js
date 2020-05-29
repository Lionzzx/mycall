export default {
	formatTime(date = new Date(), fmt = "yyyy-MM-dd hh:mm:ss") {
		if (!date) {
			date = new Date()
		}
		if (typeof date == 'number') {
			date = new Date(date)
		}

		var o = {
			"M+": date.getMonth() + 1,
			"d+": date.getDate(),
			"h+": date.getHours(),
			"m+": date.getMinutes(),
			"s+": date.getSeconds(),
			"q+": Math.floor((date.getMonth() + 3) / 3),
			S: date.getMilliseconds()
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				(date.getFullYear() + "").substr(4 - RegExp.$1.length)
			);
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(
					RegExp.$1,
					RegExp.$1.length === 1 ?
					o[k] :
					("00" + o[k]).substr(("" + o[k]).length)
				);
			}
		}
		return fmt;
	},
	/**
	 * 倒计时
	 * @param {*} timestamp
	 */
	formatTimestamp(fmt = "hh:mm:ss", timestamp = 10000) {
		var hour = Math.floor((timestamp / 60 / 60) % 24);
		var min = Math.floor((timestamp / 60) % 60);
		var sec = Math.floor(timestamp % 60);
		if (hour < 10) {
			hour = "0" + hour;
		}
		if (min < 10) {
			min = "0" + min;
		}
		if (sec < 10) {
			sec = "0" + sec;
		}
		var o = {
			hh: hour,
			mm: min,
			ss: sec
		};
		var label = fmt.split(":");
		var str = "";
		for (var k in label) {
			str += o[label[k]] + ":";
		}
		return str.substring(0, str.length - 1);
	},
	/**
     * 时间显示说明：

1.1刚刚：3分钟内产生的记录显示“刚刚”。

1.2今天：今天产生的记录显示“时:分”（例：09:03）

1.3昨天：昨天产生的记录显示“昨天 时:分”（例：昨天 12:00）

1.4今年：今年产生的记录显示“月/日 时:分”（例：03/01 05:07）

1.5非今年：非今年产生的记录显示“年/月/日 时:分”（例：2017/09/11 08:14）

2.时间数字不足两位时前面补零。（例：2017年9月11日 8点14分显示为“2017/09/11 08:14”）
* @param {*} value  value时间格式为2020-04-06T14:20:59.237
     */
	displayTimeFormat(value) {
		// 处理时间显示内容
		if (value) {
			let time = this.filterTimeFormat(`${value}`)
			let timeStamp = new Date(time).getTime(); // 时间戳格式
			let nowTime = new Date();
			let nowTimeStamp = new Date().getTime(); // 当前时间戳格式
			let today = this.formatTime(nowTime, "yyyy-MM-dd"); // 今天的年月日格式
			let isLessThirdSecond = nowTimeStamp - timeStamp < 1000 * 60 * 3; // 是否小于三分钟
			let isToday = time.substr(0, 10) == today; // 是否是今天
			let isYesterday =
				new Date(today).getTime() - new Date(time.substr(0, 10)) ==
				1000 * 60 * 60 * 24;
			if (isLessThirdSecond) {
				// 小于三分钟
				return "刚刚";
			} else if (isToday) {
				// 今天
				return time.substr(11, 5);
			} else if (isYesterday) {
				// 昨天
				return "昨天" + time.substr(11, 5);
			} else if (nowTime.getFullYear() == time.substr(0, 4)) {
				// 今年
				return time.substr(5, 5);
			} else {
				return time;
			}
		} else {
			return "";
		}
	},
	filterTimeFormat(value) {
		if (value) {
			return value.replace("T", " ").substr(0, 19);
		}
	},
	// 传入指定的日期，转换计算当前年龄
	getAgeFromDateTime(dateTime) {
		var returnAge;
		var strBirthdayArr = dateTime.split("-");
		var birthYear = strBirthdayArr[0];
		var birthMonth = strBirthdayArr[1];
		var birthDay = strBirthdayArr[2];

		var d = new Date();
		var nowYear = d.getFullYear();
		var nowMonth = d.getMonth() + 1;
		var nowDay = d.getDate();

		if (nowYear == birthYear) {
			returnAge = 0; //同年 则为0岁
		} else {
			var ageDiff = nowYear - birthYear; //年之差
			if (ageDiff > 0) {
				if (nowMonth == birthMonth) {
					var dayDiff = nowDay - birthDay; //日之差
					if (dayDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				} else {
					var monthDiff = nowMonth - birthMonth; //月之差
					if (monthDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				}
			} else {
				returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
			}
		}
		return returnAge; //返回周岁年龄

	},
	timestampFormat(timestamp) {
		function zeroize(num) {
			return (String(num).length == 1 ? '0' : '') + num;
		}

		var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
		var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

		var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
		var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

		var Y = tmDate.getFullYear(),
			m = tmDate.getMonth() + 1,
			d = tmDate.getDate();
		var H = tmDate.getHours(),
			i = tmDate.getMinutes(),
			s = tmDate.getSeconds();

		if (timestampDiff < 60) { // 一分钟以内
			return "刚刚";
		} else if (timestampDiff < 3600) { // 一小时前之内
			return Math.floor(timestampDiff / 60) + "分钟前";
		} else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
			return '今天' + zeroize(H) + ':' + zeroize(i);
		} else {
			var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
			if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
				return '昨天' + zeroize(H) + ':' + zeroize(i);
			} else if (curDate.getFullYear() == Y) {
				return zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
			} else {
				return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
			}
		}
	}
};
