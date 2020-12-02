 const DigitalList = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"]
 const TailSepartorLabel = ['元', '万', '亿']
 const MiddleSepartorLabel = ['', '拾', '佰', '仟']

 /**
  * 分段替换数字
  * @param {string} segment 
  * @param {number} unitIdx 
  */
function _interpolateUnit(segment, unitIdx){
  if(unitIdx === 1 && /^0+$/.test(segment)) return '';

  return segment.split('').reverse().reduce((sum, numKey, idx) => {
    let middleUnit = idx > 0 && numKey !== '0' ? MiddleSepartorLabel[idx] : ''
    return  [DigitalList[numKey], middleUnit, sum].join('');
  }, TailSepartorLabel[unitIdx])
}

/**
 * 解析小数部分
 * @param {string} decimal 两位小数字符串
 */
function _parseDecimal(decimal){
  if(decimal === '00'){
    return ''
  }
  if(decimal[0] === '0'){
    return `零${DigitalList[decimal[1]]}分`
  }

  if(decimal[1] === '0'){
    return `${DigitalList[decimal[0]]}角`
  }

  return `${DigitalList[decimal[0]]}角${DigitalList[decimal[1]]}分`

}

/**
 * 转换中文金额大写
 * @param {number} num
 * @return {object} {errCode: 0, msg: '', value: ''} 
 */
function formatRMB(num, prefix="人民币"){
    if(typeof num !== 'number'){
      return {
        errCode: 1,
        msg: `类型错误: ${num}不是合理的金额！`,
        value: ''
      };
    }

    if(num < 0){
      return {
        errCode: 3,
        msg: `数值错误: ${num}必须为非零整数`,
        value: ''
      };
    }

    let isInt = !num.toString().includes('.');

    // step 1: 正则匹配进行分段
    let regString = num.toFixed(2).replace(/\B(?=(\d{4})+\b)/g, ",");
    let [integerPart, decimalPart] = regString.split('.');
    let integerList = integerPart.split(',');
    if(integerList.length > 3){
      return {
        errCode: 2,
        msg: `错误: ${num}超过了合理的数据范围！`,
        value: num.toString(),
      }
    }
    
    // step 2: 分批次位数替换
    let integerResult = '';
    if(integerList.length === 1 && integerList[0] === '0'){
      integerResult = isInt ? '零元' : ''
    }else {
      integerResult = integerList.map((segment, idx) => {
        return _interpolateUnit(segment, integerList.length - idx - 1);
      }).reduce((sum, item) => {
        // 过滤多个零, 通知清除段落末尾的零，例如1000
        return sum + item.replace(/[零]+/g, '零').replace(/零(?=[元万亿])/g, '');
      }, '')
    }
    

    // step 3: 数组合并返回最终结果
    return {
      errCode: 0,
      msg: '',
      value: [
        prefix, 
        integerResult, 
        isInt ? '整' : '',
        _parseDecimal(decimalPart)
      ].join('')
    };
 }

module.exports = formatRMB;