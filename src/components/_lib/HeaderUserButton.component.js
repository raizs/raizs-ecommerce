import React from 'react'
import { withStyles } from '@material-ui/core';
import ReactSvg from 'react-svg';

import styles from './styles/header.styles';
import { HeaderUserPopper } from '..';
import { SimplePopper } from '../../molecules';

let HeaderUserButton = props => {
  const { classes, isAuth, toForm, isUserPopperOpen, toLoggedIn } = props;
  const headerUserPopperProps = {
    toLoggedIn,
    toForm,
    isAuth
  };
  
  const label = (
    <ReactSvg
      src='/icons/usuario.svg'
      className={classes.headerIcon}
    />
  );

  return (
    <SimplePopper
      id='user'
      label={label}
      open={isUserPopperOpen}
      shouldCloseOnInsideClick={isAuth}
      fadeTimeout={isAuth ? { enter: 350, exit: 0 } : null}
    >
      <HeaderUserPopper {...headerUserPopperProps} />
    </SimplePopper>
  )
}

HeaderUserButton = withStyles(styles)(HeaderUserButton);

export { HeaderUserButton };