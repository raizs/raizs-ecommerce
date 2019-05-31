import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';

const actions = {};

const styles = theme => ({
  wrapper: {
    width: '420px'
  }
});

class MiniCart extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

MiniCart = compose(
  withStyles(styles),
  withRouter,
  connect(
		mapStateToProps,
		actions
  )
)(MiniCart);

export { MiniCart };