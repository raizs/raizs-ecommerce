export default theme => ({
  group: {
    borderTop: `1px solid ${theme.palette.gray.border}`,
    '&:first-child': {
      borderTop: 'none'
    }
  },
  title: {
    fontSize: theme.fontSizes.SM,
    fontWeight: 700,
    cursor: 'pointer',
    padding: `${2 * theme.spacing.unit}px 0`,
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      lineHeight: theme.fontSizes.MD
    }

  },
  subtitle: {
    fontSize: theme.fontSizes.XS,
    color: theme.palette.gray.main,
    fontWeight: 500,
    marginBottom: theme.spacing.unit,
    cursor: 'pointer',
    '&:hover a': {
      color: theme.palette.green.main
    }
  }
});