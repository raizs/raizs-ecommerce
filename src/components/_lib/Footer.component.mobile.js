import React from 'react'
import { withStyles } from '@material-ui/core';

import { footerListAssets, footerIconAssets, footerCopyrights, footerBottomText } from '../../assets';
import ReactSVG from 'react-svg';

const styles = ({ spacing, palette, fontSizes }) => ({
  wrapper: {
    padding: `${3 * spacing.unit}px`,
    backgroundColor: 'white',
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
        '& > .icon': {
          display: 'inline-block',
          marginRight: spacing.unit,
          flex: '1 0 27%',
          marginBottom: spacing.unit,
          cursor: 'pointer',
          '& *': {
            height: 24,
            width: 24,
          },
          '&:hover *': {
            stroke: `${palette.green.main} !important`,
            fill: `${palette.green.main} !important`
          }
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

/**
 * _renderList - Renders list of label items with individual click actions
 *
 * @param {String} title - The title of the list
 * @param {Array} items - Array of items as described in the assets file
 * @param {Object} history - Router history object
 * @returns {JSX}
 */
const _renderList = ({ title, items }, history) => {
  return (
    <div className='list'>
      <div className='title'>{title}</div>
      {items.map(item => (
        <div className='item' key={item.id} onClick={() => history.push(item.url)}>
          {item.label}
        </div>
      ))}
    </div>
  );
};

/**
 * _renderIconsList - Renders list of icon items with individual click actions
 *
 * @param {String} title - The title of the list
 * @param {Array} items - Array of icon items as described in the assets file
 * @returns {JSX}
 */
const _renderIconsList = ({ title, items }) => {
  return (
    <div className='list'>
      <div className='title'>{title}</div>
      <div className='icons-wrapper'>
        {items.map(item =>
          <ReactSVG
            key={item.id}
            className='icon'
            src={`/icons/${item.icon}.svg`}
          />
        )}
      </div>
    </div>
  );
}

/**
 * FooterMobile - The FooterMobile component
 *
 * @param {Object} props - FooterMobile props
 * @returns {JSX} FooterMobile component
 */
let FooterMobile = ({ classes, history }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.topInfo}>
        {_renderList(footerListAssets.main, history)}
        {_renderList(footerListAssets.doubts, history)}
        <div>
          {_renderIconsList(footerIconAssets.socialMedia)}
          {_renderIconsList(footerIconAssets.awards)}
        </div>
        {_renderIconsList(footerIconAssets.payment)}
      </div>
      <div className={classes.bottomInfo}>
        <div>{footerCopyrights}</div>
        <div>{footerBottomText}</div>
      </div>
    </div>
  )
}

FooterMobile = withStyles(styles)(FooterMobile);

export { FooterMobile };