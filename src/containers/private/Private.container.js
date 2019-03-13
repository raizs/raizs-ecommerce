import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Private extends Component {
  render() { 
    return (
      <div>
        Private
        {this.props.children}
      </div>
    );
  }
}
 
export default withRouter(
	connect(
		null,
		null
	)(Private)
);