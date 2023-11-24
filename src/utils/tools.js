
/**
 * 将整数,逢三一断
 *  
 * 
 * @static
 * @param {number,String} value  需要处理的整数 
 * @returns {String} 返回一个字符串。
 * @example
 * let num = 12345678901234567789
 * console.log(NumberFormat(num));
 * ! => 12,345,678,901,234,568
 *
 */
// function NumberFormat(value) {

//     if (!value) {
//         return '0'
//     }
//     let intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') //将整数部分逢三一断
//     return intPartFormat
// }
/**
 * 对任何 BigInt 值使用 JSON.stringify() 都会引发 TypeError，因为默认情况下 BigInt 值不会在 JSON 中序列化。
 * 但是，如果需要，可以实现 toJSON 方法：
 */
// BigInt.prototype.toJSON = function () {
//     return this.toString();
// };
//  const alsoHuge = BigInt(9007199254740991);
// console.log(BigInt(12345678901234567890123456789012345678901234567890123456789n)===12345678901234567890123456789012345678901234567890123456789n);
// console.log(NumberFormat(obj.num));
/**
* 将毫秒，转换成时间字符串。例如说，xx 分钟
*
* @param ms 毫秒
* @returns {string} 字符串
*/
// function getDate(ms) {
//     if (ms < 0)
//         ms = ms * -1;
//     const day = Math.floor(ms / (24 * 60 * 60 * 1000));
//     const hour = Math.floor((ms / (60 * 60 * 1000) - day * 24));
//     const minute = Math.floor(((ms / (60 * 1000)) - day * 24 * 60 - hour * 60));
//     const second = Math.floor((ms / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60));
//     if (day > 0) {
//         return day + "天" + hour + "小时" + minute + "分钟" + second + "秒";
//     }
//     if (hour > 0) {
//         return hour + "小时" + minute + "分钟";
//     }
//     if (minute > 0) {
//         return minute + "分钟";
//     }
//     if (second > 0) {
//         return second + "秒";
//     } else {
//         return 0 + "秒";
//     }
// }

// var newDate = getDate(new Date().getTime() - new Date("2024-01-01").getTime());
// console.log(newDate);

// //判断是否IE<11浏览器

// function isIE() {
//     return navigator.userAgent.indexOf('compatible') > -1 && navigator.userAgent.indexOf('MSIE') > -1

// }
// console.log(isIE());
// //判断是否IE11浏览器
// function isIE11() {
//     return navigator.userAgent.indexOf('Trident') > -1 && navigator.userAgent.indexOf('rv:11.0') > -1
// }
// console.log(isIE11(), 'isIE11');

// //判断是否IE的Edge浏览器
// function isEdge() {
//     return navigator.userAgent.indexOf('Edge') > -1 && !isIE()
// }
// console.log(isEdge(), 'isEdge');
// function getIEVersion() {
//     let userAgent = navigator.userAgent //取得浏览器的userAgent字符串
//     let _isIE = isIE()
//     let _isIE11 = isIE11()
//     let _isEdge = isEdge()

//     if (_isIE) {
//         let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
//         reIE.test(userAgent)
//         let fIEVersion = parseFloat(RegExp['$1'])
//         if (fIEVersion === 7 || fIEVersion === 8 || fIEVersion === 9 || fIEVersion === 10) {
//             return fIEVersion
//         } else {
//             return 6//IE版本<7
//         }
//     } else if (_isEdge) {
//         return 'edge'
//     } else if (_isIE11) {
//         return 11
//     } else {
//         return -1
//     }
// }
// console.log(getIEVersion());


function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm),'');
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}


console.log(parseTime("2023.02.01"));