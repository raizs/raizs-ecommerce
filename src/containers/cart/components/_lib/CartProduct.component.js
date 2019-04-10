import React, { Component } from 'react'
import { withStyles, Icon } from '@material-ui/core';

import styles, { LIST_PRODUCT_HEIGHT } from './styles/cartProduct.styles'
import { QuantitySelector } from '../../../../molecules';
import { Formatter } from '../../../../helpers';

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
    const { classes, product, handleUpdateCart } = this.props;

    return (
      <div
        id={`cart-product-${product.id}`}
        className={classes.wrapper}
        onClick={() => console.log(product)}
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