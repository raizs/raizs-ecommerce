export default theme => ({
  wrapper: {
    padding: `0 ${2 * theme.spacing.unit}px`,
    maxHeight: '90vh'
  },
  title: {
    ...theme.typography.timelineSectionTitle,
    paddingTop: 4 * theme.spacing.unit
  },
  info: {
    ...theme.typography.infoText,
    textAlign: 'center',
    margin: `${5 * theme.spacing.unit}px 0`,
  },
  player: {
    backgroundColor: 'transparent !important'
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, .5) !important',
    height: '100px !important',
    width: '100px !important',
    top: '0 !important',
    bottom: '0 !important',
    left: '0 !important',
    right: '0 !important',
    margin: 'auto !important',
    borderRadius: '50% !important',
    borderWidth: '0 !important',
    '&:before': {
      fontSize: '80px',
      marginTop: '28px'
    }
  },
  expand: {
    cursor: 'pointer',
    fontSize: 48
  }
});
