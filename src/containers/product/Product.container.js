import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import classnames from 'classnames'

import { Loading, ProductImage, ProductSummary } from '../../molecules';
import { updateCartAction } from '../../store/actions';

import {  BaseContainer } from '../../helpers';
import { ProductController } from "./Product.controller";

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    display:"flex",
  	justifyContent:"center",
  	alignItems:"center",
  },
  whiteBox:{
    width:"1024px",
    backgroundColor:"white",
    display:"flex",
  	justifyContent:"space-between",
    alignItems:"center",
    paddingRight:16*theme.spacing.unit,
    paddingLeft:16*theme.spacing.unit,
    paddingTop:6*theme.spacing.unit,
    paddingBottom:6*theme.spacing.unit,

  },
  infoWhiteBox:{
    width:"350px"
  },


});

class Product extends BaseContainer {

  constructor(props){
    super(props, ProductController)
  }

	state = {
    loading: true,
    product:null
	}

  
  componentWillMount(){
    this.controller.fetchProduct()
  }

	render() {
		const { classes, cart } = this.props;
    const { product } = this.state;

		if (!product){
			return <div className={classes.wrapper}>
				<Loading/>
			</div>
		}
    console.log(product)
	    return (
        <div className={classes.wrapper}>
          <div className={classes.whiteBox}>
            <ProductImage src={product.imageUrl} alt={product.description} />
            <div className={classes.infoWhiteBox}>
              <ProductSummary handleUpdateCart={this.controller.handleUpdateCart} product={product} cart={cart}/>
            </div>
          </div>

        </div>
	    )
  }
}

const mapStateToProps = state => ({
  saleOrders: state.saleOrders.orders,
  cart: state.cart.current
})

export default compose(
	withStyles(styles),
	withRouter,
	connect(mapStateToProps, { updateCartAction }),
)(Product);
