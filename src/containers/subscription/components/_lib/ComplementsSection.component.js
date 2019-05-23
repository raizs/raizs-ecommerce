import React, { Component } from 'react'
import { withStyles, Icon } from '@material-ui/core';
import { ProductsSlider } from '../../../../components';

const styles = theme => ({
  wrapper: {
    position: 'relative',
    '& > h3.title': {
      display: 'inline-block'
    },
    '& > h3.expand': {
      display: 'inline-block',
      position: 'absolute',
      right: 3 * theme.spacing.unit,
      verticalAlign: 'middle',
      lineHeight: '28px',
      cursor: 'pointer',
      '& > *': {
        verticalAlign: 'middle',
        marginLeft: theme.spacing.unit
      }
    }
  }
});

class ComplementsSection extends Component {
  state = {
    isOpen: false
  }

  _renderContent() {
    const { isOpen } = this.state;
    const { cart, products, section, handleUpdateCart } = this.props;

    return isOpen ? (
      <div>OPEN!</div>
    ) : (
      <ProductsSlider
        cart={cart}
        all={`${section.shortId}Products`}
        products={products}
        handleUpdateCart={handleUpdateCart}
        isArrowSmall={true}
      />
    );
  }

  render() {
    const { isOpen } = this.state;
    const { classes, section } = this.props;

    return (
      <div className={classes.wrapper}>
        <h3 className='title'>{section.parentName}</h3>
        <h3 className='expand' onClick={() => this.setState({ isOpen: !isOpen })}>
          {isOpen ?  'FECHAR' : 'VER TODOS'}
          <Icon>{isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</Icon>
        </h3>
        {this._renderContent()}
      </div>
    )
  }
}

ComplementsSection = withStyles(styles)(ComplementsSection);

export { ComplementsSection };