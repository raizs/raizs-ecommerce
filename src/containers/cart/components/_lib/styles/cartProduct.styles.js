export const LIST_PRODUCT_HEIGHT = 72;
const LIST_PRODUCT_HEIGHT_PX = '72px';

export default theme => ({
  wrapper: {
    width: '100%',
    maxWidth: '1110px',
    height: LIST_PRODUCT_HEIGHT_PX,
    backgroundColor: 'white',
    marginBottom: theme.spacing.unit,
    borderRadius: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageAndInfo: {
    display: 'flex',
    width: '30%'
  },
  imageWrapper: {
    position: 'relative',
    height: LIST_PRODUCT_HEIGHT_PX,
    width: LIST_PRODUCT_HEIGHT_PX
  },
  image: {
    '& img': {
      borderRadius: theme.spacing.unit
    }
  },
  nameAndPrice: {
    padding: `0 ${2 * theme.spacing.unit}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '100%'
  },
  name: {
    ...theme.typography.textEllipsis,
    maxWidth: '100%',
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
  },
  partialPriceAndClose: {
    height: '100%',
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px ${theme.spacing.unit / 2}px 0`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  partialPrice: {
    fontSize: theme.fontSizes.SM,
    color: theme.palette.gray.main,
    fontWeight: 500
  },
});