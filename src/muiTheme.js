import { createMuiTheme } from '@material-ui/core/styles';

const GREEN = '#009541';
const GRAY = '#616161';
const LIGHT_GRAY = '#CCC';
const BLACK = '#141414';

const GRAY_BG = '#EFEFEF';

const XXS = '11px';
const XS = '12px';
const SM = '14px';
const MD = '16px';
const LG = '24px';
const XL = '36px';

const SPACING_UNIT = 8;
const HEADER_HEIGHT = '64px';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Raleway',
      'sans-serif'
    ].join(','),
    subtitle1: {
      fontSize: XS,
      color: GRAY,
      fontWeight: 700,
    },
    timelineSectionTitle: {
      fontSize: XS,
      color: GREEN,
      fontWeight: 600,
      textAlign: 'center',
      marginBottom: 2 * SPACING_UNIT
    },
    infoText: {
      fontSize: MD,
      color: GRAY,
      fontWeight: 500,
      letterSpacing: 1
    }
  },
  fontSizes: { XXS, XS, SM, MD, LG, XL },
  palette: {
    green: {
      main: GREEN
    },
    gray: {
      main: GRAY,
      bg: GRAY_BG
    },
    grey: {
      main: GRAY,
      bg: GRAY_BG
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
  sizes: {
    HEADER_HEIGHT
  },
  shape: {
    borderRadius: '8px',
  },
  spacing: {
    unit: SPACING_UNIT
  }
});

export default theme;