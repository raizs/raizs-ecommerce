export const TIMELINE_MAX_WIDTH = 256;
const TIMELINE_LINE_HEIGHT = 4;
const TIMELINE_LINE_WIDTH = 80;

export default ({ fontSizes, palette, sizes, spacing }) => ({
  wrapper: {
    width: '25%',
    maxWidth: TIMELINE_MAX_WIDTH,
    maxHeight: '100vh',
    overflowY: 'auto',
    display: 'inline-block',
    height: '100%',
    verticalAlign: 'top',
    padding: `${4 * spacing.unit}px ${2 * spacing.unit}px ${2 * spacing.unit}px ${3 * spacing.unit}px`,
    '& *': {
      userSelect: 'none'
    }
  },
  title: {
    marginBottom: 3 * spacing.unit,
    fontSize: fontSizes.SM,
    fontWeight: 600,
    cursor: 'default',
  },
  line: {
    height: TIMELINE_LINE_HEIGHT,
    backgroundColor: palette.green.main,
    width: TIMELINE_LINE_WIDTH,
    marginBottom: 3 * spacing.unit
  },
  item: {
    marginBottom: 2 * spacing.unit,
    color: palette.gray.main,
    fontWeight: 600,
    fontSize: fontSizes.XS,
    cursor: 'pointer',
    display: 'block',
    '&:hover': {
      color: palette.green.main
    }
  },
  sections: {
    padding: `${2 * spacing.unit}px 0`,
    display: 'inline-block',
  },
  section: {
    padding: 2 * spacing.unit,
    marginTop: 8 * spacing.unit,
    '&:first-child': {
      marginTop: 2 * spacing.unit
    }
  }
});