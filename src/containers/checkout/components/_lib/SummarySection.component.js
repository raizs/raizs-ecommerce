import React, { Component } from 'react'
import classnames from 'classnames';
import { withStyles } from '@material-ui/core';
import { MiniDatePickerHelper, Formatter, StringMapper } from '../../../../helpers';
import { Transaction } from '../../../../entities';

const styles = theme => ({
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    padding: theme.spacing.unit
  },
  title: {
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit,
    fontSize: theme.fontSizes.SM,
    color: theme.palette.green.main,
    fontWeight: 700
  },
  subtitle: {
    fontSize: theme.fontSizes.XS,
    fontWeight: 500
  },
  date: {
    fontWeight: 700,
    fontSize: theme.fontSizes.MD,
    marginBottom: theme.spacing.unit / 2
  },
  weekday: {
    color: theme.palette.gray.main,
    fontSize: theme.fontSizes.SM,
    fontWeight: 500
  },
  hourLabel: {
    fontSize: theme.fontSizes.XXS,
    marginTop: 3 * theme.spacing.unit / 2,
    fontWeight: 700
  },
  hour: {
    fontSize: theme.fontSizes.MD,
    color: theme.palette.gray.main,
    fontWeight: 500,
    marginTop: theme.spacing.unit / 2,
    marginBottom: 2 * theme.spacing.unit
  },
  productCount: {
    fontSize: theme.fontSizes.SM,
    fontWeight: 600,
    marginTop: theme.spacing.unit
  },
  productList: {
    maxHeight: '270px',
    width: '100%',
    backgroundColor: theme.palette.gray.bg,
    padding: theme.spacing.unit,
    borderRadius: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    overflowY: 'auto'
  },
  product: {
    padding: theme.spacing.unit / 2,
    borderRadius: theme.spacing.unit,
    backgroundColor: 'white',
    '& > div': {
      display: 'inline-block'
    },
    '& + div': {
      marginTop: theme.spacing.unit
    },
    fontSize: theme.fontSizes.XS,
    '& > div.name': {
      ...theme.typography.textEllipsis,
      width: '60%'
    },
    '&.-subscription > div.name': {
      ...theme.typography.textEllipsis,
      width: '40%'
    },
    '& > div.periodicity': {
      width: '20%',
      textAlign: 'left'
    },
    '& > div.quantity': {
      width: '15%',
      textAlign: 'center'
    },
    '& > div.value': {
      width: '25%',
      textAlign: 'right'
    },
  },
  keyValue: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 2 * theme.spacing.unit
  },
  subValue: {
    fontSize: theme.fontSizes.MD,
    color: theme.palette.gray.main,
    fontWeight: 500
  },
  total: {
    fontSize: theme.fontSizes.LG,
    fontWeight: 700
  }
});

class SummarySection extends Component {
  state = {
    dates: MiniDatePickerHelper.generateDatesObject()
  }

  _renderProducts(key = null) {
    const { cart, subscriptionCart: { current }, classes } = this.props;
    const toMap = key ? current : cart;
    
    return toMap.items.map(({ product, quantity, periodicity }) => {
      const classNames = [classes.product];
      if(key) classNames.push('-subscription');

      return (
        <div key={product.id} className={classnames(classNames)}>
          <div className='name'>{product.name}</div>
          {periodicity && <div className='periodicity'>{StringMapper.periodicity(periodicity)}</div>}
          <div className='quantity'>{quantity}</div>
          <div className='value'>{Formatter.currency(product.price * quantity)}</div>
        </div>
      )
    });
  }


  _renderSummary() {
    const { classes, cart, subscriptionCart, subscriptionCart: { subscriptionName } } = this.props;
    const sCart = subscriptionCart.current;
    
    const to = [];

    const _renderCount = productCount => `${productCount} Produto${productCount > 1 ? 's' : ''}`;

    if(cart && cart.productCount) to.push(
      <div key='cart'>
        <div className={classes.productCount}>
          Pedido avulso - {_renderCount(cart.productCount)}
        </div>
        <div className={classes.productList}>
          {this._renderProducts()}
        </div>
      </div>
    );
    if(sCart && sCart.productCount) to.push(
      <div key='subscriptionCart'>
        <div className={classes.productCount}>
          Assinatura ({subscriptionName}) - {_renderCount(sCart.productCount)}
        </div>
        <div className={classes.productList}>
          {this._renderProducts('subscription')}
        </div>
      </div>
    );

    return to.length && to;
  }


  _renderDiscount(transaction){
    const { classes } = this.props;
    let { coupon } = transaction.totals.toChargeNow;
    if (!coupon) return null;
    return <div className={classes.keyValue}>
      <div className={classes.subtitle}>DESCONTO</div>
      <div className={classes.subValue}>-{Formatter.currency(coupon)}</div>
    </div>
  }


  _renderGiftCard(transaction){
    const { classes } = this.props;
    let { giftCard } = transaction.totals.toChargeNow;
    if (!giftCard) return null;
    return <div className={classes.keyValue}>
      <div className={classes.subtitle}>VALE</div>
      <div className={classes.subValue}>-{Formatter.currency(giftCard)}</div>
    </div>
  }

  render() {
    const { classes, selectedDate, cart, subscriptionCart, coupon, giftCard } = this.props;
    let transaction = new Transaction({cart, subcart:subscriptionCart, coupon, giftCard});
    const { totals } = transaction;
    const sCart = subscriptionCart.current;
    let { toChargeNow } = transaction.totals;

    return (
      <div className={classes.wrapper}>
        <div className={classes.title}>ENTREGA</div>
        <div className={classes.date}>{this.state.dates[selectedDate].prefix}</div>
        <div className={classes.weekday}>{this.state.dates[selectedDate].suffix}</div>
        <div className={classes.hourLabel}>HORÁRIO DE ENTREGA</div>
        <div className={classes.hour}>07h30 até 13h00</div>
        <div className={classes.title}>RESUMO</div>
        {this._renderSummary()}
        <div className={classes.keyValue}>
          <div className={classes.subtitle}>SUBTOTAL</div>
          <div className={classes.subValue}>{Formatter.currency(toChargeNow.subtotal)}</div>
        </div>
        <div className={classes.keyValue}>
          <div className={classes.subtitle}>FRETE</div>
          <div className={classes.subValue}>{Formatter.currency(toChargeNow.shipping)}</div>
        </div>
        {this._renderGiftCard(transaction)}
        {this._renderDiscount(transaction)}
        <div className={classes.keyValue} style={{ marginTop: '24px' }}>
          <div className={classes.total}>TOTAL</div>
          <div className={classes.total}>{Formatter.currency(toChargeNow.total)}</div>
        </div>
      </div>
    )
  }
}

SummarySection = withStyles(styles)(SummarySection);

export { SummarySection };