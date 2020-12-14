export function formatDate(date, fmt) {
  // 1.获取年份
  // y+
  // yy -19
  //  y+ 1个或者多个y
  // y* 0个或这个多个y
  // y? 0 个或者1个
  // yyyy -2019
  // y  -9
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2获取
  // M+ 正则表达式中的一个规则
  let o = {
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+': date.getHours(),  //h 和 H ,h是12小时制，H是24小时制
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };
  for ( let k in o) {
    if(new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length=== 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
// 不足两位自动补足两位
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
};