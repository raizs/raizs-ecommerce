import { createMuiTheme } from '@material-ui/core/styles';

const GREEN = '#009541';
const GRAY = '#616161';
const LIGHT_GRAY = '#CCC';
const BLACK = '#141414';

const XXS = '10px';
const XS = '12px';
const SM = '14px';
const MD = '16px';
const LG = '24px';
const XL = '36px';

const HEADER_HEIGHT = '64px';

const SPACING_UNIT = 8;

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Raleway',
      'sans-serif'
    ].join(','),
    subtitle1: {
      fontSize: '12px',
      color: '#616161',
      fontWeight: 700,
    },
  },
  fontSizes: {
    XXS,
    XS,
    SM,
    MD,
    LG,
    XL
  },
  palette: {
    green: {
      main: GREEN
    },
    gray: {
      main: GRAY
    },
    grey: {
      main: GRAY
    },
    lightGray: {
      main: LIGHT_GRAY
    },
    black: {
      main: BLACK
    }
  },
  buttons: {
    primary: {
      backgroundColor: GREEN,
      color: 'white',
      fontSize: SM,
      fontWeight: 700,
      padding: `${SPACING_UNIT}px ${2 * SPACING_UNIT}px`,
      borderRadius: `${SPACING_UNIT}px`,
      cursor: 'pointer'
    },
    header: {
      backgroundColor: 'transparent',
      padding: `0 ${2 * SPACING_UNIT}px`,
      height: HEADER_HEIGHT,
      cursor: 'pointer',
      fontSize: XS,
      fontWeight: 700,
      '& span' : {
        color: GRAY,
      },
      '& div.label *': {
        fontSize: XS,
        fontWeight: 700,
        color: GRAY
      },
      '&:hover': {
        backgroundColor: 'transparent',
        '& span, & div': {
          color: GREEN
        },
        '& svg': {
          fill: GREEN
        }
      }
    }
  },
  shape: {
    borderRadius: '8px',
  },
  sizes: {
    HEADER_HEIGHT,
  },
  spacing: {
    unit: SPACING_UNIT
  }
});

export default theme;