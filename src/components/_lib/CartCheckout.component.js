import React, { Component } from 'react'
import classnames from 'classnames';
import { withStyles, LinearProgress, Button } from '@material-ui/core';

import { Formatter } from '../../helpers';
import { TextInput } from '../../molecules';

const styles = theme => ({
  wrapper: {
    width: '100%',
    maxWidth: '1100px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  box: {
    width: '50%',
    maxWidth: '360px',
    '& > h4': {
      fontSize: theme.fontSizes.LG,
      marginBottom: 2 * theme.spacing.unit
    },
    '& > p': {
      fontSize: theme.fontSizes.MD,
      color: theme.palette.gray.main,
      lineHeight: theme.fontSizes.MMD
    }
  },
  subtotalAndMinimumValue: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'right'
  },
  label: {
    fontSize: theme.fontSizes.XS,
    fontWeight: 600
  },
  value: {
    color: theme.palette.gray.main,
    fontWeight: 500,
    '&.error': {
      color: theme.palette.red
    }
  },
  info: {
    color: theme.palette.gray.main,
    fontSize: theme.fontSizes.XS,
    fontWeight: 500
  },
  cepSuccess: {
    marginTop: theme.spacing.unit
  },
  greenCep: {
    color: theme.palette.green.main,
    textDecoration: 'underline'
  },
  errorText: {
    color: theme.palette.red,
    fontSize: theme.fontSizes.XS,
    fontWeight: 500,
    marginTop: theme.spacing.unit / 2
  },
  shipping: {
    marginTop: 3 * theme.spacing.unit
  },
  textInput: {
    ...theme.inputs.text,
    marginTop: 2 * theme.spacing.unit
  },
  successButton: {
    ...theme.buttons.primary,
    width: '100%',
    fontSize: theme.fontSizes.LG,
    marginTop: 3 * theme.spacing.unit
  },
  errorButton: {
    ...theme.buttons.error,
    width: '100%',
    fontSize: theme.fontSizes.LG,
    marginTop: 3 * theme.spacing.unit
  }
});

class CartCheckout extends Component {
  state = {
    subscriptionName: ''
  }

  componentDidMount() {
    if(this.props.subscriptionName) this.setState({ subscriptionName: this.props.subscriptionName });
  }

  componentWillReceiveProps(nextProps) {
    const { subscriptionName } = nextProps;
    if(subscriptionName && !this.state.subscriptionName) this.setState({ subscriptionName });
  }

  _renderCheckoutButton() {
    const { classes, handleCheckout } = this.props;
    const { subscriptionName } = this.state;

    return (
      <Button
        onClick={() => handleCheckout(subscriptionName)}
        className={classes.successButton}
      >
        Adicionar ao carrinho
      </Button>
    );
  }

  render() {
    const { classes, cart, subtotalError, MINIMUM_VALUE } = this.props;
    const { subscriptionName } = this.state;

    const valueClasses = [classes.value];
    if(subtotalError) valueClasses.push('error');

    return (
      <div className={classes.wrapper}>
        <div className={classes.box}>
          <h4>Dê um nome para sua cesta</h4>
          <p>Você poderá editá-la em qualquer momento na área logada.</p>
          <TextInput
            value={subscriptionName}
            id='subscriptionName'
            placeholder='Digite um nome para sua cesta'
            handleChange={e => this.setState({ subscriptionName: e.target.value })}
            className={classes.textInput}
          />
        </div>
        <div className={classes.box}>
          <div className={classes.subtotalAndMinimumValue}>
            <p className={classes.label}>SUB TOTAL</p>
            <div>
              <p
                className={classnames(...valueClasses)}
                style={{ marginBottom: '8px' }}
              >
                {Formatter.currency(cart.subtotal)}
              </p>
              <p className={classes.info}>Valor mínimo: {Formatter.currency(MINIMUM_VALUE)}</p>
            </div>
          </div>
          {this._renderCheckoutButton()}
        </div>
      </div>
    )
  }
}

CartCheckout = withStyles(styles)(CartCheckout);

export { CartCheckout };