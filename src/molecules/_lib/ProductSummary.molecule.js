import React, { Component } from 'react'
import { withStyles, Icon } from '@material-ui/core';
import compose from 'recompose/compose';

import classnames from "classnames"
import { MiniDatePickerHelper } from '../../helpers';
import { QuantitySelector } from './QuantitySelector.molecule';




const styles = theme => ({
  summary:{
    position:"relative",
    height: "350px",
    width:"350px"
  },
  smallGrey:{
    fontSize: theme.fontSizes.XXS,
    color: theme.palette.gray.main,
    marginBottom:2*theme.spacing.unit
  },
  title:{
    fontSize: theme.fontSizes.LG,
    color: theme.palette.black.main,
    marginBottom:2*theme.spacing.unit
  },
  price:{
    fontSize: theme.fontSizes.MMD,
    color: theme.palette.gray.main,
    marginBottom:2*theme.spacing.unit

  },
  subtitle:{
    fontSize: theme.fontSizes.XS,
    color: theme.palette.gray.main,
    marginBottom:2*theme.spacing.unit,
    fontWeight:400,
    marginBottom: 4*theme.spacing.unit
  },
  availabilityTitle:{
    color: theme.palette.black.main,
    fontWeight:800,
    fontSize: theme.fontSizes.XS,
    marginBottom: 2*theme.spacing.unit

  },
  inLineDateBox:{
    width:"48px",
    display:"inline-block",
  },
  flexDateBox:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"column",
    height:"40px"

  },
  circle:{
    width:"10px",
    height:"10px",
    borderRadius: "5px",
    marginBottom: 0.5*theme.spacing.unit,
    backgroundColor:theme.palette.green.main,
  },
  unavailableCircle:{
    backgroundColor:theme.palette.gray.light,
  },
  weekDay:{
    fontSize:theme.fontSizes.XXS
  },
  fullDate:{
    fontSize:theme.fontSizes.XS
  },
  selectorBox:{
    paddingTop: 8*theme.spacing.unit
  }
  
});

class ProductSummary extends Component{
  constructor(props){
    super(props)

  }


  _renderAvailability(){
    const { classes } = this.props;
    return MiniDatePickerHelper.generateDatesObject().map((day, key)=>{
      let circleClassNames=[classes.circle];
      key % 2 || circleClassNames.push(classes.unavailableCircle);

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
    const { classes, product, cart, handleUpdateCart } = this.props;
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
          <QuantitySelector changeAction={handleUpdateCart} item={product} quantity={quantity}/>
        </div>
      </div>
    )
  }
};


ProductSummary = compose(
  withStyles(styles),
  )(ProductSummary);

export { ProductSummary };