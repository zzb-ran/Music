function moment(timeVaule) {
  var year = new Date(timeVaule).getFullYear();
  var month =
    new Date(timeVaule).getMonth() > 9
      ? new Date(timeVaule).getMonth()
      : `0${new Date(timeVaule).getMonth()}`;
  var date =
    new Date(timeVaule).getDate() > 9
      ? new Date(timeVaule).getDate()
      : `0${new Date(timeVaule).getDate()}`;
  return `${year}-${month}-${date}`;
}

export default moment;
