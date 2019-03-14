import { categories } from "../../assets";

const CATEGORY_AVERAGE_WIDTH = 140; // px
const D = 8; // px

export class HeaderHelper {

  /**
   * getWidths - Function that calculates the available width - based in
   * the window, logo and right content widths - in the Header component to
   * render items
   * 
   * @returns {Object} - Contains the window width and the availiable center width
   */
  static getWidths() {
    const windowWidth = window.innerWidth;
    const logoWidth = document.querySelector('header.app-header img.logo').clientWidth;
    let rightContentWidth = document.querySelector('header.app-header div.right-content').clientWidth;
    rightContentWidth += 2*D; // margin
    const availableCenterWidth = windowWidth - logoWidth - rightContentWidth;

    return { windowWidth, availableCenterWidth };
  }

  /**
   * handleCategoryOptions - Function to separate which categories should be
   * shown and which should be grouped
   *
   * @param {Number} availableCenterWidth - Available width in pixels
   * @returns {Object} - Contains the separated categories in 'toShow' and 'more' fields
   */
  static handleCategoryOptions(availableCenterWidth) {
    const { length } = categories;

    let fits = Math.floor(availableCenterWidth / CATEGORY_AVERAGE_WIDTH);
    fits = Math.min(length, fits);

    const toShow = categories.slice(0, fits);
    const more = fits === length ? [] : categories.slice(fits - length);

    return { toShow, more };
  }
}