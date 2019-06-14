import React from 'react'
import { withStyles, Button, Icon, FormControlLabel, Checkbox } from '@material-ui/core';
import classnames from 'classnames';
import { BaseContainer, Formatter } from "../../helpers";
import { GiftCardController } from "./controllers/GiftCard.controller.js";
import compose from 'recompose/compose';
import { connect } from "react-redux";
import { setGiftCardAction } from "../../store/actions";


const styles = theme => ({
  wrapper: {
    // padding: `${2*theme.spacing.unit}px 0`,
    width:"350px",
    position:"relative",
  },
  checkboxInput: theme.inputs.checkbox,  
  checkedCheckboxInput: theme.inputs.checkedCheckbox,
 
});

class GiftCard extends BaseContainer {

  constructor(props){
    super(props, GiftCardController);
  }

  state = {
    value:0,
    id:null
  }

  componentWillMount(){
    this.controller.getGiftCardValue();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.coupon != this.props.coupon){
      this.controller.getGiftCardValue();
    }
  }


  render() {
    const { classes, coupon, giftCard } = this.props;
    const { value } = this.state;
    if (!value) return null;

    return (
      <div className={classes.wrapper}>

        <FormControlLabel
          className={classes.checkboxInput}
          control={
            <Checkbox
              checked={!!giftCard.value}
              classes={{
                checked: classes.checkedCheckboxInput
              }}
              onChange={() => this.controller.handleGiftCard()}
              value="applicable"
            />
          }
          label={`Aplicar vale de ${Formatter.currency(value)}`}
        />
       </div>
    )
  }
}

const mapStateToProps = state => ({
  coupon:state.coupon.selected,
  giftCard:state.giftCard,
  user: state.user.current,
  cart: state.cart.current,
  subscriptionCart: state.subscriptionCart,

});

GiftCard = compose(
  withStyles(styles),
  connect ( mapStateToProps, { setGiftCardAction })
)(GiftCard);

export { GiftCard };