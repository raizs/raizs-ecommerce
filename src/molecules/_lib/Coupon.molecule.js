import React from 'react'
import { withStyles, Button, Icon } from '@material-ui/core';
import classnames from 'classnames';
import { TextInput, Loading } from "../";
import { BaseContainer } from "../../helpers";
import { CouponController } from "./controllers/Coupon.controller.js";
import compose from 'recompose/compose';
import { connect } from "react-redux";
import { setCouponAction } from "../../store/actions";


const styles = theme => ({
  wrapper: {
    // padding: `${2*theme.spacing.unit}px 0`,
    width:"350px",
    position:"relative",
  },
  inputBox:{
    width:"250px",
    display:"inline-block",
    verticalAlign:"middle",
  },
  inputLabel:{
    fontSize: theme.fontSizes.XS,
    fontWeight:800,
    color: theme.palette.black.main,
    marginBottom: theme.spacing.unit
  },
  inputValue:{
    ...theme.inputs.text,
    "&>input":{
      fontSize: theme.fontSizes.XS,
      height: "40px"

    }
  },
  searchButton:{
    ...theme.buttons.secondary,
    fontSize: theme.fontSizes.XS,
    display:"inline-block",
    verticalAlign:"bottom",
    height:"40px",
  },
  notFoundText:{
    fontSize:theme.fontSizes.SM,

  },
  notFoundButton:{
    padding: `${2*theme.spacing.unit}px 0`,
    cursor:"pointer",
    color:theme.palette.green.main,
    textDecoration:"underline",
    fontSize:theme.fontSizes.XS
  },
  relativeBox:{
    position:"relative",
    border: `1px solid ${theme.palette.gray.border}`, 
    borderRadius:theme.spacing.unit,
    padding: 4*theme.spacing.unit
  },
  flexBox:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection: "column",
  },
  couponCode:{
    padding: `${theme.spacing.unit}px 0`,
    fontSizes: theme.fontSizes.MD,
  },
  couponDescription:{
    padding: `${theme.spacing.unit}px 0`,
    fontSizes: theme.fontSizes.XS,
    color: theme.palette.gray.main,

  },
  closeIcon:{
    color:theme.palette.green.main,
    position:"absolute",
    top:"4px",
    right:"4px",
    fontSize:18,
    cursor:"pointer"
  }
});

class Coupon extends BaseContainer {

  constructor(props){
    super(props, CouponController);
  }

  state = {
    couponCode:"teste", 
    loading:false,
    searched:false,
    coupon:null, 
    errorMsg:""
  }

  _renderInput(){
    const { classes } = this.props;
    const { couponCode, loading, searched } = this.state;
    const { handleChange, handleSearch } = this.controller;

    return <span>
      <div className={classes.inputBox}>
        <TextInput 
          className={classes.inputValue}
          id="couponCode"
          error={null}
          value={couponCode}
          handleChange={handleChange}
          label="Digite o seu cupom de desconto"
          placeholder="Cupom"
          labelClassName={classes.inputLabel}
          />
      </div>
      <Button className={classes.searchButton} onClick={handleSearch} >
          Aplicar   
      </Button>
    </span>
  }

  _renderResult(){
    const { classes, coupon } = this.props;
    return <div className={classes.relativeBox}>
      <Icon onClick={this.controller.handleRestartCoupon} className={classes.closeIcon}>close</Icon>
      <div className={classes.flexBox}>
        <div className={classes.couponCode}>{coupon.code}</div>
        <div className={classes.couponDescription}>{coupon.description}</div>
      </div>
    </div>
  }

  _renderNotFound(){
    const { classes } = this.props;
    const { couponCode, errorMsg } = this.state;
    return <div>
      <div className={classes.notFoundText}>{errorMsg} </div>
      <div onClick={this.controller.handleRestartCoupon} className={classes.notFoundButton}>Inserir outro cupom</div>
    </div>
  }

  render() {
    const { classes, coupon } = this.props;
    const { couponCode, loading, searched } = this.state;
    const { handleChange, handleSearch } = this.controller;

    return (
      <div className={classes.wrapper}>
        { loading && <Loading absolute/> }
        { coupon ? this._renderResult():
          (searched ? 
            this._renderNotFound():
            this._renderInput()
          ) 
        }
       </div>
    )
  }
}

const mapStateToProps = state => ({
  coupon:state.coupon.selected,
  user: state.user.current,

});

Coupon = compose(
  withStyles(styles),
  connect ( mapStateToProps, { setCouponAction })
)(Coupon);

export { Coupon };