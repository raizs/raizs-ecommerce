export default theme => ({
  wrapper: {
    width: '100%',
    maxWidth: '1100px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  box: {
    width: '100%',
    maxWidth: '360px'
  },
  subtotalAndMinimumValue: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'right'
  },
  label: {
    fontSize: theme.fontSizes.XS,
    fontWeight: 600
  },
  value: {
    color: theme.palette.gray.main,
    fontWeight: 500,
    '&.error': {
      color: theme.palette.red
    }
  },
  info: {
    color: theme.palette.gray.main,
    fontSize: theme.fontSizes.XS,
    fontWeight: 500
  },
  cepSuccess: {
    marginTop: theme.spacing.unit
  },
  greenCep: {
    color: theme.palette.green.main,
    textDecoration: 'underline'
  },
  errorText: {
    color: theme.palette.red,
    fontSize: theme.fontSizes.XS,
    fontWeight: 500,
    marginTop: theme.spacing.unit / 2
  },
  shipping: {
    marginTop: 3 * theme.spacing.unit
  },
  input: {
    ...theme.inputs.text,
    width: '200px',
    marginTop: theme.spacing.unit,
    '&:focus, &:active': {
      marginTop: theme.spacing.unit,
      padding: theme.spacing.unit,
      border: `1px solid ${theme.palette.green.main}`,
      outline: 'none'
    }
  },
  successButton: {
    ...theme.buttons.primary,
    width: '100%',
    fontSize: theme.fontSizes.LG,
    marginTop: 3 * theme.spacing.unit
  },
  errorButton: {
    ...theme.buttons.error,
    width: '100%',
    fontSize: theme.fontSizes.LG,
    marginTop: 3 * theme.spacing.unit
  }
});