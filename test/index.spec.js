const formatRMB = require('../dist/index');

test('小数-两位-整数为0', ()=>{
  const num = 0.56;
  let res = formatRMB(num)
  expect(res.value).toBe('人民币伍角陆分')
})

test('小数-两位', ()=>{
  const num = 1234.56;
  let res = formatRMB(num)
  expect(res.value).toBe('人民币壹仟贰佰叁拾肆元伍角陆分')
})

test('小数-角', ()=>{
  const num = 123412341234.5;
  let res = formatRMB(num)
  expect(res.value).toBe('人民币壹仟贰佰叁拾肆亿壹仟贰佰叁拾肆万壹仟贰佰叁拾肆元伍角')
})

test('小数-分', ()=>{
  const num = 123412341234.06;
  let res = formatRMB(num)
  expect(res.value).toBe('人民币壹仟贰佰叁拾肆亿壹仟贰佰叁拾肆万壹仟贰佰叁拾肆元零陆分')
})

test('整数', ()=>{
  const num = 1234567890;
  let res = formatRMB(num)
  expect(res.value).toBe('人民币壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾元整')
})

test('整数-零', ()=>{
  const num = 0;
  let res = formatRMB(num)
  expect(res.value).toBe('人民币零元整')
})

test('整数-间隔零', ()=>{
  const num = 1002;
  let res = formatRMB(num)
  expect(res.value).toBe('人民币壹仟零贰元整')
})

test('整数-全部零', ()=>{
  const num = 1000;
  let res = formatRMB(num)
  expect(res.value).toBe('人民币壹仟元整')
})

test('整数-壹万', ()=>{
  const num = 10000;
  let res = formatRMB(num)
  expect(res.value).toBe('人民币壹万元整')
})

test('整数-壹亿', ()=>{
  const num = 100000000;
  let res = formatRMB(num)
  expect(res.value).toBe('人民币壹亿元整')
})

test('前缀', ()=>{
  const num = 1000;
  let res = formatRMB(num, '$')
  expect(res.value).toBe('$壹仟元整')
})

test('负数', ()=>{
  const num = -1000;
  let res = formatRMB(num)
  expect(res.errCode).toBe(3)
})