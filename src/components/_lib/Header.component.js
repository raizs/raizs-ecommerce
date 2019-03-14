import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { categories } from '../../assets';
import { HeaderHelper } from '../../helpers';

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
 * @returns
 */
renderLeftContent() {
    const { availableCenterWidth } = this.state;

    const { toShow, more } = HeaderHelper.handleCategoryOptions(availableCenterWidth);
    console.log(toShow, more);

    const to = toShow.map(category => {
      return (
        <div key={category.id} className='category'>
          {category.label}
        </div>
      );
    });

    if(more.length) to.push(
      <div key='more' className='category'>
        MAIS
      </div>
    );

    return to;
  }
  
  renderCenterContent() {
    return null;
  }
  
  renderRightContent() {
    return <div className='right-content'>MUITO CONTEÚDO NA DIREITA MUITO MESMO.</div>;
  }
  
  render() {
    return (
      <header className='app-header'>
        <img alt='brand-logo' className='logo' src='https://raizs.vteximg.com.br/arquivos/logotipo-raizs.png?v=635947045802400000' />
        {this.renderLeftContent()}
        {this.renderCenterContent()}
        {this.renderRightContent()}
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