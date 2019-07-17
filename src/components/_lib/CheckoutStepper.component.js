import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { withStyles, Stepper, Step, StepLabel, StepConnector } from '@material-ui/core';
import compose from 'recompose/compose';

const styles = theme => ({
  stepper: {
    padding: 0,
    paddingTop: '20px',
    userSelect: 'none'
  },
  active: {
    fontWeight: '700 !important'
  },
  completed: {
    fontWeight: '500 !important',
    color: `${theme.palette.green.main} !important`
  },
  line: {
    borderWidth: '1.2px'
  },
  completedLine: {
    '& > span': {
      borderColor: theme.palette.green.main
    }
  }
})

const steps = {
  carrinho: {
    label: 'CARRINHO',
    id: 'carrinho',
    number: 0
  },
  checkout: {
    label: 'CHECKOUT',
    id: 'checkout',
    number: 1
  },
  'pedido-finalizado': {
    label: 'PEDIDO FINALIZADO',
    id: 'pedido-finalizado',
    number: 2
  }
};

class CheckoutStepper extends Component {
  state = {
    activeStepNumber: 0,
    activeStepId: 'carrinho'
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.currentPath;

    if(id !== this.state.activeStepId) {
      this.setState({ activeStepNumber: steps[id].number, activeStepId: id });
    }
  }

  render() {
    const { classes } = this.props;
    const { activeStepNumber } = this.state;

    return (
      <Stepper
        activeStep={activeStepNumber}
        className={classes.stepper}
        connector={
          <StepConnector classes={{
            line: classes.line,
            completed: classes.completedLine,
            active: classes.completedLine
          }} />
        }
      >
        {Object.values(steps).map(step =>
          <Step key={step.id} completed={activeStepNumber > step.number}>
            <StepLabel
              icon={null}
              className={classes.label}
              classes={{
                active: classes.active,
                completed: classes.completed
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        )}
      </Stepper>
    )
  }
}

CheckoutStepper = compose(
  withStyles(styles),
  withRouter
)(CheckoutStepper);

export { CheckoutStepper };