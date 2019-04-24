import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import { MiniDatePickerHelper, Formatter } from '../../../../helpers';

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
    fontWeight: 600
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
    fontSize: theme.fontSizes.XS
  },
  productName: {
    ...theme.typography.textEllipsis,
    width: '60%'
  },
  productQuantity: {
    width: '15%',
    textAlign: 'center'
  },
  productValue: {
    width: '25%',
    textAlign: 'right'
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

  _renderProducts() {
    const { cart, classes } = this.props;
    
    return cart.items.map(({ product, quantity }) =>
      <div className={classes.product}>
        <div className={classes.productName}>{product.name}</div>
        <div className={classes.productQuantity}>{quantity}</div>
        <div className={classes.productValue}>{Formatter.currency(product.price * quantity)}</div>
      </div>
    );
  }

  render() {
    const { classes, selectedDate, cart } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.title}>ENTREGA</div>
        <div className={classes.date}>{this.state.dates[selectedDate].prefix}</div>
        <div className={classes.weekday}>{this.state.dates[selectedDate].suffix}</div>
        <div className={classes.hourLabel}>HORÁRIO DE ENTREGA</div>
        <div className={classes.hour}>07h30 até 13h00</div>
        <div className={classes.title}>RESUMO</div>
        <div className={classes.productCount}>{`${cart.productCount} Produto${cart.productCount > 1 ? 's' : ''}`}</div>
        <div className={classes.productList}>
          {this._renderProducts()}
        </div>
        <div className={classes.keyValue}>
          <div className={classes.subtitle}>SUBTOTAL</div>
          <div className={classes.subValue}>{Formatter.currency(cart.subtotal)}</div>
        </div>
        <div className={classes.keyValue}>
          <div className={classes.subtitle}>FRETE</div>
          <div className={classes.subValue}>{Formatter.currency(9.9)}</div>
        </div>
        <div className={classes.keyValue} style={{ marginTop: '24px' }}>
          <div className={classes.total}>TOTAL</div>
          <div className={classes.total}>{Formatter.currency(cart.subtotal + 9.9)}</div>
        </div>
      </div>
    )
  }
}

SummarySection = withStyles(styles)(SummarySection);

export { SummarySection };