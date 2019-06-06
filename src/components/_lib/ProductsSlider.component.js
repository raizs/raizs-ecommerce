import React from 'react'
import Slider from 'react-slick';
import { CatalogProduct, SliderArrow } from '../../molecules';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  wrapper: {
    position: 'relative',
    '& .slick-slide': {
      display: 'inline-block',
      verticalAlign: 'top',
      '& > div:focus, & > div > div:focus': {
        outline: 'none'
      }
    },
    '& .slick-slider': {
      padding: '0 48px'
    }
  }
});

let ProductsSlider = props => {
  const { products, cart, handleUpdateCart, classes, isArrowSmall, all } = props;

  const settings = {
    slidesToShow: Math.floor(window.innerWidth / 272) - 1,
    slidesToScroll: Math.floor(window.innerWidth / 272) - 1,
    prevArrow: <SliderArrow isSmall={isArrowSmall} to='prev' />,
    nextArrow: <SliderArrow isSmall={isArrowSmall} to='next' />,
    infinite: false,
    draggable: false
  };

  const allProducts = all || 'all';
  const sliced = products && products[allProducts].length ? products[allProducts].slice(0, 50) : [];

  return products && products.all.length ? (
    <div className={classes.wrapper}>
      <Slider {...settings}>
        {sliced.map(product =>
            <CatalogProduct
              cart={cart}
              key={product.id}
              product={product}
              handleUpdateCart={handleUpdateCart}
            />
        )}
      </Slider>
    </div>
  ) : null;
};

ProductsSlider = withStyles(styles)(ProductsSlider);

export { ProductsSlider };