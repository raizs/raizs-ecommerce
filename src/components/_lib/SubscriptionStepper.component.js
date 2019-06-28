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
  label: {
    cursor: 'pointer !important'
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
  genericos: {
    label: 'GENÉRICOS',
    id: 'genericos',
    number: 0
  },
  complementos: {
    label: 'COMPLEMENTOS',
    id: 'complementos',
    number: 1
  },
  carrinho: {
    label: 'CARRINHO',
    id: 'carrinho',
    number: 2
  }
};

class SubscriptionStepper extends Component {
  state = {
    activeStepNumber: 0,
    activeStepId: 'genericos'
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.location.pathname.split('/')[2] || 'genericos';

    if(id !== this.state.activeStepId) {
      this.setState({ activeStepNumber: steps[id].number, activeStepId: id });
    }
  }

  render() {
    const { classes, history } = this.props;
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
              onClick={() => history.push(`/assinatura/${step.id}`)}
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

SubscriptionStepper = compose(
  withStyles(styles),
  withRouter
)(SubscriptionStepper);

export { SubscriptionStepper };