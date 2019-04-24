const CONTENT_MAX_WIDTH = 1100;

export default theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    width: '100%',
    padding: 3 * theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: theme.typography.bigTitle,
  content: {
    marginTop: 8 * theme.spacing.unit,
    width: '100%',
    maxWidth: `${CONTENT_MAX_WIDTH}px`,
    '& > div': {
      display: 'inline-block',
      verticalAlign: 'top'
    }
  },
  info: {
    width: `calc(66% - ${2 * theme.spacing.unit}px)`,
    marginRight: 2 * theme.spacing.unit
  },
  summary: {
    width: `calc(33% - ${2 * theme.spacing.unit}px)`,
    marginLeft: 2 * theme.spacing.unit
  },
  button: {
    ...theme.buttons.primary,
    fontSize: theme.fontSizes.LG,
    marginTop: 3 * theme.spacing.unit
  }
});