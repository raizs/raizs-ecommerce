import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Icon, Button } from '@material-ui/core';
import compose from 'recompose/compose';

import { Loading, ProductImage, ProductSummary, ProductFamilies, ProductExtraInfos } from '../../molecules';
import { updateCartAction } from '../../store/actions';

import {  BaseContainer } from '../../helpers';
import { ProductController } from "./Product.controller";

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    display:"flex",
  	justifyContent:"center",
    alignItems:"center",
    minHeight:"600px",
  },
  whiteBox:{
    width:"1024px",
    backgroundColor:"white",
    display:"flex",
  	justifyContent:"space-between",
    alignItems:"top",
    paddingRight:10*theme.spacing.unit,
    paddingLeft:10*theme.spacing.unit,
    paddingTop:8*theme.spacing.unit,
    paddingBottom:6*theme.spacing.unit,

  },
  rightBox:{
    width:"350px",
  },
  goBackButton:{
    color: theme.palette.green.main,
    fontSize: theme.fontSizes.SM,
    position:"absolute",
    top:3*theme.spacing.unit,
    left: 10*theme.spacing.unit,
    fontWeight:800,
    padding: theme.spacing.unit,
    cursor:"pointer"
  },
  goBackIcon:{
    color: theme.palette.green.main,
    verticalAlign:"middle",
  },
  
  relativeBox:{
    position:"relative",
  },

});

class Product extends BaseContainer {

  constructor(props){
    super(props, ProductController)
    
    this.state = {
      loading: true,
      product:null
    }
  }


  
  componentWillMount(){
    console.log("LOGANDO MOUNT")
    // this.controller.fetchProduct(this.props)
  }

  componentWillReceiveProps(nextProps){
    // this.controller.fetchProduct(nextProps)
  }

	render() {
		const { classes, cart } = this.props;
    let product = this.props.product || this.state.product;

		if (!product){
			return <div className={classes.wrapper}>
				<Loading/>
			</div>
		}
	    return (
        <div className={classes.wrapper}>
            <Button id='checkout' className={classes.button} onClick={()=>this.props.history.push("/alface-americana-organica-unidade-raizs/p")}>
            MUDAR DE PAGINA    
          </Button>

          <div className={classes.relativeBox}>

            <div onClick={this.props.history.goBack}className={classes.goBackButton}>
              <Icon fontSize="small" className={classes.goBackIcon}>arrow_back_ios</Icon>
              Voltar
            </div>

            <div className={classes.whiteBox}>
              <div className={classes.leftBox}>
                <ProductImage src={product.imageUrl} alt={product.description} />
                <ProductFamilies product={product}/>
              </div>


              <div className={classes.rightBox}>
                <ProductSummary handleUpdateCart={this.controller.handleUpdateCart} product={product} cart={cart}/>
                <ProductExtraInfos product={product} />
              </div>

            </div>
          </div>
        </div>
	    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart.current,
  product: state.products.currentProduct
})

export default compose(
	withStyles(styles),
	withRouter,
	connect(mapStateToProps, { updateCartAction }),
)(Product);
