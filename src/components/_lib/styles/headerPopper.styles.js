export default theme => ({
  subcategories: {
    padding: theme.spacing.unit,
    '&#grocery': {
      columns: '2 150px'
    },
    verticalAlign: 'top',
    display: 'inline-block'
  },
  subcategory: {
    marginBottom: 3 * theme.spacing.unit,
    fontSize: theme.fontSizes.MD,
    color: theme.palette.gray.main,
    cursor: 'pointer',
    '&:hover': {
      fontWeight: 700
    },
    '&:after': {
      display: 'block',
      content: 'attr(title)',
      fontWeight: 700,
      height: 0,
      overflow: 'hidden',
      visibility: 'hidden'
    }
  },
  moreInfo: {
    display: 'inline-block',
    maxWidth: '170px',
    textAlign: 'center',
    '& div.image': {
      height: '170px',
      width: '170px',
      verticalAlign: 'top',
      display: 'inline-block'
    },
    '& div.title': {
      fontWeight: 700,
      color: theme.palette.black.main,
      fontSize: theme.fontSizes.MD,
      margin: `${2 * theme.spacing.unit}px 0`,
      textAlign: 'center'
    },
    '& div.description': {
      color: theme.palette.gray.main,
      fontSize: theme.fontSizes.XS,
      textAlign: 'center'
    }
  },
  moreInfoButton: {
    ...theme.buttons.primary,
    marginTop: `${2 * theme.spacing.unit}px`,
    display: 'inline-block'
  }
});
