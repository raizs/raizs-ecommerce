import React, { Component } from "react";
import { withStyles, Icon, Button } from "@material-ui/core";
import classnames from "classnames";
import { Formatter } from '../../helpers';

const styles = theme => ({
  wrapper: {
    width:"100%",
    position:"fixed",
    bottom:0,
    left:0,
    zIndex:10,
  },
  expandableButtonWrapper:{
    height:theme.sizes.CHECKOUT_BAR_HEIGHT,
    backgroundColor:theme.palette.green.main,
    display:"flex",
    justifyContent:"center",
    alignItems:"center", 
    cursor:"pointer"
  },
  expandableButtonText:{
    fontFamily:"raizs",
    fontSize: theme.fontSizes.XL,
    color:"white",
  },
  expandableButtonIcon:{
    color:"white",
    marginLeft:theme.spacing.unit
  },
  openBox:{
    backgroundColor: "white",
    height:"170px",
    transition: "0.2s"
  },
  closedBox:{
    height:0
  },
  flexContentBox:{
    height:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  infosBox:{
    width:"100%",
    maxWidth:"1200px",
    height:"100%",
    padding: `0 ${6*theme.spacing.unit}px`  
  },
  orderBox:{
    width:"20%",
    display:"inline-block",
    padding:3*theme.spacing.unit,
    verticalAlign:"top"
  },
  orderBoxTitle:{
    paddingBottom:2*theme.spacing.unit,
    fontWeight:800,
    fontSize:theme.fontSizes.MMD
  },
  orderBoxSubtotalKey:{
    color: theme.palette.gray.main,
    fontSize:theme.fontSizes.XXS
  },
  orderBoxSubtotalValue:{
    fontSize:theme.fontSizes.SM,
    paddingBottom:2*theme.spacing.unit,
  },
  checkListIcon:{
    color:theme.palette.gray.light,
    verticalAlign:"middle",
    marginRight: theme.spacing.unit,
    fontSize: theme.fontSizes.MMD
  },
  checkListItem:{
    verticalAlign:"top",
    display:"inline-block",
    fontSize: theme.fontSizes.XSM
  },
  totalsBox:{
    display: "inline-block",
    float: "right",
    verticalAlign:"top",
    width:"20%",
    padding:3*theme.spacing.unit,
  },
  totalsBoxTotalKey:{
    color: theme.palette.gray.main,
    fontSize:theme.fontSizes.XXS
  },
  totalsBoxTotalValue:{
    fontSize:theme.fontSizes.LG,
    fontWeight:800

  },
  totalsBoxShippingKey:{
    color: theme.palette.gray.main,
    fontSize:theme.fontSizes.XXS
  },
  totalsBoxShippingValue:{
    fontSize:theme.fontSizes.SM,
    paddingBottom:2*theme.spacing.unit,
  },
  checkoutButton:{
     ...theme.buttons.primary,
    width: '100%',
    fontSize: theme.fontSizes.LG,
    marginTop: 2*theme.spacing.unit
  }

});
 
class CheckoutBar extends Component {

  state = {
    open:false
  }

  _renderResumes(title, subtotal, itemsCount){
    const { classes } = this.props;

    return <div className={classes.orderBox}>
      <div className={classes.orderBoxTitle}>{title}</div>  
      <div className={classes.orderBoxSubtotalKey}>SUBTOTAL</div>
      <div className={classes.orderBoxSubtotalValue}>{Formatter.currency(subtotal)}</div>
      <Icon className={classes.checkListIcon}>check_circle</Icon>
      <div className={classes.checkListItem}>{itemsCount} itens</div>
    </div>
  }

  _renderTotalsBox(){
    const { classes, transaction, history } = this.props;
    return <div className={classes.totalsBox}>
        <div className={classes.totalsBoxShippingKey}>FRETE</div>
        <div className={classes.totalsBoxShippingValue}>{Formatter.currency(transaction.totals.toChargeNow.shipping)}</div>
        <div className={classes.totalsBoxTotalKey}>TOTAL</div>
        <div className={classes.totalsBoxTotalValue}>{Formatter.currency(transaction.totals.toChargeNow.total)}</div>
        <Button onClick={() => history.push('/checkout')} className={classes.checkoutButton}>CHECKOUT</Button>

    </div>

  }

  _renderOpenContent(){
    const { classes, transaction } = this.props;
    return <div className={classes.flexContentBox}>
      <div className={classes.infosBox}>
        {transaction.hasCart && this._renderResumes("Pedido Avulso", transaction.totals.immediate.subtotal, transaction.cart.productCount )}
        {transaction.hasSubcart && this._renderResumes(transaction.subcart.subscriptionName || "Assinatura", transaction.totals.recurrencies.first.subtotal, transaction.subcart.current.countItems("first") )}
        {this._renderTotalsBox()}
      </div>
    </div>
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    let boxClassNames = [classes.openBox];
    !open && boxClassNames.push(classes.closedBox);
    return (
      <div className={classes.wrapper}>
        <div className={classes.expandableButtonWrapper} onClick={()=>this.setState({open:!open})}>
          <div className={classes.expandableButtonText}>TUDO CERTO</div>
          <Icon style={{transform: open ? null : "rotate(180deg)"}} className={classes.expandableButtonIcon} >arrow_drop_down_circle</Icon>
        </div>
        <div className={classnames(boxClassNames)}>
          {open && this._renderOpenContent()}
        </div>
      </div>
    );
  }
}

CheckoutBar = withStyles(styles)(CheckoutBar);

export { CheckoutBar };