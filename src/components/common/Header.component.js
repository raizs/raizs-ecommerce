import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { categories } from '../../assets';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: 800
    };
  }

  componentDidMount() {
    
  }

  renderLeftContent(content) {
    return categories.map(category => {
      return (
        <div key={category.id} className='category'>
          {category.label}
        </div>
      );
    });
  }
  
  renderCenterContent(content) {
    return null;
  }
  
  renderRightContent(content) {
    return <div className='right-content'>MUITO CONTEÚDO NA DIREITA! MUITO MESMO.</div>;
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