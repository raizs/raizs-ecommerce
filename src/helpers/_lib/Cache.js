export default class Cache {
  static setItem(key, value) {
    console.log("VALUE",value);
    value = JSON.stringify(value);
    window.localStorage && window.localStorage.setItem(key, value);
  }

  static getItem(key) {
    const item = window.localStorage && window.localStorage.getItem(key);
    if (typeof item == "object")
      return JSON.parse(item);
    return null
  }

  static removeItem(key) {
    window.localStorage && window.localStorage.removeItem(key);
  }
}