export const MIN_ROW_HEIGHT = 336;
export const MIN_PRODUCT_HEIGHT = 320;

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
  },
  product: {
    width: '256px',
    minHeight: `${MIN_PRODUCT_HEIGHT}px`,
    backgroundColor: 'white',
    display: 'inline-block',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit
  }
});
