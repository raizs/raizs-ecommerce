export class SliderHelper {
  static clientCommentsCenterPadding(windowWidth, itemWidth) {
    const MIN_DISTANCE = 32;

    return `${Math.round(windowWidth/((windowWidth/(itemWidth + 2 * MIN_DISTANCE)) > 3 ? 3 : 5))}px`;
  }

  static mediaCenterPadding(windowWidth, itemWidth) {
    const MIN_DISTANCE = 32;

    return `${Math.round(windowWidth/((windowWidth/(itemWidth + 2 * MIN_DISTANCE)) > 3 ? 3 : 5))}px`;
  }
}