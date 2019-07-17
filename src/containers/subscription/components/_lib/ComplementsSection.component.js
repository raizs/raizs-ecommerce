import React, { Component } from 'react';
import { withStyles, Icon, Collapse } from '@material-ui/core';
import { ProductsSlider } from '../../../../components';
import { CatalogSection } from '../../../catalog/components';

const styles = theme => ({
  wrapper: {
    position: 'relative',
    paddingLeft: 4 * theme.spacing.unit,
    '& > h3.title': {
      display: 'inline-block',
    },
    '& > h3.expand': {
      display: 'inline-block',
      position: 'absolute',
      right: 3 * theme.spacing.unit,
      verticalAlign: 'middle',
      lineHeight: '24px',
      cursor: 'pointer',
      '& > *': {
        verticalAlign: 'middle',
        marginLeft: theme.spacing.unit
      }
    }
  }
});

class ComplementsSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      all: `${this.props.section.shortId}Products`,
    }
  }

  _renderContent() {
    const { isOpen, all } = this.state;
    const {
      cart,
      products,
      handleUpdateCart,
      width,
      section,
      brands,
      stockDate,
      availableWidth
    } = this.props;

    return (
      <div>
        <Collapse in={!isOpen}>
          <ProductsSlider
            cart={cart}
            all={all}
            products={products}
            handleUpdateCart={handleUpdateCart}
            availableWidth={availableWidth}
            stockDate={stockDate}
          />
        </Collapse>
        <Collapse in={isOpen}>
          <CatalogSection
            {...section}
            products={products}
            availableWidth={width}
            handleUpdateCart={handleUpdateCart}
            cart={cart}
            brands={brands}
            shouldAnchor={isOpen}
            stockDate={stockDate}
            small
          />
        </Collapse>
      </div>
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