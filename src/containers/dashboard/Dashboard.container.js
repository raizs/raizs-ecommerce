import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';

import { SideMenu } from '../../molecules';
import { Route, Switch,Redirect } from 'react-router-dom';
import { dashboardSections } from "../../assets";
import { DashboardGeneral, DashboardUser, DashboardForms, DashboardOrders, DashboardOrder } from "./components"

const styles = theme => ({
  wrapper: {
    userSelect: 'none',
    backgroundColor: theme.palette.gray.bg,
    padding: 3*theme.spacing.unit,
    paddingTop: 0,
  },
  withMenuComponent: {
    width: "calc(100% - 250px)",
    display: "inline-block",
    verticalAlign: "top"
  }
});

class Dashboard extends Component {

  state = {
    name: ""
  }

  componentDidMount() {
    document.title = 'Raízs | Painel';
  }
  
  componentWillMount() {
    const { storeFirebase } = this.props;
    const isAuth = !storeFirebase.auth.isEmpty;

    // if(!isAuth) this.props.history.push('/');
  }

  componentWillReceiveProps(nextProps) {
    const { storeFirebase } = nextProps;
    const isAuth = !storeFirebase.auth.isEmpty;

    // if(!isAuth) this.props.history.push('/');
  }
  
	render() {
    const { wrapper, withMenuComponent } = this.props.classes;

    return (
      <div className={wrapper}>
        <SideMenu title="SUA CONTA" sections={dashboardSections} />
        <Switch>
          <Route path='/painel/geral'><div className={withMenuComponent}>
            <DashboardGeneral />
          </div></Route>
          <Route path='/painel/perfil'><div className={withMenuComponent}>
            <DashboardUser />
          </div></Route>
          <Route exact path='/painel/pedidos'><div className={withMenuComponent}>
            <DashboardOrders />
          </div></Route>
          <Route exact path='/painel/pedidos/:id'><div className={withMenuComponent}>
            <DashboardOrder />
          </div></Route>
          <Route path='/painel/editar/:form/:id'><div className={withMenuComponent}>
            <DashboardForms controller={this.controller} />
          </div></Route>
          <Route path="/painel*" component={() => <Redirect to="/painel/geral" />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  saleOrders: state.saleOrders.orders,
  storeFirebase: state.firebase  
})

export default compose(
	withStyles(styles),
	withRouter,
	connect(mapStateToProps, {}),
)(Dashboard);
