import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { HeaderHelper } from '../../helpers';

import { DropdownMenu, HeaderPopper, HeaderPopperButton, HeaderUserButton } from '..';
import { StringMapper } from '../../helpers/_lib/StringMapper';
import { Button, withStyles } from '@material-ui/core';

import styles from './styles/header.styles';

/**
 * Header - App main header
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  state = {
    windowWidth: 1024
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
    const { history, classes } = this.props;

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
          <HeaderPopper id={id} moreInfo={id === 'grocery'} />
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
    return null;
  }
  
  /**
   * _renderRightContent - Renders the right part of the header component
   *
   * @returns {JSX} Containing the desired right header content
   */
  _renderRightContent() {
    const { classes, isAuth } = this.props;

    return (
      <div id='right-content' className={classes.rightContent}>
        <div>
          <svg className={classes.headerIcon}>
            <image className={classes.headerIcon} xlinkHref='/icons/assinatura.svg' />
          </svg>
          <span style={{ verticalAlign: 'middle', marginLeft: '16px', fontWeight: 600, fontSize: '12px' }}>ASSINATURA</span>
        </div>
        <svg className={classes.headerIcon}>
          <image className={classes.headerIcon} xlinkHref='/icons/pesquisa.svg' />
        </svg>
        <HeaderUserButton isAuth={isAuth} />
        <svg className={classes.headerIcon}>
          <image className={classes.headerIcon} xlinkHref='/icons/cesta.svg' />
        </svg>
      </div>
    );
  }
  
  render() {
    return (
      <header className='app-header'>
        <img alt='brand-logo' className='logo' src='https://raizs.vteximg.com.br/arquivos/logotipo-raizs.png?v=635947045802400000' />
        <div className='left-content'>
          {this._renderLeftContent()}
        </div>
        {this._renderCenterContent()}
        {this._renderRightContent(this.props.classes)}
      </header>
    );
  }
}

// Header.propTypes = {
//   leftContent: PropTypes.arrayOf(PropTypes.object).isRequired,
//   centerContent: PropTypes.arrayOf(PropTypes.object).isRequired,
//   rightContent: PropTypes.arrayOf(PropTypes.object).isRequired,
//   actions: PropTypes.object.isRequired,
// };

// Header.defaultProps = {
//   leftContent: [],
//   centerContent: [],
//   rightContent: [],
// }

Header = withStyles(styles)(Header);
 
export { Header };