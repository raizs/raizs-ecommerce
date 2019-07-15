import React, { Component } from 'react'
import { withStyles, Icon } from '@material-ui/core';
import compose from 'recompose/compose';

import classnames from "classnames"
import { MiniDatePickerHelper } from '../../helpers';
import { QuantitySelector } from './QuantitySelector.molecule';

const styles = theme => ({
  summary: {
    position:"relative",
  },
  smallGrey: {
    fontSize: theme.fontSizes.XXS,
    color: theme.palette.gray.main,
    marginBottom: 2*theme.spacing.unit
  },
  title: {
    fontSize: theme.fontSizes.LG,
    color: theme.palette.black.main,
    marginBottom: 2*theme.spacing.unit
  },
  price: {
    fontSize: theme.fontSizes.MMD,
    color: theme.palette.gray.main,
    marginBottom: 2*theme.spacing.unit,
    fontWeight: 500
  },
  subtitle: {
    fontSize: theme.fontSizes.XS,
    lineHeight: theme.fontSizes.SM,
    color: theme.palette.gray.main,
    fontWeight: 500,
    marginBottom: 2*theme.spacing.unit
  },
  availabilityTitle: {
    color: theme.palette.black.main,
    fontWeight: 700,
    fontSize: theme.fontSizes.XSM,
    marginBottom: 2*theme.spacing.unit
  },
  inLineDateBox: {
    display:"inline-block",
    marginRight: 2 * theme.spacing.unit
  },
  flexDateBox: {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"column",
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    marginBottom: theme.spacing.unit,
    backgroundColor: theme.palette.green.main,
  },
  unavailableCircle: {
    backgroundColor: theme.palette.gray.light,
  },
  weekDay: {
    fontSize:theme.fontSizes.XS,
    fontWeight: 600,
    color: theme.palette.gray.main,
    marginBottom: .25 * theme.spacing.unit
  },
  fullDate: {
    fontSize:theme.fontSizes.XS,
    fontWeight: 600,
    color: theme.palette.gray.main
  },
  selectorBox: {
    paddingTop: 2 * theme.spacing.unit,
    paddingBottom: 2 * theme.spacing.unit
  }
  
});

class ProductSummary extends Component{

  _renderAvailability(){
    const { classes, product } = this.props;
    return MiniDatePickerHelper.generateDatesObject().map((day, key)=>{
      let circleClassNames=[classes.circle];
      if(!product.stock[day.stockDate]) circleClassNames.push(classes.unavailableCircle);

      return <div className={classes.inLineDateBox} key={key}>
          <div className={classes.flexDateBox}>
            <div className={classnames(circleClassNames)}></div>
            <div className={classes.weekDay}> {day.momentDate.format("ddd")}</div>
            <div className={classes.fullDate}> {day.momentDate.format("DD/MM")}</div>
          </div>
      </div>
    })
  }


  render(){
    const { classes, product, cart, handleUpdateCart, stockDate } = this.props;
    const quantity = cart.productQuantities[product.id] || 0;
    

    return (
      <div className={classes.summary}>
        <h4 className={classes.smallGrey}>{product.brandName}</h4>
        <h1 className={classes.title}>{product.name}</h1>
        <div className={classes.price}>{product.fullPrice}</div>
        <h2 className={classes.subtitle}>{product.description}</h2>

        <div className={classes.availabilityTitle}>DISPONIBILIDADE</div>        
        {this._renderAvailability()}
        <div className={classes.selectorBox}>
          <QuantitySelector
            withLabel
            changeAction={handleUpdateCart}
            item={product}
            quantity={quantity}
            maxQuantity={product.stock ? product.stock[stockDate] : 0}
          />
        </div>
      </div>
    )
  }
};


ProductSummary = compose(
  withStyles(styles),
  )(ProductSummary);

export { ProductSummary };