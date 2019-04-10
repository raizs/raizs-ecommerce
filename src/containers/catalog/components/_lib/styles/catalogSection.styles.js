export const MIN_ROW_HEIGHT = 336;

export default theme => ({
  wrapper: {
  },
  row: {
    minHeight: `${MIN_ROW_HEIGHT}px`,
    '& > *': {
      verticalAlign: 'middle'
    }
  },
  title: {
    padding: `${theme.spacing.unit}px 0`
  }
});
