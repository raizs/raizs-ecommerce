import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ReactSvg from 'react-svg'
import compose from 'recompose/compose';
import { connect } from "react-redux"
import classnames from "classnames"

import { HeaderHelper, StringMapper } from '../../helpers';
import { toggleSearchBarAction } from '../../store/actions';
import { DropdownMenu, HeaderPopper, HeaderPopperButton, HeaderUserButton } from '..';
import { Button, withStyles } from '@material-ui/core';
import { SubscriptionStepper } from './SubscriptionStepper.component';
import { CheckoutStepper } from './CheckoutStepper.component';
import { SearchBar } from './SearchBar.component';
import { MiniCart } from './MiniCart.component';

const styles = theme => ({
  headerButton: theme.buttons.header,
  centerContent: {
    width: '40%',
    height: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: '30%'
  },
  rightContent: {
    position: 'relative',
    float: 'right',
    padding: `0 ${2 * theme.spacing.unit}px`,
    height: theme.sizes.HEADER_HEIGHT,
    lineHeight: theme.sizes.HEADER_HEIGHT,
    '&::after': {
      position: 'absolute',
      left: 0,
      top: '8px',
      height: '48px',
      width: '1px',
      backgroundColor: theme.palette.gray.main,
      content: '""'
    },
    '& > *': {
      display: 'inline-block',
      verticalAlign: 'middle',
      margin: `0 ${theme.spacing.unit}px`,
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.green.main,

      }
    }
  },
  headerIcon: {
    height: 40,
    transition: "0.2s",
    width: 40,
    verticalAlign: 'middle',
    display: 'inline-block',
    '&:hover *': {
      stroke: theme.palette.green.main
    },
    '&.-cesta': {
      transform: 'translateY(8px)'
    }
  },
  noWidthIcon:{
    width: 0
  },
  greenHover: {
    '&:hover *': {
      color: theme.palette.green.main,
      stroke: theme.palette.green.main
    }
  },
  backdrop:{
    position:"fixed",
    top:0,
    zIndex:3,
    backgroundColor:"rgba(0,0,0, 0.1)",
    width:"100%",
    height:"100vh",
    top:12*theme.spacing.unit,

  }
});

