import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { categories } from '../../assets';
import { HeaderHelper } from '../../helpers';

const CATEGORY_AVERAGE_WIDTH = 140;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: 1024
    };
  }

  componentDidMount() {
    const context = this;
    window.addEventListener('resize', () => {
      const { windowWidth, availableCenterWidth } = HeaderHelper.getWidths();

      context.setState({ windowWidth, availableCenterWidth });
    });
    
    const {
      windowWidth,
      logoWidth,
      rightContentWidth,
      availableCenterWidth
    } = HeaderHelper.getWidths();

    this.setState({ windowWidth, logoWidth, rightContentWidth, availableCenterWidth });
  }

  renderLeftContent(content) {
    let fits = Math.floor(this.state.availableCenterWidth / CATEGORY_AVERAGE_WIDTH);

    const show = categories.slice(0, fits);
    const more = fits >= categories.length ? [] :
      categories.slice(fits - categories.length);

    const to = show.map(category => {
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
  
  renderCenterContent(content) {
    return null;
  }
  
  renderRightContent(content) {
    return <div className='right-content'>MUITO CONTEÚDO NA DIREITA AAAAAAAAAAA MUITO MESMO.</div>;
  }
  
  render() {
    const { leftContent, centerContent, rightContent } = this.props;
    return (
      <header className='app-header'>
        <img alt='brand-logo' className='logo' src='https://raizs.vteximg.com.br/arquivos/logotipo-raizs.png?v=635947045802400000' />
        {this.renderLeftContent(leftContent)}
        {this.renderCenterContent(centerContent)}
        {this.renderRightContent(rightContent)}
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