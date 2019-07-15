import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';

import { QuantitySelector } from '..';
import { sizes } from '../../constants/sizes';

const MIN_PRODUCT_HEIGHT = sizes.CATALOG_PRODUCT_HEIGHT;
const MIN_SMALL_PRODUCT_HEIGHT = sizes.SMALL_CATALOG_PRODUCT_HEIGHT;

const WIDTH = sizes.CATALOG_PRODUCT_WIDTH;
const SMALL_WIDTH = sizes.SMALL_CATALOG_PRODUCT_WIDTH;

const styles = theme => ({
  wrapper: {
    width: WIDTH,
    minHeight: `${MIN_PRODUCT_HEIGHT}px`,
    backgroundColor: 'white',
    display: 'inline-block',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit/2,
    borderRadius: theme.spacing.unit,
    cursor: 'pointer',
    '&.-small': {
      minHeight: MIN_SMALL_PRODUCT_HEIGHT,
      width: sizes.SMALL_CATALOG_PRODUCT_WIDTH
    }
  },
  imageWrapper: {
    position: 'relative',
    height: WIDTH - 8,
    width: WIDTH - 8,
    '& div.quantity-selector': {
      position: 'absolute',
      bottom: theme.spacing.unit,
      right: theme.spacing.unit
    },
    '&.-small': {
      height: sizes.SMALL_CATALOG_PRODUCT_WIDTH,
      width: sizes.SMALL_CATALOG_PRODUCT_WIDTH,
    }
  },
  image: {
    '& img': {
      borderRadius: theme.spacing.unit,
      zIndex: 0
    }
  },
  brand: {
    color: theme.palette.gray.main,
    fontSize: theme.fontSizes.XS,
    fontWeight: 500,
    margin: `${theme.spacing.unit / 2}px 0`
  },
  name: {
    ...theme.typography.textEllipsis,
    height: '1.125em',
    fontWeight: 600,
    fontSize: theme.fontSizes.MD,
    marginTop: theme.spacing.unit
  },
  price: {
    fontWeight: 600,
    fontSize: theme.fontSizes.SM,
    marginTop: theme.spacing.unit/2,
    color: theme.palette.gray.main
  }
});

class CatalogProduct extends Component {

  render() {
    const { classes, product, handleUpdateCart, cart, small, stockQuantity, openModalProductAction } = this.props;
    const wrapperClasses = [classes.wrapper];
    const imageClasses = [classes.imageWrapper];
    
    if(small) {
      wrapperClasses.push('-small');
      imageClasses.push('-small');
    }

    return (
      <div
        id={`product-${product.id}`}
        className={classnames(wrapperClasses)}
        onClick={()=>openModalProductAction(product)}
      >
        <div className={classnames(imageClasses)}>
          <img-2
            className={classes.image}
            width={small ? SMALL_WIDTH - 8 : WIDTH - 8}
            height={small ? SMALL_WIDTH - 8 : WIDTH - 8}
            alt={product.name}
            src={product.imageUrl}
            src-preview={product.imageUrl}
            >
          </img-2>
          <QuantitySelector
            item={product}
            maxQuantity={stockQuantity}
            changeAction={handleUpdateCart}
            quantity={cart.productQuantities[product.id] || 0}
          />
        </div>
        <h6 className={classes.brand}>{product.brandName}</h6>
        <h4 title={product.name} className={classes.name}>{product.name}</h4>
        <h4 className={classes.price}>{product.fullPrice}</h4>
       </div>
    )
  }
}

CatalogProduct = withStyles(styles)(CatalogProduct);

export { CatalogProduct };