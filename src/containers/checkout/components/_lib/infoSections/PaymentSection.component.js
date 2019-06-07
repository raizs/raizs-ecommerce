import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Collapse, Button } from '@material-ui/core';
import classnames from 'classnames'; 

import { Loading, PickABox, Coupon, GiftCard } from '../../../../../molecules';
import { paymentMethods, paymentMethodsStrings } from '../../../../../assets';
import { PaymentCreditCardForm, PaymentDebitCardForm, PayPalForm } from '.';

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
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    '& > div': {
      display: 'inline-block',
      verticalAlign: 'top'
    },
    '& > div.title': {
      width: '240px'
    },
    '& > div.info': {
      width: 'calc(100% - 296px)'
    }
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
    textAlign: 'right',
    width: '56px',
    cursor: 'pointer',
    fontSize: theme.fontSizes.SM,
    fontWeight: 600,
    '&:hover': {
      color: theme.palette.green.main
    }
  },
  button: {
    ...theme.buttons.primary,
    marginTop: 3 * theme.spacing.unit
  }
});

class PaymentSection extends Component {

  static propTypes = {
    prop: PropTypes.object,
  }

  _renderSelectedMethodForm() {
    const {
      errors,
      selectedCard,
      selectedPaymentMethod,
      handleChange,
      handleCheckboxChange,
      handleSelectCard,
      handleCardNumberBlur,
      handleCardExpDateBlur,
      cards,
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave,
      debitCardNumber,
      debitCardName,
      debitCardExp,
      debitCardCvv,
      debitCardShouldSave
    } = this.props;

    const toCreditCardForm = {
      errors,
      handleChange,
      handleCheckboxChange,
      handleSelectCard,
      handleCardNumberBlur,
      handleCardExpDateBlur,
      cards,
      creditCardNumber,
      creditCardName,
      creditCardExp,
      creditCardCvv,
      creditCardShouldSave,
      selectedCard
    };

    const toDebitCardForm = {
      errors,
      handleChange,
      handleCheckboxChange,
      handleSelectCard,
      handleCardNumberBlur,
      handleCardExpDateBlur,
      cards,
      debitCardNumber,
      debitCardName,
      debitCardExp,
      debitCardCvv,
      debitCardShouldSave,
      selectedCard
    };

    const Comp = {
      creditCard: PaymentCreditCardForm,
      debitCard: PaymentDebitCardForm,
      payPal: PayPalForm
    }[selectedPaymentMethod];

    const compProps = {
      creditCard: toCreditCardForm,
      debitCard: toDebitCardForm
    }[selectedPaymentMethod];

    if(Comp) return <Comp {...compProps} />;
  }


  _renderCollapsibleContent() {
    const {
      classes,
      paymentSectionLoading,
      handleSelectPaymentMethod,
      handleSubmitPayment,
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
          <div style={{ marginTop: '32px' }}>
            {this._renderSelectedMethodForm()}
          </div>
          <Coupon/>
          <GiftCard/>
          <Button
            onClick={handleSubmitPayment}
            className={classes.button}
          >
            Continuar
          </Button>
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
        <div className='title'>
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
    const { classes, selectedCard, selectedPaymentMethod } = this.props;
    return selectedCard ? (
      <div className='info'>
        <div className={classes.doneInfo}>{paymentMethodsStrings[selectedPaymentMethod]}</div>
        <div className={classes.doneInfo}>{selectedCard.finalString}</div>
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