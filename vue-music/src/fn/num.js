function Num(num) {
  var updateNum,
    numLength = num.toString().length;
  if (numLength >= 5 && numLength < 9) {
    updateNum = (num / 10000).toFixed(1) + "万";
  } else if (numLength >= 9) {
    updateNum = (num / 100000000).toFixed(1) + "亿";
  }
  return updateNum;
}

export default Num;
