import { createMuiTheme } from '@material-ui/core/styles';

const GREEN = '#009541';
const LIGHT_GREEN = '#46B18E';
const GRAY = '#616161';
const LIGHT_GRAY = '#CCC';
const BLACK = '#141414';

const DARK_GRAY_BG = '#DEDEDE';
const GRAY_BG = '#EFEFEF';

const GRAY_BORDER = '#D1DBE3';
const GRAY_LIGHT = '#BFBFBF';
const GRAY_LIGHTER = '#d1dbe375';

const RED = '#FF6E60';

const FACEBOOK_BLUE = '#3C5A99';
const GOOGLE_RED = '#D34836';

const XXS = '11px';
const XS = '12px';
const SM = '14px';
const MD = '16px';
const MMD = '20px';
const LG = '24px';
const XL = '36px';
const XXL = '48px';

const nXXS = 11;
const nXS = 12;
const nSM = 14;
const nMD = 16;
const nMMD = 20;
const nLG = 24;
const nXL = 36;
const nXXL = 48;

const SPACING_UNIT = 8;
const HEADER_HEIGHT = '64px';
const TOP_HEADER_HEIGHT = '32px';

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
    formTitle: {
      fontSize: MMD,
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 3 * SPACING_UNIT
    },
    formSubtitle: {
      fontSize: MD,
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 2 * SPACING_UNIT
    },
    subtitle: {
      fontSize: MD,
      color: GRAY,
      textAlign: 'center',
      fontWeight: 500,
      lineHeight: MMD
    },
    raizs: {
      fontWeight: 400,
      fontSize: XXL,
      lineHeight: '54px',
      fontFamily: 'raizs',
      textAlign: 'center'
    },
    textEllipsis: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
    },
    textWithLineBehind: {
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
      userSelect: 'none',
      '&:before': {
        borderTop: `2px solid ${GRAY_BORDER}`,
        content: '""',
        margin: '0 auto',
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        bottom: 0,
        width: '95%',
        zIndex: -1
      },
      '& span': {
        background: 'white', 
        padding: '0 8px', 
      }
    }
  },
  fontSizes: { XXS, XS, SM, MD, MMD, LG, XL, XXL, nXXS, nXS, nSM, nMD, nMMD, nLG, nXL, nXXL },
  palette: {
    green: {
      main: GREEN,
      light: LIGHT_GREEN
    },
    gray: {
      main: GRAY,
      bg: GRAY_BG,
      darkBg: DARK_GRAY_BG,
      border: GRAY_BORDER,
      light: GRAY_LIGHT,
      lighter: GRAY_LIGHTER
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
    secondary: {
      backgroundColor: 'white',
      color: GREEN,
      fontSize: MMD,
      fontWeight: 700,
      padding: `${SPACING_UNIT}px ${2 * SPACING_UNIT}px`,
      borderRadius: `${SPACING_UNIT}px`,
      border: `1px solid ${GREEN}`,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'white'
      },
      '& > span': {
        color: GREEN
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
    facebook: {
      height: '32px',
      width: `calc(50% - ${SPACING_UNIT}px)`,
      textAlign: 'center',
      paddingRight: SPACING_UNIT,
      display: 'inline-block',
      backgroundColor: FACEBOOK_BLUE,
      borderRadius: SPACING_UNIT,
      userSelect: 'none',
      cursor: 'pointer',
      marginRight: SPACING_UNIT,
      marginLeft: SPACING_UNIT/2,
      '&:active': {
        boxShadow: '1px 1px 2px 0 #444'
      },
      '& > *': {
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: '32px'
      },
      '& > img': {
        height: '18px',
        width: '18px',
        marginRight: SPACING_UNIT
      },
      '& > p': {
        color: 'white',
        fontSize: MD,
        fontWeight: 500,
      }
    },
    google: {
      height: '32px',
      width: `calc(50% - ${SPACING_UNIT}px)`,
      textAlign: 'center',
      padding: `0 ${SPACING_UNIT}px`,
      display: 'inline-block',
      backgroundColor: GOOGLE_RED,
      borderRadius: SPACING_UNIT,
      userSelect: 'none',
      cursor: 'pointer',
      '&:active': {
        boxShadow: '1px 1px 2px 0 #444'
      },
      '& > *': {
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: '32px'
      },
      '& > img': {
        height: '18px',
        width: '18px',
        marginRight: SPACING_UNIT
      },
      '& > p': {
        color: 'white',
        fontSize: MD,
        fontWeight: 500,
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
      width: `calc(100% - ${2 * SPACING_UNIT}px)`,
      verticalAlign: 'top',
      '& > input': {
        width: '100%',
        height: '48px',
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
      '&.-error > input': {
        border: `1px solid ${RED}`,
        '&:focus, &:active': {
          padding: SPACING_UNIT,
          border: `1px solid ${RED}`,
          outline: 'none'
        }
      },
      '& > div.error': {
        fontSize: XXS,
        color: RED,
        lineHeight: MD
      },
      '& + div.text-input': {
        marginTop: SPACING_UNIT
      }
    },
    radio: {
      userSelect: 'none',
      '& span': {
        fontWeight: 500
      },
      '& svg': {
        fill: GREEN
      }
    },
    checkbox: {
      userSelect: 'none',
      '& span': {
        fontWeight: 700
      },
      '& svg': {
        fill: GRAY
      }
    },
    checkedCheckbox: {
      userSelect: 'none',
      '& span': {
        fontWeight: 700
      },
      '& svg': {
        fill: GREEN
      }
    },
    textSmall: {
      width: `100%`,
      verticalAlign: 'top',
      '& > input': {
        width: '100%',
        height: '32px',
        border: `1px solid ${GRAY_BORDER}`,
        padding: SPACING_UNIT,
        fontSize: SM,
        borderRadius: SPACING_UNIT,
        transition: '.3s',
        '&:focus, &:active': {
          padding: SPACING_UNIT,
          border: `1px solid ${GREEN}`,
          outline: 'none'
        },
      },
      '&.-error > input': {
        border: `1px solid ${RED}`,
        '&:focus, &:active': {
          padding: SPACING_UNIT,
          border: `1px solid ${RED}`,
          outline: 'none'
        }
      },
      '& > div.error': {
        fontSize: XXS,
        color: RED,
        lineHeight: MD
      },
      '& + div.text-input': {
        marginTop: SPACING_UNIT
      }
    },
  },
  sizes: {
    HEADER_HEIGHT,
    TOP_HEADER_HEIGHT
  },
  shape: {
    borderRadius: '8px',
  },
  spacing: {
    unit: SPACING_UNIT
  }
});

export default theme;