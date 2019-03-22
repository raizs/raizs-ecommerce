export default theme => ({
  button: theme.buttons.header,
  menuItem: {
    '& span': {
      color: theme.palette.green.main
    },
    '& li': {
      color: theme.palette.gray.main
    }
  }
});