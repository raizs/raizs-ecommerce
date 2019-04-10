export const MIN_PRODUCT_HEIGHT = 320;

export default theme => ({
  wrapper: {
    width: '256px',
    minHeight: `${MIN_PRODUCT_HEIGHT}px`,
    backgroundColor: 'white',
    display: 'inline-block',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit/2,
    borderRadius: theme.spacing.unit
  },
  imageWrapper: {
    position: 'relative',
    height: '224px',
    width: '248px',
    '& div.quantity-selector': {
      position: 'absolute',
      bottom: theme.spacing.unit,
      right: theme.spacing.unit
    }
  },
  image: {
    '& img': {
      borderRadius: theme.spacing.unit
    }
  },
  brand: {
    color: theme.palette.gray.main,
    fontSize: theme.fontSizes.XS,
    fontWeight: 500,
    margin: `${theme.spacing.unit / 2}px 0`
  },
  name: {
    ...theme.typography.textEllipsis,
    height: '1.125em',
    fontWeight: 600,
    fontSize: theme.fontSizes.MD,
    marginTop: theme.spacing.unit
  },
  price: {
    fontWeight: 600,
    fontSize: theme.fontSizes.SM,
    marginTop: theme.spacing.unit/2,
    color: theme.palette.gray.main
  }
});