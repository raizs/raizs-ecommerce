export class HeaderHelper {
  static getWidths() {
    const windowWidth = window.innerWidth;
    const logoWidth = document.querySelector('header.app-header img.logo').clientWidth;
    const rightContentWidth = document.querySelector('header.app-header div.right-content').clientWidth;
    const availableCenterWidth = windowWidth - logoWidth - rightContentWidth;

    return { windowWidth, logoWidth, rightContentWidth, availableCenterWidth };
  }
}