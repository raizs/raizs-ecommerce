import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { dashboardGeneralOrders } from "../../../../assets";
import { Loading } from '../../../../molecules';

const styles = theme => ({
  wrapper:{
    display: "inline-block",
    width: "100%",
    minHeight: window.innerWidth - 96,
    padding: 5 * theme.spacing.unit,
    verticalAlign: "top",
    '& > h1': {
      ...theme.typography.bigTitle,
      textAlign: 'left'
    },
    '& > div.orders': {
      marginTop: 4 * theme.spacing.unit
    }
  }
});

class DashboardOrders extends Component{
  constructor(props) {
    super(props);
  }

  state = {
    loading: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saleOrders) {
      this.setState({ loading:false });
    }
  }

  componentWillMount() {
    if (this.props.saleOrders) {
      this.setState({ loading:false });
    }
  }

  _renderOrders() {
    const { classes } = this.props;
    return <div>Orders</div>;
    // return dashboardGeneralOrders.map((box, key) => {
    //   return (
    //     <div className={classes.whiteBox} key={key}>
    //       <div className={classes.whiteBoxSection}>
    //         <h2 className={classes.whiteBoxTitle}>
    //           {box.subtitle}
    //         </h2>
    //         <div className={classes.whiteBoxValue}>
    //           {this.props.saleOrders[box.id]}
    //         </div>
    //       </div>
    //       <img className={classes.whiteBoxImg} src={box.img} />
    //     </div>
    //   );
    // })
  }

  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return <div className={classes.wrapper}>
        <Loading />
      </div>
    }

    return (
      <div className={classes.wrapper}>
        <h1>Pedidos</h1>
        <div className='orders'>
          {this._renderOrders()}
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  saleOrders: state.saleOrders.orders
});

DashboardOrders = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, {})
)(DashboardOrders);

export { DashboardOrders }