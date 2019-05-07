import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import { withFirebase } from 'react-redux-firebase';
import compose from 'recompose/compose';

const actions = {};

const styles = theme => ({
  
});

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>ORGÂNICOS CERTIFICADOS,<br/>DE PEQUENOS PRODUTORES,<br/>NA PORTA DA SUA CASA</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions),
  withFirebase
)(Landing);