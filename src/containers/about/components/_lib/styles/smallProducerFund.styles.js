export default theme => ({
  wrapper: {
    padding: `0 ${2 * theme.spacing.unit}px`
  },
  title: {
    ...theme.typography.timelineSectionTitle,
  },
  bigTitle: {
    ...theme.typography.bigTitle
  },
  content: {
    margin: `${6 * theme.spacing.unit}px 0 ${15 * theme.spacing.unit}px 0`,
    '& > div, > p': {
      width: '50%',
      display: 'inline-block',
      verticalAlign: 'middle',
      padding: `0 ${2 * theme.spacing.unit}px`
    }
  },
  info: {
    ...theme.typography.infoText,
  },
  player: {
    backgroundColor: 'transparent !important'
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, .5) !important',
    height: '64px !important',
    width: '64px !important',
    top: '0 !important',
    bottom: '0 !important',
    left: '0 !important',
    right: '0 !important',
    margin: 'auto !important',
    borderRadius: '50% !important',
    borderWidth: '0 !important',
    '&:before': {
      fontSize: '48px',
      marginTop: '10px'
    }
  },
  toRemove: {
    width: `calc(100% + ${5 * theme.spacing.unit}px)`,
    height: '330px',
    backgroundColor: theme.palette.green.main
  }
});
