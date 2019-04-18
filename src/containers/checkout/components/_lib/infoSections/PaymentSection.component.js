import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Collapse, Button } from '@material-ui/core';
import classnames from 'classnames'; 

import { Loading, PickABox } from '../../../../../molecules';
import { paymentMethods } from '../../../../../assets';
import { PaymentCreditCardForm } from '.';

const styles = theme => ({
  section: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  title: {
    backgroundColor: theme.palette.green.main,
    borderTopRightRadius: theme.spacing.unit,
    borderTopLeftRadius: theme.spacing.unit,
    padding: theme.spacing.unit,
    userSelect: 'none',
    '& > *': {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    '&.-inactive': {
      backgroundColor: theme.palette.gray.darkBg,
      borderRadius: theme.spacing.unit
    }
  },
  number: {
    color: 'white',
    fontWeight: 600,
    height: 3 * theme.spacing.unit,
    width: 3 * theme.spacing.unit,
    lineHeight: `${3 * theme.spacing.unit}px`,
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, .3)',
    '&.-inactive': {
      color: theme.palette.gray.main,
      backgroundColor: 'white'
    }
  },
  label: {
    color: 'white',
    fontWeight: 600,
    marginLeft: theme.spacing.unit,
    '&.-inactive': {
      color: theme.palette.gray.main
    }
  },
  content: {
    position: 'relative',
    marginTop: 3 * theme.spacing.unit,
    marginBottom: 3 * theme.spacing.unit,
    padding: `0 ${3 * theme.spacing.unit}px`
  },
  formTitle: {
    ...theme.typography.formTitle,
    textAlign: 'left'
  },
  doneWrapper: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit
  },
  doneNumber: {
    display: 'inline-block',
    color: theme.palette.green.main,
    fontWeight: 600,
    height: 3 * theme.spacing.unit,
    width: 3 * theme.spacing.unit,
    lineHeight: `${3 * theme.spacing.unit}px`,
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: theme.palette.gray.bg
  },
  doneLabel: {
    display: 'inline-block',
    color: theme.palette.gray.main,
    fontWeight: 600,
    marginLeft: theme.spacing.unit
  },
  doneInfo: {
    color: theme.palette.gray.main,
    lineHeight: '1.375em'
  },
  doneChange: {
    color: theme.palette.black,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: theme.fontSizes.SM,
    fontWeight: 600,
    '&:hover': {
      color: theme.palette.green.main
    }
  },
  button: {
    ...theme.buttons.secondary,
    marginTop: 3 * theme.spacing.unit
  }
});

class PaymentSection extends Component {

  static propTypes = {
    prop: PropTypes.object,
  }

  _renderSelectedMethodForm() {
    const {
      selectedPaymentMethod,
      handleChange,
      handleCheckboxChange,
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave
    } = this.props;

    const toCreditCardForm = {
      handleChange,
      handleCheckboxChange,
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave
    };

    const Comp = {
      creditCard: PaymentCreditCardForm
    }[selectedPaymentMethod];

    const toComp = {
      creditCard: toCreditCardForm
    }[selectedPaymentMethod];

    if(Comp) return <Comp {...toComp} />
  }

  _renderCollapsibleContent() {
    const {
      classes,
      paymentSectionLoading,
      handleSelectPaymentMethod,
      selectedPaymentMethod
    } = this.props;

    return (
      <div>
        { paymentSectionLoading && <Loading absolute /> }

        <div className={classes.whole}>
          <h3 className={classes.formTitle}>Escolha uma forma de pagamento</h3>
          <PickABox
            id='paymentMethod'
            handleSelect={handleSelectPaymentMethod}
            selectedId={selectedPaymentMethod}
            options={paymentMethods}
          />
          {this._renderSelectedMethodForm()}
          <Button onClick={() => console.log('finalizar')} className={classes.button}>Finalizar Pedido</Button>
        </div>
      </div>
    )
  }

  _renderCollapsible() {
    const { classes, openedSection, isUserSectionDone, isAddressSectionDone } = this.props;
    const isOpen = openedSection === 'payment';

    const isInacitve = !isUserSectionDone || !isAddressSectionDone;
    const titleClasses = [classes.title],
      numberClasses = [classes.number],
      labelClasses = [classes.label];
    if(isInacitve) {
      titleClasses.push('-inactive');
      numberClasses.push('-inactive');
      labelClasses.push('-inactive');
    }

    return (
      <div className={classes.section}>

        <div className={classnames(titleClasses)}>
          <div className={classnames(numberClasses)}>3</div>
          <h4 className={classnames(labelClasses)}>PAGAMENTO</h4>
        </div>
        
        <Collapse in={isOpen}>
          <div className={classes.content}>
            {this._renderCollapsibleContent()}
          </div>
        </Collapse>
      </div>
    );
  }

  _renderDone() {
    const { classes, handleOpenSection } = this.props;
    return (
      <div className={classes.doneWrapper}>
        <div>
          <div className={classes.doneNumber}>3</div>
          <h4 className={classes.doneLabel}>PAGAMENTO</h4>
        </div>
        {this._renderDoneInfo()}
        <div className={classes.doneChange} onClick={() => handleOpenSection('payment')}>
          alterar
        </div>
      </div>
    );
  }

  _renderDoneInfo() {
    const { classes, selectedPayment } = this.props;
    return selectedPayment ? (
      <div>
        <div className={classes.doneInfo}>{selectedPayment.name}</div>
        <div className={classes.doneInfo}>{selectedPayment.receiverName}</div>
        <div className={classes.doneInfo}>{selectedPayment.cep}</div>
        <div className={classes.doneInfo}>{selectedPayment.formattedPayment}</div>
        <div className={classes.doneInfo}>{selectedPayment.formattedPayment2}</div>
      </div>
    ) : null;
  }

  _renderSection() {
    const { isPaymentSectionDone } = this.props;

    if(isPaymentSectionDone) return this._renderDone();
    return this._renderCollapsible();
  }

  render() {
    return this._renderSection();
  }
}

PaymentSection = withStyles(styles)(PaymentSection);

export { PaymentSection };