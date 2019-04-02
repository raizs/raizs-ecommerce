export default class Cache {
  static setItem(key, value) {
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
  }

  static getItem(key) {
    const item = window.localStorage.getItem(key);

    return JSON.parse(item);
  }
}