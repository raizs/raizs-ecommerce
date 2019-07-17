import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import classnames from "classnames";
import { connect } from "react-redux";
import { Loading, TextInput } from '../../../../molecules';
import { DashboardFormsController } from "../../DashboardForms.controller"
import { BaseContainer } from '../../../../helpers';
import { dashboardAddressForm } from "../../../../assets";

import { setUserAction } from '../../../../store/actions';

const styles = theme => ({
  wrapper: {
  	display:"flex",
  	justifyContent:"center",
  	alignItems:"center",
  	flexDirection: "column",
    width:"100%",
    position:"relative"
  },
  form:{
    width:"100%",
    maxWidth:"800px",
    padding:5*theme.spacing.unit,
    verticalAlign: "top",
    backgroundColor: "white",
    borderRadius: theme.spacing.unit,
  },
  inputBox:{
    width:"50%",
    display:"inline-block",
    verticalAlign:"top",
    height:"76px"
  },
  small:{
    width:"25%"
  },
  big:{
    width:"75%"
  },
  inputLabel:{
    fontSize: theme.fontSizes.XS,
    fontWeight:800,
    color: theme.palette.black.main,
    marginBottom: theme.spacing.unit
  },
  inputValue:{
    ...theme.inputs.text,
    "&>input":{
      fontSize: theme.fontSizes.XS,
      height: "40px"

    }
  },
  checkboxInput: theme.inputs.checkbox,
  checkedCheckboxInput: theme.inputs.checkedCheckbox,
  buttonBox:{
  	textAlign:"center"
  },
  button: {
    ...theme.buttons.primary,
    fontSize: theme.fontSizes.MD,
    marginTop: 3 * theme.spacing.unit,
    width:"200px"
  }
});

class DashboardAddressForm extends BaseContainer {
  constructor(props) {
    super(props, DashboardFormsController);
  }

  state = {
    loading: false,
    new: true,
    errors: {}
  }

  getRandomNewUser() {
    const state = {...this.state}
    state.name = "Tia"
    state.receiverName = "Mãe"
    state.city = "São Paulo"
    state.cep = "02423-110"
    state.state= "SP"
    state.neighbourhood= "Lauzane Paulista"
    state.number= "120"
    state.street= "Rua Laudelino Bicudo"
    this.setState(state)
  }

  componentWillMount() {
    const { user, match } = this.props;
    if (user && user.addresses && user.addresses.all) this.controller.addressApiToState(user.addresses.all);
    if (match.params.id === "novo") this.getRandomNewUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.addresses && nextProps.user.addresses.all)
      this.controller.addressApiToState(nextProps.user.addresses.all)
  }
  
  _renderInputs() {
    const { handleChange, handleCepBlur } = this.controller
    const { classes } = this.props;

    return dashboardAddressForm.map(field => {
      let classNames = [classes.inputBox];
      if (field.className) classNames.push(classes[field.className]);

      return <div className={classnames(classNames)}>
        <TextInput 
          className={classes.inputValue}
          id={field.id}
          error={this.state.errors[field.id]}
          value={this.state[field.id]}
          handleChange={e => handleChange(e, field.format)}
          label={field.label}
          handleBlur={handleCepBlur}
          labelClassName={classes.inputLabel}
          />
      </div>;
  })

}

render() {
  const { manageAddress } = this.controller;
    const { classes } = this.props;
    
    return (
      <div className={classes.wrapper}>
        {this.state.loading && <Loading absolute/>}
        <form className={classes.form}>
          {this._renderInputs()}
         
          <div className={classes.buttonBox}>
            <Button id='editAddress' className={classes.button} onClick={manageAddress} >
              Salvar    
            </Button>
          </div>
        </form>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user.current,
  saleOrders: state.saleOrders.orders
})

DashboardAddressForm = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { setUserAction })
  )(DashboardAddressForm);
  export { DashboardAddressForm }