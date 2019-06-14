import React, { Component } from 'react'
import { withStyles, Icon } from '@material-ui/core';

import { QuantitySelector } from '../../molecules';
import { Formatter } from '../../helpers';

const LIST_PRODUCT_HEIGHT = 72;
const LIST_PRODUCT_HEIGHT_PX = '72px';

const styles = theme => ({
  wrapper: {
    width: '100%',
    maxWidth: '1110px',
    height: LIST_PRODUCT_HEIGHT_PX,
    backgroundColor: 'white',
    marginBottom: theme.spacing.unit,
    borderRadius: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageAndInfo: {
    display: 'flex',
    width: '30%'
  },
  imageWrapper: {
    position: 'relative',
    height: LIST_PRODUCT_HEIGHT_PX,
    width: LIST_PRODUCT_HEIGHT_PX
  },
  image: {
    '& img': {
      borderRadius: theme.spacing.unit
    }
  },
  nameAndPrice: {
    padding: `0 ${2 * theme.spacing.unit}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '100%'
  },
  name: {
    ...theme.typography.textEllipsis,
    maxWidth: '100%',
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
  },
  partialPriceAndClose: {
    height: '100%',
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px ${theme.spacing.unit / 2}px 0`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  partialPrice: {
    fontSize: theme.fontSizes.SM,
    color: theme.palette.gray.main,
    fontWeight: 500
  },
});

class CartProduct extends Component {
  state = {
    loadedImage: false,
    imageError: false
  }

  componentDidUpdate() {
    const el = document.querySelector(`div#cart-product-${this.props.product.id} img-2`);
    const { shadowRoot } = document.querySelector(`div#cart-product-${this.props.product.id} img-2`);

    if(!this.state.loadedImage && shadowRoot) {
      const context = this;
      const img = Array.from(shadowRoot.childNodes).pop();

      if(el.loaded) {
        context.setState({ loadedImage: true })
      }

      img.onerror = () => {
        context.setState({ loadedImage: true, imageError: true });
      }
    }
  }
  
  render() {
    const { classes, product, handleUpdateCart, stockQuantity } = this.props;

    return (
      <div
        id={`cart-product-${product.id}`}
        className={classes.wrapper}
      >
        <div className={classes.imageAndInfo}>
          <div className={classes.imageWrapper}>
            <img-2
              className={classes.image}
              width={LIST_PRODUCT_HEIGHT}
              height={LIST_PRODUCT_HEIGHT}
              alt={product.name}
              src={product.imageUrl}
              src-preview={product.imageUrl}
              >
            </img-2>
          </div>
          <div className={classes.nameAndPrice}>
            <h4 className={classes.name}>{product.name}</h4>
            <h4 className={classes.price}>{product.fullPrice}</h4>
          </div>
        </div>
        <QuantitySelector
          changeAction={handleUpdateCart}
          item={product}
          quantity={product.quantity}
          maxQuantity={stockQuantity}
        />
        <div className={classes.partialPriceAndClose}>
          <h5 className={classes.partialPrice}>
            {Formatter.currency(product.partialPrice)}
          </h5>
          <Icon fontSize='small'>close</Icon>
        </div>
      </div>
    )
  }
}

CartProduct = withStyles(styles)(CartProduct);

export { CartProduct };