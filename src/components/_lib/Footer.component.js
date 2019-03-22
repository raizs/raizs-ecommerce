import React from 'react'
import { withStyles, Icon } from '@material-ui/core';

import { footerListAssets, footerIconAssets, footerCopyrights, footerBottomText } from '../../assets';

import styles from './styles/footer.styles';

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
        {items.map(item => <Icon key={item.id}>home</Icon>)}
      </div>
    </div>
  );
}

/**
 * Footer - The Footer component
 *
 * @param {Object} props - Footer props
 * @returns {JSX} Footer component
 */
let Footer = ({ classes, history }) => {
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

Footer = withStyles(styles)(Footer);

export { Footer };