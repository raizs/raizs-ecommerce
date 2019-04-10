import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';

import styles from './styles/catalogProduct.styles'
import 'img-2';
import { QuantitySelector } from '../../../../molecules';

class CatalogProduct extends Component {
  state = {
    loadedImage: false,
    imageError: false
  }

  componentDidUpdate() {
    const el = document.querySelector(`div#product-${this.props.product.id} img-2`);
    const { shadowRoot } = document.querySelector(`div#product-${this.props.product.id} img-2`);

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
    const { classes, product, handleUpdateCart, cart } = this.props;

    return (
      <div id={`product-${product.id}`} className={classes.wrapper} onClick={() => console.log(product)}>
        <div className={classes.imageWrapper}>
          <img-2
            className={classes.image}
            width={248}
            height={224}
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
        <h6 className={classes.brand}>{product.brand}</h6>
        <h4 className={classes.name}>{product.name}</h4>
        <h4 className={classes.price}>{product.fullPrice}</h4>
       </div>
    )
  }
}

CatalogProduct = withStyles(styles)(CatalogProduct);

export { CatalogProduct };