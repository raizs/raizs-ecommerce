import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import classnames from 'classnames'

import { Loading, ProductImage } from '../../molecules';
import {  BaseContainer } from '../../helpers';
import { ProductController } from "./Product.controller";

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    minHeight: "400px",
    display:"flex",
  	justifyContent:"center",
  	alignItems:"center",
  },
  whiteBox:{
    width:"1024px",
    backgroundColor:"white",
  	minHeight: "400px",
  }

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
		const { classes } = this.props;
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
          </div>

        </div>
	    )
  }
}

const mapStateToProps = state => ({
	saleOrders: state.saleOrders.orders
})

export default compose(
	withStyles(styles),
	withRouter,
	connect(mapStateToProps, {}),
)(Product);
