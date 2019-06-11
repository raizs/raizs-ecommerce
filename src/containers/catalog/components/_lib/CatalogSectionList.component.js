import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import 'img-2';

import { CatalogProduct } from '../../../../molecules';

const PRODUCT_WIDTH = 256 + 32;
const SMALL_PRODUCT_WIDHT = 176 + 32;

const MIN_PRODUCT_HEIGHT = 328 + 32;
const MIN_SMALL_PRODUCT_HEIGHT = 244 + 32;

const styles = theme => ({
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
      items: [],
      loaded: 3
    };

    this._renderProducts = this._renderProducts.bind(this);
    this._loadMore = this._loadMore.bind(this);
  }

  componentDidMount = () => {
    const { id, groupedProducts, availableWidth, small } = this.props;
    const anchorId = `#${id}`;
    const productWidth = small ? SMALL_PRODUCT_WIDHT : PRODUCT_WIDTH;
    const productHeight = small ? MIN_SMALL_PRODUCT_HEIGHT : MIN_PRODUCT_HEIGHT;
    const perRow = Math.floor(availableWidth / productWidth);
    const anchor = document.querySelector(anchorId);

    const fakeHeight = Math.ceil(groupedProducts.length / perRow) * productHeight + 80;

    anchor.style.height = `${fakeHeight}px`;

    this.setState({ perRow, anchor });
  }
  
  componentWillReceiveProps = (nextProps) => {
    const { availableWidth, groupedProducts, id, small } = nextProps;
    if(availableWidth !== this.props.availableWidth) {
      const productWidth = small ? SMALL_PRODUCT_WIDHT : PRODUCT_WIDTH;
      const productHeight = small ? MIN_SMALL_PRODUCT_HEIGHT : MIN_PRODUCT_HEIGHT;
      
      const perRow = Math.floor(availableWidth / productWidth);
      const fakeHeight = Math.ceil(groupedProducts.length / perRow) * productHeight + 80;
      
      const anchor = document.querySelector(`#${id}`);
      anchor.style.height = `${fakeHeight}px`;

      this.setState({ perRow, anchor });
    }

    const { ascending, filter } = nextProps;
    const prevAscending = this.props.ascending, prevFilter = this.props.filter;


    if(ascending !== prevAscending || filter !== prevFilter) {
      const { loaded, perRow } = this.state;
      const { groupedProducts } = nextProps;
      const items = groupedProducts.slice(0, loaded + perRow);

      this.setState({ items });
    }
  }

  _loadMore() {
    const { groupedProducts } = this.props;
    const { perRow, loaded } = this.state;
    const items = groupedProducts.slice(0, loaded + perRow);

    this.setState({ items, loaded: loaded + perRow });
  }
  
  _renderProducts() {
    const { items } = this.state;
    const { groupedProducts, brands, handleUpdateCart, cart, openModalProductAction, small } = this.props;

    return (
      <InfiniteScroll hasMore={groupedProducts.length > items.length} loadMore={this._loadMore}>
        {items.map(product => {
          return (
            <CatalogProduct
              cart={cart}
              key={product.id}
              product={product}
              handleUpdateCart={handleUpdateCart}
              openModalProductAction={openModalProductAction}
              small={small}
            />
          );
        })}
      </InfiniteScroll>
    );
  }

  render() {
    const { id, classes, title, shouldAnchor } = this.props;
    return (
      <div id={id} className={shouldAnchor ? 'offset-important' : ''}>
        <h2 className={classes.title}>{title}</h2>
        {this._renderProducts()}
      </div>
    )
  }
}

CatalogSectionList = withStyles(styles)(CatalogSectionList);

export { CatalogSectionList };