import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { HeaderHelper } from '../../helpers';

import Icon from '@material-ui/core/Icon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Tooltip } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { DropdownMenu, MenuTooltip } from '..';
import { StringMapper } from '../../helpers/_lib/StringMapper';

// this theme overrides the default tooltip style
const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: 'white',
        border: '1px solid #A9A9A9',
        borderRadius: '16px',
        marginTop: 0,
        padding: 0
      }
    }
  }
});

/**
 * Header - App main header
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: 1024
    };

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
 * renderLeftContent - Renders the left part of the header component
 * 
 * IMPORTANT: The left part is adjacent to the logo, whereas the center part is
 * necessarily centered
 *
 * @returns {JSX} Containing the desired left header content
 */
renderLeftContent() {
    const { availableCenterWidth } = this.state;
    const { history } = this.props;

    const { toShow, more } = HeaderHelper.handleCategoryOptions(availableCenterWidth);

    const to = toShow.map(({ id, label }) => {
      if(id === 'all')
        return (
          <div
            id={id}
            className='category'
            onClick={() => history.push(StringMapper.categoryToURL(id))} 
          >
            {label}
          </div>
        );
      
      return (
        <Tooltip
          key={id}
          interactive
          id='header-tooltip'
          TransitionComponent={Zoom}
          title={<MenuTooltip id={id} />}
        >
          <div
            id={id}
            className='category'
            onClick={() => history.push(StringMapper.categoryToURL(id))}
          >
            {label}
          </div>
        </Tooltip>
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
  
  renderCenterContent() {
    return null;
  }
  
  /**
   * renderRightContent - Renders the right part of the header component
   *
   * @returns {JSX} Containing the desired right header content
   */
  renderRightContent() {
    return (
      <div className='right-content'>
        <Icon fontSize='large'>shopping_basket</Icon>ASSINATURA
        <Icon fontSize='large'>search</Icon>
        <DropdownMenu
          id='profile'
          hasArrow={false}
          label={<AccountCircleIcon fontSize='large' />}
          items={[{id: '1', label: 'uno'}, {id: '2', label: 'dos'}]}
        />
        <Icon fontSize='large'>shopping_cart</Icon>
      </div>
    );
  }
  
  render() {
    return (
      <header className='app-header'>
        <img alt='brand-logo' className='logo' src='https://raizs.vteximg.com.br/arquivos/logotipo-raizs.png?v=635947045802400000' />
        <MuiThemeProvider theme={theme}>
          <div className='left-content'>
            {this.renderLeftContent()}
          </div>
          {this.renderCenterContent()}
          {this.renderRightContent()}
        </MuiThemeProvider>
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
 
export { Header };