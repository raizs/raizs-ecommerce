import React, { Component } from 'react'
import { withStyles, Icon, Select, MenuItem } from '@material-ui/core';

import { Formatter } from '../../helpers';
import { QuantitySelector } from '../../molecules';


const LIST_PRODUCT_TOP_HEIGHT = 48;
const LIST_PRODUCT_TOP_HEIGHT_PX = '48px';

const LIST_PRODUCT_HEIGHT_PX = '72px';

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
      '&.top': {
        height: 48,
        '& > div': { 
          display: 'inline-block',
          verticalAlign: 'middle'
        }
      },
      '&.bottom': {
        paddingTop: '4px',
        '& > div': {
          display: 'inline-block',
          width: 'calc(50% - 16px)',
          margin: '0 8px 8px 8px',
          verticalAlign: 'bottom',
          fontSize: theme.fontSizes.SM
        }
      },
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
    height: LIST_PRODUCT_TOP_HEIGHT_PX,
    width: LIST_PRODUCT_TOP_HEIGHT_PX
  },
  image: {
    '& img': {
      borderRadius: theme.spacing.unit
    }
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
    width: 'calc(40% - 90px)',
    textAlign: 'right'
  },
  partialPrice: {
    fontSize: theme.fontSizes.SM,
    fontWeight: 400
  },

  select: {
    '& > div > div': {
      padding: 0,
      paddingBottom: '4px',
    }
  }
});

class MiniSubscriptionCartProduct extends Component {
  
  _renderSecondaryPeriodicity() {
    const { product, handleUpdateCart } = this.props;

    return {
      biweekly: (
        <Select
          value={product.secondaryPeriodicity}
          onChange={e => handleUpdateCart({
            item: product,
            quantity: product.quantity,
            periodicity: product.periodicity,
            secondaryPeriodicity: e.target.value
          })}
        >
          <MenuItem value='first'>1ª e 3ª semanas</MenuItem>
          <MenuItem value='second'>2ª e 4ª semanas</MenuItem>
        </Select>
      ),
      monthly: (
        <Select
          value={product.secondaryPeriodicity}
          onChange={e => handleUpdateCart({
            item: product,
            quantity: product.quantity,
            periodicity: product.periodicity,
            secondaryPeriodicity: e.target.value
          })}
        >
          <MenuItem value='first'>1ª semana</MenuItem>
          <MenuItem value='second'>2ª semana</MenuItem>
          <MenuItem value='third'>3ª semana</MenuItem>
          <MenuItem value='fourth'>4ª semana</MenuItem>
        </Select>
      )
    }[product.periodicity];
  }

  _renderPeriodicity() {
    const { product, handleUpdateCart, classes } = this.props;
    return (
      <div>
        <Select
          style={{ width: '100%' }}
          className={classes.select}
          value={product.periodicity}
          onChange={e => handleUpdateCart({
            item: product,
            quantity: product.quantity,
            periodicity: e.target.value
          })}
        >
          <MenuItem value='weekly'>Semanal</MenuItem>
          <MenuItem value='biweekly'>Quinzenal</MenuItem>
          <MenuItem value='monthly'>Mensal</MenuItem>
        </Select>
      </div>
    );
  }
  
  render() {
    const { classes, product, handleUpdateCart, stockQuantity } = this.props;

    return (
      <div
        id={`cart-product-${product.id}`}
        className={classes.wrapper}
      >

        <div className='top'>
          <div className={classes.imageAndInfo}>
            <div className={classes.imageWrapper}>
              <img-2
                className={classes.image}
                width={LIST_PRODUCT_TOP_HEIGHT}
                height={LIST_PRODUCT_TOP_HEIGHT}
                alt={product.name}
                src={product.imageUrl}
                src-preview={product.imageUrl}
                >
              </img-2>
            </div>
            <div className={classes.nameAndPrice}>
              <h4 className={classes.name} title={product.name}>{product.name}</h4>
              <h4 className={classes.price}>{product.fullPrice}</h4>
            </div>
          </div>
          <QuantitySelector
            mini
            item={product}
            shouldClose={false}
            quantity={product.quantity}
            maxQuantity={stockQuantity}
            changeAction={handleUpdateCart}
          />
          <div className={classes.partialPriceAndClose}>
            <h5 className={classes.partialPrice}>
              {Formatter.currency(product.partialPrice)}
            </h5>
          </div>
        </div>

        <div className='bottom'>
          {this._renderPeriodicity()}
          {['biweekly', 'monthly'].includes(product.periodicity) && this._renderSecondaryPeriodicity()}
        </div>

      </div>
    )
  }
}

MiniSubscriptionCartProduct = withStyles(styles)(MiniSubscriptionCartProduct);

export { MiniSubscriptionCartProduct };