function setItem(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function getItem(key) {
  if (JSON.parse(localStorage.getItem(key))) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return;
  }
}

function removeItem(key) {
  if (key) {
    localStorage.removeItem(key)
  } else {
    return
  }
}

export { setItem, getItem, removeItem };
