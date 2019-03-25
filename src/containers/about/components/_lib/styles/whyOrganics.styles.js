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
    margin: `${6 * theme.spacing.unit}px 0`,
  },
  top: {
    width: '33.3333%',
    marginLeft: '33.3333%'
  },
  bottom: {
    '& > div': {
      display: 'inline-block',
      width: '33.3333%',
      verticalAlign: 'middle'
    }
  },
  card: {
    textAlign: 'center',
    padding: `${4 * theme.spacing.unit}px ${2 * theme.spacing.unit}px`,
    '& h3': {
      fontSize: theme.fontSizes.LG,
      fontWeight: 700,
    },
    '& > p': {
      ...theme.typography.infoText
    },
    '& div.icon-text': {
      marginBottom: 2 * theme.spacing.unit,
      '& > *': {
        display: 'inline-block',
        verticalAlign: 'middle'
      }
    }
  },
  image: {
    backgroundImage: 'url("http://www.revistacodigos.com/wp-content/uploads/2018/10/comidaorganica.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '500px'
  }
});
