import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import compose from 'recompose/compose';
import classnames from "classnames";
import { closeConfirmationModalAction } from '../../store/actions';

import { Modal } from '../../components';

const styles = theme => ({
  modalContent: {
    fontSize: theme.fontSizes.MMD,
    lineHeight: theme.fontSizes.LG,
    textAlign: 'center'
  },
  buttonsBox: {
  	display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  button: {
    '&#confirmation-confirm': theme.buttons.primary,
    '&#confirmation-cancel': theme.buttons.secondary,
    margin: `${3*theme.spacing.unit}px ${2*theme.spacing.unit}px 0 ${2*theme.spacing.unit}px`,
    maxWidth: '50%'
  },
  errorButton: {
  	backgroundColor: theme.palette.red
  },
  title: {
    fontSize: theme.fontSizes.LG,
    fontWeight: 700,
    textAlign: "center",
    width: "100%",
    marginBottom: 2*theme.spacing.unit,
  },
  errorTitle: {
    color:theme.palette.red
  }

});

class ConfirmationModal extends Component {

  _renderButtons() {
    let { classes, modal, closeConfirmationModalAction } = this.props;
    let buttonClasses = [classes.button];
    modal.confirmationError && buttonClasses.push(classes.errorButton)

  	if (!modal.confirmationCallback) {
  		return <div className={classes.buttonsBox}>
        <Button id='confirmation-confirm' className={classnames(buttonClasses)} onClick={closeConfirmationModalAction}>
          {modal.confirmationLabel || 'CONFIRMAR'}
        </Button>
  		</div>
    }
    
  	return <div className={classes.buttonsBox}>
      <Button id='confirmation-cancel' className={classnames(buttonClasses)} onClick={closeConfirmationModalAction}>
        {modal.cancelLabel || 'CANCELAR'}
      </Button>
      <Button id='confirmation-confirm' className={classnames(buttonClasses)} onClick={modal.confirmationCallback}>
        {modal.confirmationLabel || 'CONFIRMAR'}
      </Button>
    </div>;
  }

  _renderModalContent() {
    const { classes, modal } = this.props;
    let titleClasses = [classes.title];
    modal.confirmationError && titleClasses.push(classes.errorTitle);

    return <div className={classes.modalContent}>
    	<div className={classnames(titleClasses)}>{modal.confirmationTitle}</div>          
    	{modal.confirmationMessage}
    	{this._renderButtons()}
    </div>;
  }

  render() {
    const { modal, closeConfirmationModalAction } = this.props;
    return (
      <Modal open={modal.confirmation} width="500px" handleClose={closeConfirmationModalAction} closeIcon>
        {modal.confirmation && this._renderModalContent()}
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
