import React, { Component } from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import 'img-2';

import { CatalogProduct, CatalogUnavailableProduct } from '../../../../molecules';
import { sizes } from '../../../../constants/sizes';

const MARGIN = 8;

const UNAVAILABLE_PRODUCT_WIDTH = 64;
const UNAVAILABLE_PRODUCT_SPACE = UNAVAILABLE_PRODUCT_WIDTH + (4 * MARGIN);

const PRODUCT_WIDTH = sizes.CATALOG_PRODUCT_WIDTH + (2 * MARGIN);
const SMALL_PRODUCT_WIDHT = sizes.SMALL_CATALOG_PRODUCT_WIDTH + (2 * MARGIN);

const MIN_PRODUCT_HEIGHT = sizes.CATALOG_PRODUCT_HEIGHT + (2 * MARGIN);
const MIN_SMALL_PRODUCT_HEIGHT = 244 + (2 * MARGIN);

const styles = theme => ({
  title: {
    // padding: `${theme.spacing.unit}px 0`,
    paddingBottom: 2 * theme.spacing.unit,
    fontSize: theme.fontSizes.MMD,
    '&.-small': {
      fontSize: theme.fontSizes.MD,
      color: theme.palette.gray.main
    }
  }
});

class CatalogSectionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availablePerRow: 3,
      unavailablePerRow: 8,
      availableWidth: props.availableWidth,
      anchor: null,
      availableItems: [],
      unavailableItems: [],
      availableLoaded: 3,
      unavailableLoaded: 0,
      loaded: false
    };

    this._renderProducts = this._renderProducts.bind(this);
    this._loadMore = this._loadMore.bind(this);
  }

  componentDidMount = () => {
    const { id, grouped, availableWidth, small } = this.props;
    const { available, unavailable } = grouped;
    const anchorId = `#${id}`;
    const productWidth = small ? SMALL_PRODUCT_WIDHT : PRODUCT_WIDTH;
    const productHeight = small ? MIN_SMALL_PRODUCT_HEIGHT : MIN_PRODUCT_HEIGHT;

    const availablePerRow = Math.floor(availableWidth / productWidth);
    const unavailablePerRow = Math.floor(availableWidth / UNAVAILABLE_PRODUCT_SPACE);
    
    const availableFakeHeight = Math.ceil(available.length / availablePerRow) * productHeight;
    const unavailableFakeHeight = Math.ceil(unavailable.length / unavailablePerRow) * UNAVAILABLE_PRODUCT_SPACE;
    
    const fakeHeight = availableFakeHeight + unavailableFakeHeight;
    
    const anchor = document.querySelector(anchorId);
    anchor.style.height = `${fakeHeight}px`;
  }
  
  componentWillReceiveProps = nextProps => {
    const { availableWidth, grouped, id, small, ascending, filter, stockDate } = nextProps;
    const { available, unavailable } = grouped;
    const prevAscending = this.props.ascending,
      prevFilter = this.props.filter,
      prevStockDate = this.props.stockDate;

    if(
      availableWidth !== this.props.availableWidth ||
      (available.length && !this.props.grouped.available.length) ||
      stockDate !== prevStockDate
    ) {
      const productWidth = small ? SMALL_PRODUCT_WIDHT : PRODUCT_WIDTH;
      const productHeight = small ? MIN_SMALL_PRODUCT_HEIGHT : MIN_PRODUCT_HEIGHT;
      
      const availablePerRow = Math.floor(availableWidth / productWidth);
      const unavailablePerRow = Math.floor(availableWidth / UNAVAILABLE_PRODUCT_SPACE);

      const availableFakeHeight = Math.ceil(available.length / availablePerRow) * productHeight;
      const unavailableFakeHeight = Math.ceil(unavailable.length / unavailablePerRow) * UNAVAILABLE_PRODUCT_SPACE;
    
      const fakeHeight = availableFakeHeight + unavailableFakeHeight + 34 + 24; // title height
      
      const anchor = document.querySelector(`#${id}`);
      anchor.style.height = `${fakeHeight}px`;

      this.setState({ availablePerRow, unavailablePerRow, anchor });
    }

    if(ascending !== prevAscending || filter !== prevFilter || stockDate !== prevStockDate) {
      const { grouped } = nextProps;
      const { availablePerRow, availableLoaded, unavailableLoaded } = this.state;

      const availableSlice = availableLoaded < grouped.available.length ? availableLoaded + availablePerRow : availableLoaded;
      const unavailableSlice = availableLoaded >= grouped.available.length ? unavailableLoaded < grouped.unavailable.length ? unavailableLoaded + availablePerRow : unavailableLoaded : 0;

      const availableItems = grouped.available.slice(0, availableSlice);
      const unavailableItems = grouped.unavailable.slice(0, unavailableSlice);

      this.setState({ availableItems, unavailableItems, availableLoaded: availableSlice, unavailableLoaded: unavailableSlice });
    }
  }

  _loadMore() {
    const { grouped } = this.props;
    const { availablePerRow, availableLoaded, unavailableLoaded } = this.state;

    const availableSlice = availableLoaded < grouped.available.length ? availableLoaded + availablePerRow : availableLoaded;
    const unavailableSlice = availableLoaded >= grouped.available.length ? unavailableLoaded < grouped.unavailable.length ? unavailableLoaded + availablePerRow : unavailableLoaded : 0;

    const availableItems = grouped.available.slice(0, availableSlice);
    const unavailableItems = grouped.unavailable.slice(0, unavailableSlice);

    this.setState({ availableItems, unavailableItems, availableLoaded: availableSlice, unavailableLoaded: unavailableSlice });
  }
  
  _renderProducts() {
    const { availableItems, unavailableItems } = this.state;
    const {
      cart,
      small,
      grouped,
      stockDate,
      handleUpdateCart,
      openModalProductAction
    } = this.props;

    return (
      <InfiniteScroll
        hasMore={grouped.available.length + grouped.unavailable.length > availableItems.length + unavailableItems.length}
        loadMore={this._loadMore}
      >
        <div>
          {availableItems.map(product => {
            return (
              <CatalogProduct
                cart={cart}
                small={small}
                key={product.id}
                product={product}
                handleUpdateCart={handleUpdateCart}
                openModalProductAction={openModalProductAction}
                stockQuantity={product.stock ? product.stock[stockDate] : 0}
              />
            );
          })}  
        </div>
        <div>
          {unavailableItems.map(product => {
            return (
              <CatalogUnavailableProduct
                key={product.id}
                product={product}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    );
  }

  render() {
    const { id, classes, title, shouldAnchor, small } = this.props;
    const classNames = [classes.title];
    if(small) classNames.push('-small');

    return (
      <div id={id} className={shouldAnchor ? 'offset-important' : ''}>
        <h2 className={classnames(classNames)}>{title}</h2>
        {this._renderProducts()}
      </div>
    )
  }
}

CatalogSectionList = withStyles(styles)(CatalogSectionList);

export { CatalogSectionList };