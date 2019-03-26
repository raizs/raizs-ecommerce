import React from 'react'

import styles from './styles/header.styles';
import { withStyles } from '@material-ui/core';
import { HeaderUserPopper, HeaderPopperButton } from '..';
import { SimplePopper } from '../../molecules';

let HeaderUserButton = props => {
  const { classes, isAuth } = props;
  
  const label = (
    <div>
      <svg className={classes.headerIcon}>
        <image className={classes.headerIcon} xlinkHref='/icons/usuario.svg' />
      </svg>
    </div>
  );

  return (
    <SimplePopper label={label} shouldClose={isAuth} >
      <HeaderUserPopper isAuth={isAuth} />
    </SimplePopper>
  )
}

HeaderUserButton = withStyles(styles)(HeaderUserButton);

export { HeaderUserButton };