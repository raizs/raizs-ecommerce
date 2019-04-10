import { createMuiTheme } from '@material-ui/core/styles';

const GREEN = '#009541';
const GRAY = '#616161';
const LIGHT_GRAY = '#CCC';
const BLACK = '#141414';

const GRAY_BG = '#EFEFEF';

const GRAY_BORDER = '#D1DBE3';

const RED = '#FF6E60';

const FACEBOOK_BLUE = '#3C5A99';
const GOOGLE_RED = '#D34836';

const XXS = '11px';
const XS = '12px';
const SM = '14px';
const MD = '16px';
const LG = '24px';
const XL = '36px';

const nXXS = 11;
const nXS = 12;
const nSM = 14;
const nMD = 16;
const nLG = 24;
const nXL = 36;

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
      letterSpacing: '1px',
      lineHeight: `${nMD + SPACING_UNIT/2}px`,
      whiteSpace: 'pre-wrap'
    },
    bigTitle: {
      fontSize: XL,
      fontWeight: 700,
      lineHeight: `${nXL + SPACING_UNIT/2}px`,
      textAlign: 'center'
    },
    textEllipsis: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
    }
  },
  fontSizes: { XXS, XS, SM, MD, LG, XL, nXXS, nXS, nSM, nMD, nLG, nXL },
  palette: {
    green: {
      main: GREEN
    },
    gray: {
      main: GRAY,
      bg: GRAY_BG,
      border: GRAY_BORDER
    },
    grey: {
      main: GRAY,
      bg: GRAY_BG,
      border: GRAY_BORDER
    },
    lightGray: {
      main: LIGHT_GRAY
    },
    black: {
      main: BLACK
    },
    facebook: FACEBOOK_BLUE,
    google: GOOGLE_RED,
    red: RED
  },
  buttons: {
    primary: {
      backgroundColor: GREEN,
      color: 'white',
      fontSize: SM,
      fontWeight: 700,
      padding: `${SPACING_UNIT}px ${2 * SPACING_UNIT}px`,
      borderRadius: `${SPACING_UNIT}px`,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: GREEN
      },
      '& > span': {
        color: 'white'
      }
    },
    error: {
      backgroundColor: RED,
      color: 'white',
      fontSize: SM,
      fontWeight: 700,
      padding: `${SPACING_UNIT}px ${2 * SPACING_UNIT}px`,
      borderRadius: `${SPACING_UNIT}px`,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: RED
      },
      '& > span': {
        color: 'white'
      }
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
  inputs: {
    text: {
      height: '48px',
      width: `calc(100% - ${2 * SPACING_UNIT}px)`,
      border: `1px solid ${GRAY_BORDER}`,
      padding: SPACING_UNIT,
      fontSize: MD,
      borderRadius: SPACING_UNIT,
      transition: '.3s',
      '&:focus, &:active': {
        padding: SPACING_UNIT,
        border: `1px solid ${GREEN}`,
        outline: 'none'
      },
    },
    small: {
      fontSize: SM,
      height: '36px'
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