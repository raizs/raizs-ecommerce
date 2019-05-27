import React, { Component } from 'react';
import { withStyles, Icon, Collapse } from '@material-ui/core';
import { ProductsSlider } from '../../../../components';
import { CatalogProduct } from '../../../../molecules';
import InfiniteScroll from 'react-infinite-scroller';
import clonedeep from 'lodash.clonedeep';
import { CatalogSection } from '../../../catalog/components';

const styles = theme => ({
  wrapper: {
    position: 'relative',
    '& > h3.title': {
      display: 'inline-block',
      marginBottom: 2 * theme.spacing.unit
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
  state = {
    isOpen: false,
    items: [],
    perRow: Math.floor(this.props.width/272),
    all: `${this.props.section.shortId}Products`,
    loaded: 0
  }

  componentDidMount() {
    const { products, all } = this.props;
    if(products[all] && products[all].length) {
      const { perRow } = this.state;
      
      const items = products[all].slice(0, perRow);
      
      this.setState({ items, loaded: perRow });
    }
  }
  
  componentWillReceiveProps(nextProps) {
    const { all } = this.state;
    const { products } = nextProps;
    
    if(products[all] && products[all].length && !this.state.items.length) {
      const { perRow } = this.state;
      
      const items = products[all].slice(0, perRow);
      
      this.setState({ items });
    }
  }

  _loadMore() {
    const { products } = this.props;
    const { all, perRow, loaded } = this.state;
    const items = products[all].slice(0, loaded + perRow);

    this.setState({ items, loaded: loaded + perRow });
  }

  _renderContent() {
    const { isOpen, items, all } = this.state;
    const { cart, products, handleUpdateCart, width, section, brands } = this.props;

    return (
      <div>
        <Collapse in={!isOpen}>
          <ProductsSlider
            cart={cart}
            all={all}
            products={products}
            handleUpdateCart={handleUpdateCart}
            isArrowSmall={true}
          />
        </Collapse>
        <Collapse in={isOpen}>
          {/* <InfiniteScroll
            hasMore={products[all].length > items.length}
            loadMore={this._loadMore.bind(this)}
          >
            {items.map(product =>
              <CatalogProduct
                isSmall
                product={product}
                handleUpdateCart={handleUpdateCart}
                cart={cart}
              />
            )}
          </InfiniteScroll> */}
          <CatalogSection
            {...section}
            products={products}
            availableWidth={width}
            handleUpdateCart={handleUpdateCart}
            cart={cart}
            brands={brands}
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