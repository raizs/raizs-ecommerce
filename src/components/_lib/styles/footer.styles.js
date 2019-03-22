export default ({ spacing, palette, fontSizes }) => ({
  wrapper: {
    padding: `${3 * spacing.unit}px`,
    borderTop: `1px solid ${palette.lightGray.main}`,
    '& *': {
      color: palette.gray.main
    }
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'center',
    margin: `${2 * spacing.unit}px 0`,
    '& *': {
      userSelect: 'none'
    },
    '& div.list': {
      margin: `${3 * spacing.unit}px ${4 * spacing.unit}px`,
      '& > div': {
        fontSize: fontSizes.SM,
        marginBottom: `${3 * spacing.unit}px`
      },
      '& div.title': {
        fontWeight: 700,
        cursor: 'default'
      },
      '& div.item': {
        cursor: 'pointer',
        '&:hover': {
          color: palette.green.main
        }
      },
      '& div.icons-wrapper': {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          display: 'inline-block',
          flex: '1 0 27%'
        }
      }
    }
  },
  bottomInfo: {
    paddingTop: `${2 * spacing.unit}px`,
    borderTop: `1px solid ${palette.lightGray.main}`,
    '& > div': {
      color: palette.black.main,
      fontSize: fontSizes.XXS,
      textAlign: 'center',
      lineHeight: fontSizes.XS
    }
  }
});