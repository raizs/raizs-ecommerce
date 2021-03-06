import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';

const styles = theme => ({
  wrapper: {
    // backgroundColor: theme.palette.gray.bg,
    backgroundColor: "#e5e5e6",
    padding: 3*theme.spacing.unit,
  	display:"flex",
  	justifyContent:"center",
  	alignItems:"center",
  	flexDirection: "column",
  	minHeight: "500px",
  },
  title:{
  	fontSize: theme.fontSizes.XL
  },
  subTitle:{
  	fontSize: theme.fontSizes.LG,
  	marginTop:3*theme.spacing.unit
  }
  
});

class NotFound extends Component{

	componentDidMount() {
    document.title = 'Raízs | Página não encontrada';
  }
	
	render() {
		const { wrapper, title, subTitle } = this.props.classes;

	    return (
			<div className={wrapper}>
				<h1 className={title}>404 - Página não encontrada</h1>
				<h2 className={subTitle}>Ops! A página que você está tentando acessar não existe</h2>
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
)(NotFound);
