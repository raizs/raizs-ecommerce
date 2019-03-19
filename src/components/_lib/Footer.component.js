import React from 'react'
import { withStyles } from '@material-ui/core';

import { footerListAssets, footerIconAssets, footerCopyrights, footerBottomText } from '../../assets';

const styles = theme => ({
  wrapper: {
    padding: `${2 * theme.spacing.unit}px ${3 * theme.spacing.unit}px`,
    borderTop: `1px solid ${theme.palette.lightGray.main}`,
    '& *': {
      color: theme.palette.gray.main
    }
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'center',
    '& div.list': {
      margin: `${2 * theme.spacing.unit}px`,
      '& > div': {
        fontSize: theme.fontSizes.SM,
        marginBottom: `${2 * theme.spacing.unit}px`
      },
      '& div.title': {
        fontWeight: 700
      },
      '& div.item': {
        cursor: 'pointer',
        '&:hover': {
          color: theme.palette.green.main
        }
      },
    }
  },
  bottomInfo: {
    paddingTop: `${2 * theme.spacing.unit}px`,
    borderTop: `1px solid ${theme.palette.lightGray.main}`,
    '& > div': {
      color: theme.palette.black.main,
      fontSize: theme.fontSizes.XXS,
      textAlign: 'center',
      lineHeight: theme.fontSizes.XS
    }
  }
});

const renderList = ({ title, items }) => {
  return (
    <div className='list'>
      <div className='title'>{title}</div>
      {items.map(item => (
        <div className='item' key={item.id} onClick={() => console.log(item.id)}>
          {item.label}
        </div>
      ))}
    </div>
  );
};

let Footer = ({ classes }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.topInfo}>
        {renderList(footerListAssets.main)}
        {renderList(footerListAssets.doubts)}
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