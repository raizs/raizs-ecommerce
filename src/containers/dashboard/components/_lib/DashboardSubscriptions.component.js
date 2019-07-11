import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { Loading } from '../../../../molecules';
import { SubscriptionCard } from '../../molecules';
import { selectSaleSubscriptionAction } from '../../../../store/actions';

const actions = { selectSaleSubscriptionAction };

const styles = theme => ({
  wrapper:{
    display: "inline-block",
    width: "100%",
    padding: 5 * theme.spacing.unit,
    verticalAlign: "top",
    '& > h1': {
      ...theme.typography.bigTitle,
      textAlign: 'left'
    },
    '& > div.subscriptions': {
      marginTop: 4 * theme.spacing.unit
    }
  },
  item: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    padding: 2 * theme.spacing.unit
  }
});

class DashboardSubscriptions extends Component {
  state = {
    loading: true
  }
  
  componentWillMount() {
    if (this.props.subscriptions) this.setState({ loading:false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subscriptions && !this.props.subscriptions) this.setState({ loading:false });
  }

  _renderSubscriptions() {
    const { subscriptions, selectSaleSubscriptionAction, history } = this.props;
    const handleViewSaleSubscription = subscription => {
      if(subscription) {
        selectSaleSubscriptionAction(subscription);
        history.push(`/painel/assinaturas/${subscription.id}`);
      }
    }

    return subscriptions && subscriptions.all.length ? subscriptions.all.map(subscription => {
      return (
        <SubscriptionCard key={subscription.id} subscription={subscription} handleViewSaleSubscription={handleViewSaleSubscription} />
      )
    }) : <p>Você ainda não fez nenhuma assinatura.</p>;
  }

  render() {
    const { classes } = this.props;
    
    if (this.state.loading) {
      return <div className={classes.wrapper}>
        <Loading />
      </div>;
    }

    return (
      <div className={classes.wrapper}>
        <h1>Suas Assinaturas</h1>
        <div className='subscriptions'>
          {this._renderSubscriptions()}
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  subscriptions: state.saleSubscriptions.subscriptions
});

DashboardSubscriptions = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(DashboardSubscriptions);

export { DashboardSubscriptions }