function rd(arr) {
    var $length = arr.length - 1,
      $index,
      $temp;
    for (var i = $length; i >= 0; i--) {
      $index = Math.floor(Math.random() * $length);
      $temp = arr[$index];
      arr[$index] = arr[i];
      arr[i] = $temp;
    }
    return arr
}
export {
    rd
}