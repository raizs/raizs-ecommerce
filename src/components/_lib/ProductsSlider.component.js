import React from 'react'
import Slider from 'react-slick';
import { CatalogProduct, SliderArrow } from '../../molecules';
import { withStyles } from '@material-ui/core';
import { sizes } from '../../constants/sizes';
import chunk from 'lodash.chunk';

const CHUNK_PADDING = 64;

const styles = theme => ({
  wrapper: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
    '& *': { outline: 'none' }
  },
  chunk: {
    display: 'flex !important',
    justifyContent: 'center',
    paddingLeft: CHUNK_PADDING,
    paddingRight: CHUNK_PADDING
  }
});

let ProductsSlider = props => {
  const {
    all,
    cart,
    classes,
    products,
    stockDate,
    availableWidth,
    handleUpdateCart,
  } = props;

  const settings = {
    prevArrow: <SliderArrow to='prev' />,
    nextArrow: <SliderArrow to='next' />,
    infinite: false,
    draggable: false
  };

  const PRODUCT_PADDING = 8;
  const allProducts = all || 'all';
  const sliced = products && products[allProducts].length ? products[allProducts].slice(0, 50) : [];
  const chunkSize = Math.floor((availableWidth - 2 * CHUNK_PADDING)/(sizes.CATALOG_PRODUCT_WIDTH + 2 * PRODUCT_PADDING));
  const chunked = chunk(sliced, chunkSize);

  return products && products.all.length ? (
    <div className={classes.wrapper}>
      <Slider {...settings}>
        {chunked.map((products, key) =>
          <div key={key} className={classes.chunk}>
            {products.map(product => 
              <CatalogProduct
                key={product.id}
                cart={cart}
                product={product}
                handleUpdateCart={handleUpdateCart}
                stockQuantity={product.stock ? product.stock[stockDate] : 0}
              />
            )}
          </div>
        )}
      </Slider>
    </div>
  ) : null;
};

ProductsSlider = withStyles(styles)(ProductsSlider);

export { ProductsSlider };