/**
 * Header - App main header
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  state = {
    windowWidth: 1024,
  }

  /**
   * componentDidMount - Lifecycle method. Adds the event listener for resizing
   * to adjust the number of rendered categories in this header and saves the startup
   * values
   *
   * @memberof Header
   */
  componentDidMount() {
    const context = this;
    window.addEventListener('resize', () => {
      const { windowWidth, availableCenterWidth } = HeaderHelper.getWidths()
      context.setState({ windowWidth, availableCenterWidth });
    });

    window.addEventListener('scroll', () => {
      this.setState({ searching: false });
    });
    
    const {
      windowWidth,
      availableCenterWidth
    } = HeaderHelper.getWidths();

    this.setState({ windowWidth, availableCenterWidth });
  }

  /**
   * _renderLeftContent - Renders the left part of the header component
   * 
   * IMPORTANT: The left part is adjacent to the logo, whereas the center part is
   * necessarily centered
   *
   * @returns {JSX} Containing the desired left header content
   */
  _renderLeftContent() {
    const { availableCenterWidth } = this.state;
    const { history, classes, currentPath } = this.props;

    if(['assinatura', 'carrinho', 'checkout', 'pedido-finalizado'].includes(currentPath))
      return null;

    const { toShow, more } = HeaderHelper.handleCategoryOptions(availableCenterWidth);

    const to = toShow.map(({ id, label }) => {
      if(id === 'all')
        return (
          <Button
            key={id}
            className={classes.headerButton}
            onClick={() => history.push(StringMapper.categoryToURL(id))} 
          >
            {label}
          </Button>
        );
      
      return (
        <HeaderPopperButton
          id={id}
          key={id}
          label={label}
          clickAction={() => history.push(StringMapper.categoryToURL(id))}
        >
          <HeaderPopper history={history} id={id} moreInfo={id === 'mercearia'} />
        </HeaderPopperButton>
      );
    });

    if(more.length) {
      more.forEach(category => {
        category.clickAction = () => history.push(StringMapper.categoryToURL(category.id))
      });

      to.push(
        <div key='more' className='category'>
          <DropdownMenu id='more' label='MAIS' items={more} />
        </div>
      );
    }

    return to;
  }
  
  _renderCenterContent() {
    const { classes, currentPath } = this.props;
    
    if(!['assinatura', 'carrinho', 'checkout', 'pedido-finalizado'].includes(currentPath))
      return null;

    return (
      <div className={classes.centerContent}>
        {{
          assinatura: <SubscriptionStepper />,
          carrinho: <CheckoutStepper currentPath={currentPath} />,
          checkout: <CheckoutStepper currentPath={currentPath} />,
          'pedido-finalizado': <CheckoutStepper currentPath={currentPath} />
        }[currentPath]}
      </div>
    );
  }
  
  /**
   * _renderRightContent - Renders the right part of the header component
   *
   * @returns {JSX} Containing the desired right header content
   */
  _renderRightContent() {
    const {
      classes,
      isAuth,
      isUserPopperOpen,
      toForm,
      toLoggedIn,
      history,
      currentPath,
      handleSelectDate,
      handleUpdateCart,
      handleUpdateSubscriptionCart
    } = this.props;
    const headerUserButtonProps = {
      isAuth,
      toForm,
      isUserPopperOpen,
      toLoggedIn
    };

    if(['assinatura', 'carrinho', 'checkout', 'pedido-finalizado'].includes(currentPath))
      return <div id='right-content'></div>;


    let searchClassName = [classes.headerIcon]
    if(this.props.searching) searchClassName.push(classes.noWidthIcon);

    return (
      <div id='right-content' className={classes.rightContent}>
        <div className={classes.greenHover} onClick={() => history.push('/assinatura/genericos')}>
          <ReactSvg
            src='/icons/assinatura.svg'
            className={classes.headerIcon}
          />
          <span style={{ verticalAlign: 'middle', marginLeft: '16px', fontWeight: 600, fontSize: '12px' }}>ASSINATURA</span>
        </div>
        <ReactSvg
          src='/icons/pesquisa.svg'
          className={classnames(searchClassName)}
          onClick={() => this.props.toggleSearchBarAction(true)}
        />
        <HeaderUserButton {...headerUserButtonProps} />
        <HeaderPopperButton
          id='cesta'
          cesta
          timeout={{ enter: 350, exit: 500 }}
          placement='bottom-end'
          label={<ReactSvg
            src='/icons/cesta.svg'
            className={classnames(classes.headerIcon, '-cesta')}
          />}
          clickAction={() => history.push('/carrinho')}
        >
          <MiniCart
            handleSelectDate={handleSelectDate}
            handleUpdateCart={handleUpdateCart}
            handleUpdateSubscriptionCart={handleUpdateSubscriptionCart}
          />
        </HeaderPopperButton>
      </div>
    );
  }

  
  render() {
    const { searching } = this.props;
    const { availableCenterWidth } = this.state
    
    return (
      <header className='app-header'>
        {this._renderCenterContent()}
        <img
          alt='brand-logo'
          className='logo'
          src='https://raizs.vteximg.com.br/arquivos/logotipo-raizs.png?v=635947045802400000'
          onClick={() => this.props.history.push('/')}
        />
        <div className='left-content'>
          <SearchBar width={availableCenterWidth} />
          {searching ? null : this._renderLeftContent()}
        </div>
        {this._renderRightContent()}
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    searching: state.header.isSearchBarOpen,
  };
}

Header = compose(
  withStyles(styles),
  connect(mapStateToProps, { toggleSearchBarAction })
)(Header);

export { Header };