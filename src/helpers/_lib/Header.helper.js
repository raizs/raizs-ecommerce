import { categories, MORE_CATEGORY_WIDTH } from '../../assets';

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
    let rightContentWidth = document.querySelector('header.app-header div.right-content').clientWidth + 2*D;
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

    let fits = 0, sum = 40;
    categories.forEach((category, index) => {
      if(fits < categories.length && availableCenterWidth > sum + category.width) {
        sum += category.width;
        fits++;
      }
      if(index === length - 1 && fits < length)
        if(sum + MORE_CATEGORY_WIDTH > availableCenterWidth) fits--;
    });
    fits = Math.min(length, fits);

    const more = fits <= length - 1 ? categories.slice(fits - length) : [];
    const toShow = more.length ? categories.slice(0, fits) : categories;

    return { toShow, more };
  }
}