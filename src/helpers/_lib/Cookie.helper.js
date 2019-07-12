export class CookieHelper {
  static parse() {
    const cookies = document.cookies || '';

    return cookies.split('; ').map(c => ({ [c.split('=')[0]]: c.split('=')[1] }));
  }
}