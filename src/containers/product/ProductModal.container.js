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
    userSelect: 'none'
  },
  whiteBox:{
    width:"1024px",
    display:"flex",
  	justifyContent:"space-between",
    alignItems:"top",
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
    const { classes, cart, stockDate } = this.props;
    const { product } = this.state;
    return (
      <div className={classes.whiteBox}>
        <div>
          <ProductImage src={product.imageUrl} alt={product.description} />
          <ProductFamilies product={product}/>
        </div>
        <div>
          <ProductSummary
            stockDate={stockDate}
            handleUpdateCart={this.controller.handleUpdateCart.bind(this)}
            product={product}
            cart={cart}
          />
          <ProductExtraInfos product={product} />
        </div>
      </div>
    );
            
  }

  render() {
    const { classes, modal, closeModalProductAction } = this.props;
    const { product } = this.state;

    return (
      <Modal grayBg open={modal} width="1024px" handleClose={closeModalProductAction} closeIcon>
        <div className={classes.wrapper} >
          {product && this._renderModalContent()}
        </div>
      </Modal>
    )
  }
}
  
const mapStateToProps = state => ({
  cart: state.cart.current,
  modal: state.modal.product,
  product: state.modal.selectedProduct,
  stockDate: state.datePicker.obj.stockDate
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { closeModalProductAction, updateCartAction }),
)(Product);
