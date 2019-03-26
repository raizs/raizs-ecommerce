export default theme => ({
  headerButton: theme.buttons.header,
  rightContent: {
    position: 'relative',
    float: 'right',
    padding: `0 ${2 * theme.spacing.unit}px`,
    height: theme.sizes.HEADER_HEIGHT,
    lineHeight: theme.sizes.HEADER_HEIGHT,
    '&::after': {
      position: 'absolute',
      left: 0,
      top: '8px',
      height: '48px',
      width: '1px',
      backgroundColor: theme.palette.gray.main,
      content: '""'
    },
    '& > *': {
      display: 'inline-block',
      verticalAlign: 'middle',
      margin: `0 ${theme.spacing.unit}px`,
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.green.main,

      }
    }
  },
  headerIcon: {
    height: 48,
    width: 48,
    verticalAlign: 'middle'
  }
});
