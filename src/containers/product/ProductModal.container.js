import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';

import { ProductImage, ProductSummary, ProductFamilies, ProductExtraInfos } from '../../molecules';
import { closeModalProductAction, updateCartAction } from '../../store/actions';

import {  BaseContainer } from '../../helpers';
import { ProductController } from "./Product.controller";
import { Modal } from '../../components';

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
    alignItems:"top",
    paddingRight:10*theme.spacing.unit,
    paddingLeft:10*theme.spacing.unit,
    paddingTop:6*theme.spacing.unit,
    paddingBottom:6*theme.spacing.unit,
  },
  rightBox:{
    width:"350px"
  }
});

class Product extends BaseContainer {
  constructor(props) {
    super(props, ProductController);
  }

	state = {
    loading: true,
    product: null
	}
  
  componentDidMount() {
    document.title = 'Raízs | Produto';
  }
  
  componentWillMount() {
    this.controller.fetchProduct(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.controller.fetchProduct(nextProps);
  }

  _renderModalContent() {
    const { classes,cart } = this.props;
    const { product } = this.state;
    return <div className={classes.whiteBox}>
            
      <div className={classes.leftBox}>
        <ProductImage src={product.imageUrl} alt={product.description} />
        <ProductFamilies product={product}/>
      </div>
    
      <div className={classes.rightBox}>
        <ProductSummary handleUpdateCart={this.controller.handleUpdateCart.bind(this)} product={product} cart={cart}/>
        <ProductExtraInfos product={product} />
      </div>
  
    </div>;
  }

  render() {
    const { classes, modal, closeModalProductAction } = this.props;
    const { product } = this.state;

    return (
      <Modal open={modal} width="1024px" handleClose={closeModalProductAction} closeIcon>
        <div className={classes.wrapper} >
          {product && this._renderModalContent()}
        </div>
      </Modal>
    )
  }
}
  
const mapStateToProps = state => ({
  saleOrders: state.saleOrders.orders,
  cart: state.cart.current,
  modal: state.modal.product,
  product: state.modal.selectedProduct
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { closeModalProductAction, updateCartAction }),
)(Product);
