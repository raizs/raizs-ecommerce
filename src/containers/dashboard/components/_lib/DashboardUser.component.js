import React, { Component } from 'react';
import { withStyles, Icon } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import classnames from "classnames";
import { connect } from "react-redux";
import { dashboardUserPersonalData } from "../../../../assets";
import { Loading } from '../../../../molecules';
import { UserAddressesRepository } from '../../../../repositories';
import { setUserAction } from '../../../../store/actions';
import { User } from '../../../../entities';

const styles = theme => ({
  box:{
    display:"inline-block",
    width:"100%",
    height:"800px",
    padding:5*theme.spacing.unit,
    verticalAlign:"top"
  },
  pageTitle:{
    ...theme.typography.bigTitle,
    textAlign:"left",
    marginBottom:4*theme.spacing.unit
  },
  whiteBox:{
    marginTop:4*theme.spacing.unit,
    backgroundColor: "white",
    width: "100%",
    borderRadius: theme.spacing.unit,
    padding:2*theme.spacing.unit,
    position:"relative",
  },
  whiteBoxTitle:{
     ...theme.typography.formTitle,
    textAlign:"left",
    marginBottom:2*theme.spacing.unit
  },
  personalData:{
    padding:theme.spacing.unit,
    width:"300px",
    display:"inline-block"
  },
  personalDataKey:{
    fontSize: theme.fontSizes.XS,
    display:"inline-block",
    fontWeight:800,
    color: theme.palette.black.main,
  },
  personalDataValue:{
    fontSize: theme.fontSizes.XS,
    display:"inline-block",
    color: theme.palette.gray.main,
  },
  personalDataInvisibleBox:{
    width:"600px"
  },
  underlineButton:{
    fontWeight:800,
    fontSize:theme.fontSizes.XS,
    textDecoration:"underline",
    display:"inline-block",
    paddingRight:2*theme.spacing.unit,
    cursor:"pointer"
  },
  rightCorner:{
    position:"absolute",
    top: 2*theme.spacing.unit,
    right: 2*theme.spacing.unit
  },
  addressBox:{
    width:"300px",
    display:"inline-block",
    verticalAlign:"middle",
    height:"150px",
    padding:2*theme.spacing.unit
  },
  addressName:{
    fontWeight:800,
    color: theme.palette.black.main,
    fontSize: theme.fontSizes.XS,
    marginBottom: theme.spacing.unit
  },
  addressLine:{
    color: theme.palette.gray.main,
    fontSize: theme.fontSizes.SM
  },
  separator:{
    display:"inline-block",
    backgroundColor: theme.palette.gray.bg,
    verticalAlign:"middle",
    height:"130px",
    width:"1px"
  },
  underlineButtonsBox:{
    marginTop:4*theme.spacing.unit
  },
  addNew:{
    position:"absolute",
    top: 2*theme.spacing.unit,
    right:2*theme.spacing.unit,
    cursor:"pointer"
  },
  addNewIcon:{
    display:"inline-block",
    verticalAlign:"middle",
    color: theme.palette.green.main

  },
  addNewText:{
    display:"inline-block",
    verticalAlign:"middle",
    color: theme.palette.green.main,
    marginLeft: theme.spacing.unit,
    textDecoration:"underline",
    fontWeight:800
  }
});

class DashboardUser extends Component{

  state = {
    loading:true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({loading:false})
    }
  }

  componentWillMount() {
    if (this.props.user) {
      this.setState({loading:false})
    }
  }

  _renderPersonalData() {
    const { classes, user } = this.props
    return dashboardUserPersonalData.map((data, key) => {
      return (
        <div className={classes.personalData} key={key}>
          <div className={classes.personalDataKey}>{data.label}:&nbsp;</div>          
          <div className={classes.personalDataValue}>{user[data.id]}</div>          
        </div>
      );  
    })

  }

  async deleteAddress(id, key) {
    const adressRepo = new UserAddressesRepository();
    const { user } = this.props;
    const promise = await adressRepo.remove(id)
    const userOriginal = user.original;
    userOriginal.children.splice(key,1)

    const newUser = new User(userOriginal);
    this.props.setUserAction(newUser)
  }


  _renderAddresses() {
    const { user, classes } = this.props;
    if (!user.addresses.all.length) return <div>Você ainda não tem interessos cadastrados</div>
    return user.addresses.all.map((adr, key)=>{
      return <span key={key}>
        {key == 0 || <div className={classes.separator}></div>}
        <div className={classes.addressBox}>
          <div className={classes.addressName}>{adr.name}</div>
          <div className={classes.addressLine}>{adr.formattedAddress}</div>
          <div className={classes.addressLine}>{adr.neighbourhood}</div>
          <div className={classes.addressLine}>CEP: {adr.cep}</div>
          <div className={classes.addressLine}>Complemento: {adr.complement || "-"}</div>
          <div className={classes.underlineButtonsBox}>
            <div className={classes.underlineButton} onClick={()=>this.props.history.push(`/painel/editar/endereco/${adr.id}`)}>alterar</div>
            <div className={classes.underlineButton} onClick={()=>this.deleteAddress(adr.id, key)}>excluir</div>
          </div>
        </div>
      </span>
    })
  }

  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return <div className={classes.box}>
        <Loading/>
      </div>
    }

    return (
      <div className={classes.box}>

        <h1 className={classes.pageTitle}>Perfil</h1>

        <div className={classes.whiteBox}>
          <div className={classes.whiteBoxTitle}>DADOS PESSOAIS</div>
          <div className={classes.personalDataInvisibleBox}>
            {this._renderPersonalData()}
            <div onClick={()=>this.props.history.push("/painel/editar/dados-pessoais")} className={classnames(classes.underlineButton, classes.rightCorner)}>alterar</div>
          </div>          
        </div>

        <div className={classes.whiteBox}>
          <div className={classes.whiteBoxTitle}>ENDEREÇOS SALVOS</div>
          {this._renderAddresses()}
          <div className={classes.addNew} onClick={()=>this.props.history.push("/painel/editar/endereco/novo")}>
            <Icon className={classes.addNewIcon}>add_circle_outline</Icon>
            <div className={classes.addNewText}>
              Adicione um novo endereço
            </div>
          </div>
        </div>

      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user.current,
  userAddresses: state.userAddresses.model,
})

DashboardUser = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, {setUserAction})
  )(DashboardUser);
export { DashboardUser }