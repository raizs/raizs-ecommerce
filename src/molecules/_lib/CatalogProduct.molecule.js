import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';

import { QuantitySelector } from '..';

const MIN_PRODUCT_HEIGHT = 332;
const MIN_SMALL_PRODUCT_HEGHT = 240;

const styles = theme => ({
  wrapper: {
    width: '256px',
    minHeight: `${MIN_PRODUCT_HEIGHT}px`,
    backgroundColor: 'white',
    display: 'inline-block',
    margin: 2 * theme.spacing.unit,
    padding: theme.spacing.unit/2,
    borderRadius: theme.spacing.unit,
    '&.-small': {
      minHeight: `${MIN_SMALL_PRODUCT_HEGHT}px`,
      width: '176px'
    }
  },
  imageWrapper: {
    position: 'relative',
    height: '224px',
    width: '248px',
    '& div.quantity-selector': {
      position: 'absolute',
      bottom: theme.spacing.unit,
      right: theme.spacing.unit
    },
    '&.-small': {
      height: '176px',
      width: '176px',
    }
  },
  image: {
    '& img': {
      borderRadius: theme.spacing.unit
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
    const { classes, product, handleUpdateCart, cart, small } = this.props;
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
        onClick={() => console.log(product)}
      >
        <div className={classnames(imageClasses)}>
          <img-2
            className={classes.image}
            width={small ? 168 : 248}
            height={small ? 168 : 224}
            alt={product.name}
            src={product.imageUrl}
            src-preview={product.imageUrl}
            >
          </img-2>
          <QuantitySelector
            changeAction={handleUpdateCart}
            item={product}
            quantity={cart.productQuantities[product.id] || 0}
          />
        </div>
        <h6 className={classes.brand}>{product.brandName}</h6>
        <h4 className={classes.name}>{product.name}</h4>
        <h4 className={classes.price}>{product.fullPrice}</h4>
       </div>
    )
  }
}

CatalogProduct = withStyles(styles)(CatalogProduct);

export { CatalogProduct };