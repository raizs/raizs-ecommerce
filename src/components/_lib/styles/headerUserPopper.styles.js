export default theme => ({
  wrapper: {
    maxWidth: '230px'
  },
  menuItem: {
    marginBottom: 2 * theme.spacing.unit,
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
    },
    '&:last-child': {
      marginBottom: 0
    }
  },
  top: {
    '& > *': {
      display: 'inline-block',
      marginBottom: 2 * theme.spacing.unit
    }
  },
  facebookButton: {
    height: '32px',
    width: `calc(50% - ${theme.spacing.unit}px)`,
    textAlign: 'center',
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.facebook,
    borderRadius: theme.spacing.unit,
    userSelect: 'none',
    cursor: 'pointer',
    marginRight: theme.spacing.unit,
    '&:active': {
      boxShadow: '1px 1px 2px 0 #444'
    },
    '& > *': {
      display: 'inline-block',
      verticalAlign: 'top'
    },
    '& > img': {
      height: '18px',
      width: '18px',
      marginRight: theme.spacing.unit
    },
    '& > p': {
      color: 'white',
      fontWeight: 600,
    }
  },
  googleButton: {
    height: '32px',
    width: `calc(50% - ${theme.spacing.unit}px)`,
    textAlign: 'center',
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.google,
    borderRadius: theme.spacing.unit,
    userSelect: 'none',
    cursor: 'pointer',
    '&:active': {
      boxShadow: '1px 1px 2px 0 #444'
    },
    '& > *': {
      display: 'inline-block',
      verticalAlign: 'top'
    },
    '& > img': {
      height: '18px',
      width: '18px',
      marginRight: theme.spacing.unit
    },
    '& > p': {
      color: 'white',
      fontWeight: 600,
    }
  },
  textInput: {
    ...theme.inputs.text,
    ...theme.inputs.small,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    '&:focus': {
      marginLeft: 0,
      marginRight: 0,
    }
  },
  forgotPassword: {
    fontSize: theme.fontSizes.XS,
    color: theme.palette.gray.main,
    textAlign: 'center',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.green.main
    }
  },
  loginButton: {
    ...theme.buttons.primary,
    width: '100%',
    marginTop: 2 * theme.spacing.unit
  },
  infoText: {
    ...theme.typography.infoText,
    letterSpacing: 0,
    textAlign: 'center',
    marginTop: 3 * theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  register: {
    textAlign: 'center',
    color: theme.palette.green.main,
    textDecoration: 'underline',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: theme.fontSizes.SM
  }
});
