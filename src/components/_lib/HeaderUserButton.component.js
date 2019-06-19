import React from 'react'
import { withStyles } from '@material-ui/core';
import ReactSvg from 'react-svg';

import { HeaderUserPopper } from '..';
import { SimplePopper } from '../../molecules';

const styles = theme => ({
  headerIcon: {
    height: 40,
    width: 40,
    verticalAlign: 'middle',
    display: 'inline-block',
    '&:hover *': {
      stroke: theme.palette.green.main
    }
  }
});

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
      from='headerUserButton'
      placement='bottom-end'
      label={label}
      zIndex={10}
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