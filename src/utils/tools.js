
/**
 * 将整数,逢三一断
 *  
 * 
 * @static
 * @param {number,String} value  需要处理的整数 
 * @returns {String} 返回一个包含拆分区块的新数组（注：相当于一个二维数组）。
 
 */
function NumberFormat(value) {

    if (!value) {
        return '0'
    }
    let intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') //将整数部分逢三一断
    return intPartFormat
}
 
let num = 12345678901234567


console.log(num);
console.log(NumberFormat(num));