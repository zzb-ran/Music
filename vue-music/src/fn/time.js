function timeUp(time) {
  time = time / 1000;
  let hour = Math.floor(time / 60 / 60);
  let min = Math.floor((time - 60 * hour) / 60);
  let sec = Math.floor(time - hour * 60 - min * 60);
  let hours = hour <= 9 ? `0${hour}` : hour;
  let mins = min <= 9 ? `0${min}` : min;
  let secs = sec <= 9 ? `0${sec}` : sec;
  if (hour < 1) {
    return `${mins}:${secs}`;
  } else {
    return `${hours}:${mins}:${secs}`;
  }
}

function week(wk) {
  var day;
  switch (wk) {
    case 0:
      day = "星期日";
      break;
    case 1:
      day = "星期一";
      break;
    case 2:
      day = "星期二";
      break;
    case 3:
      day = "星期三";
      break;
    case 4:
      day = "星期四";
      break;
    case 5:
      day = "星期五";
      break;
    case 6:
      day = "星期六";
  }
  return day;
}

export { timeUp, week };
