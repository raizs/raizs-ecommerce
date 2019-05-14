import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Icon, Button } from '@material-ui/core';
import compose from 'recompose/compose';
import classnames from 'classnames'

import { SideMenu } from '../../molecules';
import { Route, Switch } from 'react-router-dom';
import { dashboardSections } from "../../assets";
import { DashboardGeneral } from "./components"


const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    padding: 3*theme.spacing.unit,
  	minHeight: "500px",
  },
  withMenuComponent:{
    width:"calc(100% - 300px)",
    display:"inline-block",
    backgroundColor:"green",
    minHeight:"800px",
    verticalAlign:"top"

  }
});

class Dashboard extends Component{

	
	render() {
		const { wrapper, withMenuComponent } = this.props.classes;

	    return (
			<div className={wrapper}>
        <SideMenu title="MEU PAINEL" sections={dashboardSections}/>
        <Switch>
          <Route path='/painel/geral'  >
            <div className={withMenuComponent}>
                <DashboardGeneral/>
            </div>
          </Route>
          <Route path='/painel/user'  >
            <div className={withMenuComponent}>
              <div> to no user</div>
            </div>
          </Route>
        </Switch>
			</div>
	    )
  }
}

const mapStateToProps = state => ({
	saleOrders: state.saleOrders.orders
})

export default compose(
	withStyles(styles),
	withRouter,
	connect(mapStateToProps, {}),
)(Dashboard);
