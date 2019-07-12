/**
 * 人民币大写规则：
 *  1.银行、单位和个人填写的各种票据和结算凭证是办理支付结算和现金收付的重要依据，直接关系到支付结算的准确、及时和安全。票据和结算凭证是银行、单位和个人凭以记载账务的会计凭证，是记载经济业务和明确经济责任的一种书面证明。
 * 因此，填写票据和结算凭证，必须做到标准化、规范化，要要素齐全、数字正确、字迹清晰、不错漏、不潦草，防止涂改。中文大写金额数字应用正楷或行书填写。
 * 如：壹（壹）、贰（贰）、叁、肆（肆）、伍（伍）、陆（陆）、柒、捌、玖、拾、佰、仟、万（万）、亿、元、角、分、零、整（正）等字样。不得用一、二（两）、三、四、五、六、七、八、九、十、念、毛、另（或0）填写，不得自造简化字。
 * （如果金额数字书写中使用繁体字，如贰、陆、亿、万、圆的，也应受理。）
 * 
 *  2.中文大写金额数字到“元”为止的，在“元”之后，应写“整”（或“正”）字，在“角”之后，可以不写“整”（或“正”）字。大写金额数字有“分”的，“分”后面不写“整”（或“正”）字。
 *  
 *  3.中文大写金额数字前应标明“人民币”字样，大写金额数字有“分”的，“分”后面不写“整”（或“正”）字。
 * 
 *  4.中文大写金额数字前应标明“人民币”字样，大写金额数字应紧接“人民币”字样填写，不得留有空白。
 * 大写金额数字前未印印“人民币”字样的，应加填“人民币”三字。在票据和结算凭证大写金额栏内不得预印固定的“仟、佰、拾、万、仟、佰、拾、元、角、分”字样。
 * 阿拉伯数字小写金额数字中有“0”时，中文大写应按照汉语语言规律、金额数字构成和防止涂改的要求进行书写。
 * 举例如下：
 * ① 阿拉伯数字中间有“0”时，中文大写要写“零”字，如￥1409.50，应写成人民币陆壹仟肆佰零玖元伍角。
 * ② 阿拉伯数字中间连续有几个“0″时，中文大写金额中间可以只写一个“零”字，如￥6007.14，应写成人民币陆仟零柒元壹角肆分。
 * ③ 阿拉伯金额数字万位和元位是“0″，或者数字中间连续有几个“0″，万位、元位也是“0″，但千位、角位不是“0″时，中文大写金额中可以只写一个零字，也可以不写“零”字。
 * 如￥1680.32，应写成人民币壹仟陆佰捌拾元零叁角贰分，或者写成人民币壹仟陆佰捌拾元叁角贰分。
 * 又如￥107000.53，应写成人民币壹拾万柒仟元零伍角叁分，或者写成人民币壹拾万零柒仟元伍角叁分。
 * ④ 阿拉伯金额数字角位是"0"，而分位不是"0"时，中文大写金额“元”后面应写：“零”字。如￥16409.02，应写成人民币壹万陆仟肆佰零玖元零贰分；又如￥325.04，应写成人民币叁佰贰拾伍元零肆分。
 * ⑤ 阿拉伯小写金额数字前面，均应填写人民币符号“￥”。阿拉伯小写金额数字要认真填写，不得连写分辨不清。
 * 票据的出票日期必须使用中文大写。为防止变造票据的出票日期，在填写月、日时，月为壹、贰和壹拾的，日为壹至玖和壹拾、贰拾和叁拾的，应在其前加“零”；日为拾壹至拾玖的，应在其前加“壹”。如1月15日，应写成零壹月壹拾伍日。再如10月20日，应写成零壹拾月零贰拾日。
 * 票据出票日期使用小写填写的，银行不予受理。大写日期未按要求规范填写的，银行可予受理，但由此造成损失的，由出票人自行承担。
 */

 const DigitalList = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"]
 const TailSepartorLabel = ['元', '万', '亿']
 const MiddleSepartorLabel = ['', '拾', '佰', '仟']

 /**
  * 分段替换数字
  * @param {string} segment 
  * @param {number} unitIdx 
  */
function _interpolateUnit(segment, unitIdx){
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
    const integerResult = integerList.map((segment, idx) => {
      return _interpolateUnit(segment, integerList.length - idx - 1);
    }).reduce((sum, item) => {
      // 过滤多个零, 通知清除段落末尾的零，例如1000
      return sum + item.replace(/[零]+/g, '零').replace(/零(?=[元万亿])/g, '');
    }, '')

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
