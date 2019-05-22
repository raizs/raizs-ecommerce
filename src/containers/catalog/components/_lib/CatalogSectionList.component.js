import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import chunk from 'lodash.chunk';
import 'img-2';

import { CatalogProduct } from '..';

const PRODUCT_WIDTH = 256 + 24;
const MIN_ROW_HEIGHT = 336;
const styles = theme => ({
  row: {
    minHeight: `${MIN_ROW_HEIGHT}px`,
    '& > *': {
      verticalAlign: 'middle'
    }
  },
  title: {
    padding: `${theme.spacing.unit}px 0`
  }
});

class CatalogSectionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      perRow: 3,
      availableWidth: props.availableWidth,
      anchor: null,
      rowsToRender: 3
    };

    this._renderProducts = this._renderProducts.bind(this);
    this._calculateNumberOfRows = this._calculateNumberOfRows.bind(this);
  }

  componentDidMount = () => {
    const context = this;
    const id = `#${this.props.id}`;

    window.addEventListener('scroll', () => {
      const offsetTop = anchor.offsetTop;
      const htmlScroll = document.querySelector('html').scrollTop;
      const bodyScroll = document.querySelector('body').scrollTop;
      const scroll = htmlScroll || bodyScroll;
      
      const rowsToRender = context._calculateNumberOfRows(offsetTop, scroll);

      if(rowsToRender !== this.state.rowsToRender)
        context.setState({ rowsToRender });
    });
    
    const perRow = Math.floor(this.props.availableWidth / PRODUCT_WIDTH);
    const anchor = document.querySelector(id);
    const htmlScroll = document.querySelector('html').scrollTop;
    const bodyScroll = document.querySelector('body').scrollTop;
    const scroll = htmlScroll || bodyScroll;

    const rowsToRender = this._calculateNumberOfRows(anchor.offsetTop, scroll);
    const fakeHeight = Math.ceil(this.props.groupedProducts.length / perRow) * MIN_ROW_HEIGHT + 80;

    anchor.style.height = `${fakeHeight}px`;
    
    this.setState({ perRow, anchor, rowsToRender });
  }
  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.availableWidth !== this.props.availableWidth) {
      const perRow = Math.floor(nextProps.availableWidth / PRODUCT_WIDTH);
      const fakeHeight = Math.ceil(this.props.groupedProducts.length / perRow) * MIN_ROW_HEIGHT + 80;

      const anchor = document.querySelector(`#${nextProps.id}`);
      anchor.style.height = `${fakeHeight}px`;

      this.setState({ perRow, anchor });
    }
  }

  _calculateNumberOfRows(offsetTop, scroll) {
    const { rowsToRender } = this.state;
    const height = window.innerHeight;

    const delta = scroll - offsetTop + height;

    if(delta >= (rowsToRender - 1) * MIN_ROW_HEIGHT) {
      return Math.min(rowsToRender + 1, this.props.groupedProducts.length);
    }

    return rowsToRender;
  }
  
  _renderProducts() {
    const { perRow, rowsToRender } = this.state;
    const { groupedProducts, brands, classes, handleUpdateCart, cart, openModalProductAction } = this.props;
    let chunked = chunk(groupedProducts, perRow);

    chunked = chunked.slice(0, rowsToRender);

    return chunked.map((chunk, index) => {
      return (
        <div className={classes.row} key={`chunk-${index}`}>
          {chunk.map(product => {
            product.brand = brands.getNameFromId(product.brandId);
            return (
              <CatalogProduct
                cart={cart}
                key={product.id}
                product={product}
                handleUpdateCart={handleUpdateCart}
                openModalProductAction={openModalProductAction}
              />
            );
          })}
        </div>
      )
    });
  }

  render() {
    const { id, classes, title } = this.props;
    return (
      <div id={id}>
        <h2 className={classes.title}>{title}</h2>
        {this._renderProducts()}
      </div>
    )
  }
}

CatalogSectionList = withStyles(styles)(CatalogSectionList);

export { CatalogSectionList };