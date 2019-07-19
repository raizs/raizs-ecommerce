import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';

import { Loading, ProductImage, ProductSummary, ProductFamilies, ProductExtraInfos } from '../../molecules';
import { updateCartAction } from '../../store/actions';

import {  BaseContainer } from '../../helpers';
import { ProductController } from "./Product.controller";
import { ProductComponent } from './Product.component';

class Product extends BaseContainer {

  constructor(props){
    super(props, ProductController)
    
    this.state = {
      loading: true,
      product:null
    }
  }
  
  // componentWillMount(){
    
  //   this.controller.fetchProduct(this.props)
  // }

  // componentWillReceiveProps(nextProps){
  //   this.controller.fetchProduct(nextProps)
  // }

	render() {
		const { cart } = this.props;
    let product = this.props.product || this.state.product;

		// if (!product){
		// 	return <div className={classes.wrapper}>
		// 		<Loading/>
		// 	</div>
		// }
	    return <ProductComponent product={product} />;
  }
}

const mapStateToProps = state => ({
  cart: state.cart.current,
  product: state.products.currentProduct
})

export default compose(
	withRouter,
	connect(mapStateToProps, { updateCartAction }),
)(Product);
