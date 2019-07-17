import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { TextInput } from '../../../../molecules';
import { BaseContainer } from '../../../../helpers';
import { dashboardGeneralForm } from "../../../../assets";

import { setUserAction } from '../../../../store/actions';

const styles = theme => ({
  wrapper: {
  	display: "flex",
  	justifyContent: "center",
  	alignItems: "center",
  	flexDirection: "column",
    width: "100%",
  },
  form:  {
    width: "100%",
    maxWidth: "800px",
    padding: 5 * theme.spacing.unit,
    verticalAlign: "top",
    backgroundColor: "white",
    borderRadius: theme.spacing.unit,
  },
  inputBox: {
    width:"50%",
    display:"inline-block",
    verticalAlign: "top",
    height: "76px"
  },
  inputLabel: {
    fontSize: theme.fontSizes.XS,
    fontWeight:800,
    color: theme.palette.black.main,
    marginBottom: theme.spacing.unit
  },
  inputValue: {
    ...theme.inputs.text,
    "& > input": {
      fontSize: theme.fontSizes.XS,
      height: "40px"
    }
  },
  buttonBox: {
  	textAlign: "center"
  },
  button: {
    ...theme.buttons.primary,
    fontSize: theme.fontSizes.MD,
    marginTop: 3 * theme.spacing.unit,
    width: "200px"
  }
});

class DashboardGeneralForm extends BaseContainer {

  state = {
    loading: true,
    errors: {}
  }
  
  componentWillMount() {
    if (this.props.user) {
      this.controller.userApiToState(this.props.user)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      this.controller.userApiToState(nextProps.user)
    }
  }
  
  _renderInputs() {
    const { handleChange } = this.controller
    const { classes } = this.props;
    return dashboardGeneralForm.map(field => {
      return <div className={classes.inputBox}>
        <TextInput 
          className={classes.inputValue}
          id={field.id}
          error={this.state.errors[field.id]}
          value={this.state[field.id]}
          handleChange={e => handleChange(e, field.format)}
          label={field.label}
          labelClassName={classes.inputLabel}
        />
      </div>
    });
  }

  render() {
    const { updateUser } = this.controller;
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <form className={classes.form}>
          {this._renderInputs()}
          <div className={classes.buttonBox}>
            <Button className={classes.button} onClick={updateUser} >
              Salvar    
            </Button>
          </div>
        </form>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user.current,
  saleOrders: state.saleOrders.orders
})

DashboardGeneralForm = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { setUserAction })
)(DashboardGeneralForm);

export { DashboardGeneralForm }