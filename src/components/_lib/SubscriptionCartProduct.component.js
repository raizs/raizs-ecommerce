import React, { Component } from 'react'
import { withStyles, Icon, Select, MenuItem, Tooltip } from '@material-ui/core';

import { Formatter, MiniDatePickerHelper } from '../../helpers';
import { QuantitySelector, PeriodicityTooltip } from '../../molecules';
import { periodicityHelpTexts } from '../../assets';

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
    justifyContent: 'space-between',
    '& div.select-and-help': {
      display: 'inline-block',
      '& span.material-icons': {
        verticalAlign: 'middle',
        fontSize: '20px',
        marginLeft: theme.spacing.unit,
        color: theme.palette.gray.main,
        cursor: 'pointer'
      }
    }
  },
  imageAndInfo: {
    display: 'flex',
    width: '40%'
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
    maxWidth: 'calc(100% - 88px)'
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
    width: '120px',
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px ${theme.spacing.unit / 2}px 0`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    '& > span.material-icons': {
      cursor: 'pointer'
    }
  },
  partialPrice: {
    fontSize: theme.fontSizes.SM,
    color: theme.palette.gray.main,
    fontWeight: 500
  }
});

class SubscriptionCartProduct extends Component {

  _renderSecondaryPeriodicity() {
    const { product, handleUpdateCart, stockDate } = this.props;
    const { periodicity, secondaryPeriodicity, quantity } = product;

    return {
      biweekly: (
        <div className='select-and-help'>
          <Select
            style={{ width: '160px', marginLeft: '24px' }}
            value={secondaryPeriodicity}
            onChange={e => handleUpdateCart({
              item: product,
              quantity: quantity,
              periodicity: periodicity,
              secondaryPeriodicity: e.target.value
            })}
          >
            <MenuItem value='first'>1ª semana</MenuItem>
            <MenuItem value='second'>2ª semana</MenuItem>
          </Select>
          <PeriodicityTooltip
            stockDate={stockDate}
            periodicity={periodicity}
            secondaryPeriodicity={secondaryPeriodicity}
          />
        </div>
      ),
      monthly: (
        <div className='select-and-help'>
          <Select
            style={{ width: '160px', marginLeft: '24px' }}
            value={secondaryPeriodicity}
            onChange={e => handleUpdateCart({
              item: product,
              quantity: quantity,
              periodicity: periodicity,
              secondaryPeriodicity: e.target.value
            })}
          >
            <MenuItem value='first'>1ª semana</MenuItem>
            <MenuItem value='second'>2ª semana</MenuItem>
            <MenuItem value='third'>3ª semana</MenuItem>
            <MenuItem value='fourth'>4ª semana</MenuItem>
          </Select>
          <PeriodicityTooltip
            stockDate={stockDate}
            periodicity={periodicity}
            secondaryPeriodicity={secondaryPeriodicity}
          />
        </div>
      )
    }[periodicity];
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
            <h4 className={classes.name} title={product.name}>{product.name}</h4>
            <h4 className={classes.price}>{product.fullPrice}</h4>
          </div>
        </div>
        <div style={{ width: 'calc(60% - 280px)' }}>
          <Select
            style={{ width: '120px' }}
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
          {/*['biweekly', 'monthly'].includes(product.periodicity) && this._renderSecondaryPeriodicity()*/}
        </div>
        <div style={{ width: '160px', padding: '0 16px' }}>
          <QuantitySelector
            shouldClose={false}
            changeAction={handleUpdateCart}
            item={product}
            quantity={product.quantity}
            maxQuantity={stockQuantity}
          />
        </div>
        <div className={classes.partialPriceAndClose}>
          <h5 className={classes.partialPrice}>
            {Formatter.currency(product.partialPrice)}
          </h5>
          <Icon onClick={() => handleUpdateCart({ item: product, quantity: 0 })} fontSize='small'>close</Icon>
        </div>
      </div>
    )
  }
}

SubscriptionCartProduct = withStyles(styles)(SubscriptionCartProduct);

export { SubscriptionCartProduct };