import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';

import { QuantitySelector } from '../../molecules';
import { Image } from '../../components';
import { Formatter } from '../../helpers';

const LIST_PRODUCT_HEIGHT = 48;
const LIST_PRODUCT_HEIGHT_PX = '48px';

const styles = theme => ({
  wrapper: {
    width: '100%',
    minHeight: LIST_PRODUCT_HEIGHT_PX,
    backgroundColor: 'white',
    marginBottom: theme.spacing.unit,
    borderRadius: theme.spacing.unit,
    padding: theme.spacing.unit,
    userSelect: 'none',
    textAlign: 'left',
    '& > div': { 
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  },
  imageAndInfo: {
    width: '60%',
    '& > div': {
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  },
  imageWrapper: {
    position: 'relative',
    height: LIST_PRODUCT_HEIGHT_PX,
    width: LIST_PRODUCT_HEIGHT_PX
  },
  nameAndPrice: {
    padding: `0 ${theme.spacing.unit}px`,
    maxWidth: 'calc(100% - 56px)'
  },
  name: {
    ...theme.typography.textEllipsis,
    maxWidth: '100%',
    fontSize: theme.fontSizes.MD,
    fontWeight: 500
  },
  price: {
    fontWeight: 600,
    fontSize: theme.fontSizes.SM,
  },
  partialPriceAndClose: {
    height: '100%',
    width: 'calc(40% - 90px)',
    textAlign: 'right'
  },
  partialPrice: {
    fontSize: theme.fontSizes.SM,
    fontWeight: 400
  },
});

class MiniCartProduct extends Component {

  render() {
    const { classes, product, handleUpdateCart, stockQuantity } = this.props;

    return (
      <div
        id={`cart-product-${product.id}`}
        className={classes.wrapper}
      >
        <div className={classes.imageAndInfo}>
          <div className={classes.imageWrapper}>
            <Image
              width={LIST_PRODUCT_HEIGHT}
              height={LIST_PRODUCT_HEIGHT}
              alt={product.name}
              src={product.imageUrl} />
          </div>
          <div className={classes.nameAndPrice}>
            <h4 className={classes.name} title={product.name}>{product.name}</h4>
            <h4 className={classes.price}>{product.fullPrice}</h4>
          </div>
        </div>
        <QuantitySelector
          mini
          changeAction={handleUpdateCart}
          item={product}
          quantity={product.quantity}
          maxQuantity={stockQuantity}
        />
        <div className={classes.partialPriceAndClose}>
          <h5 className={classes.partialPrice}>
            {Formatter.currency(product.partialPrice)}
          </h5>
        </div>
      </div>
    )
  }
}

MiniCartProduct = withStyles(styles)(MiniCartProduct);

export { MiniCartProduct };