import React from 'react'
import Slider from 'react-slick';
import { CatalogProduct, SliderArrow } from '../../molecules';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  wrapper: {
    padding: '0 64px 24px 64px',
    position: 'relative',
    marginTop: 4 * theme.spacing.unit,
    '& .slick-slide': {
      display: 'inline-block',
      verticalAlign: 'top',
      '& > div:focus, & > div > div:focus': {
        outline: 'none'
      }
    }
  }
});

let ProductsSlider = props => {
  const { products, cart, handleUpdateCart, classes } = props;

  const settings = {
    slidesToShow: Math.floor(window.innerWidth / 256) - 1,
    slidesToScroll: Math.floor(window.innerWidth / 256) - 1,
    prevArrow: <SliderArrow to='prev' />,
    nextArrow: <SliderArrow to='next' />,
    infinite: false,
    draggable: false
  };

  return products && products.all.length ? (
    <div className={classes.wrapper}>
      <Slider {...settings}>
        {products.all.map(product =>
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