export function diffTime(startDate, endDate = new Date()) {
	startDate = new Date(startDate);
	let diff = endDate.getTime() - startDate.getTime(); //时间差的毫秒数  

	//计算出相差天数  
	let days = Math.floor(diff / (24 * 3600 * 1000));

	//计算出小时数  
	let leave1 = diff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数  
	let hours = Math.floor(leave1 / (3600 * 1000));
	//计算相差分钟数  
	let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数  
	let minutes = Math.floor(leave2 / (60 * 1000));

	//计算相差秒数  
	let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数  
	// let seconds = Math.round(leave3 / 1000);

	// let returnStr = seconds + "秒";
	let returnStr = ''
	if (minutes > 0) {
		returnStr = minutes + "分" + returnStr;
	}
	if (hours > 0) {
		returnStr = hours + "小时" + returnStr;
	}
	if (days > 0) {
		returnStr = days + "天" + returnStr;
	}
	return returnStr;
}
export function dateFormat(thisDate, fmt) {
    var o = {
        "M+": thisDate.getMonth() + 1,
        "d+": thisDate.getDate(),
        "h+": thisDate.getHours(),
        "m+": thisDate.getMinutes(),
        "s+": thisDate.getSeconds(),
        "q+": Math.floor((thisDate.getMonth() + 3) / 3),
        "S": thisDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (thisDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export function formatSeconds(value) {
	let theTime = parseInt(value); // 需要转换的时间秒 
	let theTime1 = 0; // 分 
	let theTime2 = 0; // 小时 
	let theTime3 = 0; // 天
	if (theTime > 60) {
		theTime1 = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		if (theTime1 > 60) {
			theTime2 = parseInt(theTime1 / 60);
			theTime1 = parseInt(theTime1 % 60);
			if (theTime2 > 24) {
				//大于24小时
				theTime3 = parseInt(theTime2 / 24);
				theTime2 = parseInt(theTime2 % 24);
			}
		}
	}
	let result = '';
	if (theTime > 0) {
		result = "" + parseInt(theTime) + "";
	}
	if (theTime1 > 0) {
		result = "" + parseInt(theTime1) + ":" + result;
	}
	if (theTime2 > 0) {
		result = "" + parseInt(theTime2) + "h" + result;
	}
	if (theTime3 > 0) {
		result = "" + parseInt(theTime3) + "天" + result;
	}
	return result;
}

export function checkEmail(value) {
	const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	return reg.test(value)
}

export function checkPhone(value) {
	const reg = /^[1][3,4,5,7,8][0-9]{9}$/;;
	return reg.test(value)
}

export function checkIdCard(value) {
	const reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;;
	return reg.test(value)
}
