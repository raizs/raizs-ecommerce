export default theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    width: '100%',
    padding: 3 * theme.spacing.unit
  },
  title: theme.typography.bigTitle,
  items: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 4 * theme.spacing.unit
  },
  checkout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 4 * theme.spacing.unit
  }
});