import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import compose from 'recompose/compose';
import classnames from "classnames";
import { closeConfirmationModalAction } from '../../store/actions';

import { Modal } from '../../components';

const styles = theme => ({
  wrapper: {
  },
  modalContent:{
    padding:2*theme.spacing.unit,
    fontSize: theme.fontSizes.MMD,
    lineHeight: theme.fontSizes.LG
  },
  buttonsBox:{
  	display: "flex",
    alignItems:"center",
    justifyContent:"center",
    width:"100%"
  },
  button: {
    ...theme.buttons.primary,
    fontSize: theme.fontSizes.MMD,
    margin:`${3*theme.spacing.unit}px ${2*theme.spacing.unit}px 0 ${2*theme.spacing.unit}px`
  },
  errorButton:{
  	backgroundColor: theme.palette.red
  },
  title:{
    fontSize: theme.fontSizes.LG,
    fontWeight:800,
    textAlign:"center",
    width:"100%",
    marginBottom: 2*theme.spacing.unit,
    color:theme.palette.green.main
  },
  errorTitle:{
    color:theme.palette.red
  }

});

class ConfirmationModal extends Component {

  _renderButtons(){
    let { classes, modal, closeConfirmationModalAction } = this.props;
    let buttonClasses = [classes.button];
    modal.confirmationError && buttonClasses.push(classes.errorButton)
  	if (!modal.confirmationCallback){
  		return <div className={classes.buttonsBox}>
			<Button id='confirmation-confirm' className={classnames(buttonClasses)} onClick={closeConfirmationModalAction}>
				CONFIRMAR    
			</Button>
  		</div>
  	}
  	return <div className={classes.buttonsBox}>
		<Button id='confirmation-confirm' className={classnames(buttonClasses)} onClick={modal.confirmationCallback}>
			CONFIRMAR    
		</Button>
		<Button id='confirmation-cancel' className={classnames(buttonClasses)} onClick={closeConfirmationModalAction}>
			CANCELAR    
		</Button>
	</div>
  }

  _renderModalContent() {
    const { classes, modal } = this.props;
    let titleClasses = [classes.title];
    modal.confirmationError && titleClasses.push(classes.errorTitle)
    return <div className={classes.modalContent}>
    	<div className={classnames(titleClasses)}>{modal.confirmationTitle}</div>          
    	{modal.confirmationMessage}
    	{this._renderButtons()}
    </div>;
  }

  render() {
    const { classes, modal, closeConfirmationModalAction } = this.props;
    return (
      <Modal open={modal.confirmation} width="500px" handleClose={closeConfirmationModalAction} closeIcon>
        <div className={classes.wrapper} >
          {modal.confirmation && this._renderModalContent()}
        </div>
      </Modal>
    )
  }
}
  
const mapStateToProps = state => ({
  modal: state.modal,
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { closeConfirmationModalAction }),
)(ConfirmationModal);
