export default theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    backgroundColor: 'transparent',
    padding: `0 ${theme.spacing.unit * 2}px`,
    fontSize: theme.fontSizes.XS,
    fontWeight: 700,
    height: theme.sizes.HEADER_HEIGHT,
    '& span': {
      color: theme.palette.gray.main
    },
    '&:hover': {
      backgroundColor: 'transparent',
      '& span': {
        color: theme.palette.green.main
      }
    },
  },
});