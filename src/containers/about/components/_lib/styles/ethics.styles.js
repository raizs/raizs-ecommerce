export default theme => ({
  wrapper: {
    padding: `0 ${2 * theme.spacing.unit}px`
  },
  title: {
    ...theme.typography.timelineSectionTitle,
  },
  bigTitle: {
    ...theme.typography.bigTitle,
    marginBottom: 2 * theme.spacing.unit
  },
  content: {
    margin: `${6 * theme.spacing.unit}px 0`,
  },
  info: {
    ...theme.typography.infoText,
    textAlign: 'center'
  }
});
