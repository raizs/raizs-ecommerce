import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from "react-redux"
import { toggleSearchBarAction } from '../../store/actions';
import { withStyles, Icon } from '@material-ui/core';
import ReactSVG from 'react-svg';

const styles = theme => ({
  wrapper: {
    height: 64,
    backgroundColor: 'white',
    padding: theme.spacing.unit,
    '& > *': {
      verticalAlign: 'middle',
      display: 'inline-block'
    },
    '& > .menu': {
      fontSize: 32,
      color: theme.palette.green.main
    },
    '& > img.logo': {
      height: 48,
    },
    '& .header-icon': {
      height: 40,
      transition: "0.2s",
      width: 40,
      verticalAlign: 'middle',
      display: 'inline-block',
      float: 'right',
      marginTop: 8,
      marginRight: 16,
      '&:hover *': {
        stroke: theme.palette.green.main
      }
    }
  }
});

/**
 * HeaderMobile - App main header
 *
 * @class HeaderMobile
 * @extends {Component}
 */
class HeaderMobile extends Component {

  render() {
    const { classes, history } = this.props;
    
    return (
      <header className={classes.wrapper}>
        <Icon className='menu'>menu</Icon>
        <img
          alt='brand-logo'
          className='logo'
          src='https://raizs.vteximg.com.br/arquivos/logotipo-raizs.png?v=635947045802400000'
          onClick={() => history.push('/')}
        />
        <ReactSVG
          style={{ transform: 'translateY(8px)' }}
          src='/icons/cesta.svg'
          className='header-icon'
        />
        <ReactSVG
          src='/icons/pesquisa.svg'
          className='header-icon'
        />
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    searching: state.header.isSearchBarOpen,
  };
}

HeaderMobile = compose(
  withStyles(styles),
  connect(mapStateToProps, { toggleSearchBarAction })
)(HeaderMobile);

export { HeaderMobile };