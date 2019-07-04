import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';

import { SideMenu } from '../../molecules';
import { Route, Switch,Redirect } from 'react-router-dom';
import { dashboardSections } from "../../assets";
import {
  DashboardGeneral,
  DashboardUser,
  DashboardForms,
  DashboardOrders,
  DashboardOrder,
  DashboardSubscriptions
} from "./components"
import { BaseContainer } from '../../helpers';
import { DashboardController } from './Dashboard.controller';
import { setSaleOrdersAction, setSaleSubscriptionsAction } from '../../store/actions';

const actions = { setSaleOrdersAction, setSaleSubscriptionsAction };

const styles = theme => ({
  wrapper: {
    userSelect: 'none',
    backgroundColor: theme.palette.gray.bg,
    paddingLeft: 6 * theme.spacing.unit,
    paddingRight: 6 * theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
    '& > div': {
      width: '100%',
      maxWidth: '1200px',
      '& > div': {
        display: 'inline-block',
        verticalAlign: 'top',
        '&.content': {
          width: 'calc(100% - 154px)'
        }
      }
    }
  }
});

class Dashboard extends BaseContainer {
  constructor(props) {
    super(props, DashboardController);
  }

  state = {
    name: ""
  }

  componentDidMount() {
    document.title = 'Raízs | Painel';

    const { user } = this.props;
    if(user && user.id) this.controller.initialFetch(user.id);
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

    const { user } = nextProps, prevUser = this.props.user;
    if(!prevUser && user && user.id) this.controller.initialFetch(user.id);
  }
  
	render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div>
          <SideMenu title="Sua conta" sections={dashboardSections} />
          <Switch>
            <Route path='/painel/geral'>
              <div className='content'>
                <DashboardGeneral />
              </div>
            </Route>
            <Route path='/painel/perfil'>
              <div className='content'>
                <DashboardUser />
              </div>
            </Route>
            <Route exact path='/painel/assinaturas'>
              <div className='content'>
                <DashboardSubscriptions />
              </div>
            </Route>
            <Route exact path='/painel/pedidos'>
              <div className='content'>
                <DashboardOrders />
              </div>
            </Route>
            <Route exact path='/painel/pedidos/:id'>
              <div className='content'>
                <DashboardOrder />
              </div>
            </Route>
            <Route path='/painel/editar/:form/:id'>
              <div className='content'>
                <DashboardForms controller={this.controller} />
              </div>
            </Route>
            <Route path="/painel*" component={() => <Redirect to="/painel/geral" />} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  saleOrders: state.saleOrders.orders,
  storeFirebase: state.firebase,
  user: state.user.current
})

export default compose(
	withStyles(styles),
	withRouter,
	connect(mapStateToProps, actions),
)(Dashboard);
