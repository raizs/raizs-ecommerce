import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Icon, Button } from '@material-ui/core';
import compose from 'recompose/compose';

import { Loading } from '../../molecules';
import { Formatter, BaseContainer } from '../../helpers';
import { OrderCompletedController } from "./OrderCompleted.controller";
import { setSaleOrdersAction, setSaleSubscriptionsAction } from "../../store/actions"


const styles = theme => ({
  wrapper: {
    // backgroundColor: theme.palette.gray.bg,
    backgroundColor: "#e5e5e6",
    padding: 3*theme.spacing.unit,
  	display:"flex",
  	justifyContent:"center",
  	alignItems:"center",
  	flexDirection: "column",
  	minHeight: "400px",
  },
  confirmMessage:{
  	...theme.typography.raizs,
  	// backgroundColor:"red",
  	height:"80px",
  },
  basketBox:{

  },
  basketImg:{
  	verticalAlign:"middle",
  },
  inLine:{
  	marginTop: 4*theme.spacing.unit,
  	display:"inline-block",
  	verticalAlign:"middle",
  	width: "220px"
  },
  labelTitle:{
  	fontSize: theme.fontSizes.XS,
  	fontWeight: 800,
  	marginBottom: theme.spacing.unit
  },
  labelSubtitle:{
  	fontSize: theme.fontSizes.XXS
  },
  infoBox:{
  	backgroundColor: "white",
  	padding: 2*theme.spacing.unit,
  	width: "100%",
  	maxWidth:"600px",
  	borderRadius: theme.spacing.unit,
  },
  infoSection:{
  	width: "calc(50% - 1px)",
  	// backgroundColor:"red",
  	display:"inline-block",
  	height:"200px",
  	verticalAlign:"middle",
    padding: 2*theme.spacing.unit,

  },
  separator:{
  	display:"inline-block",
    backgroundColor: theme.palette.gray.bg,
  	verticalAlign:"middle",
    height:"170px",
    width:"1px"
  },
  greenTitle:{
  	color: theme.palette.green.main,
  	fontWeight: 800,
  	fontSize: theme.fontSizes.XS,
  	paddingLeft: 2*theme.spacing.unit
  },
  priceUnit:{
  	display:"inline-block",
  	fontWeight:800,
  	fontSize: theme.fontSizes.SM,
  	color: theme.palette.black.main,
  },
  infoTitle:{
  	display:"inline-block",
  	marginTop:2*theme.spacing.unit,
  	fontWeight:800,
  	fontSize: theme.fontSizes.XL,
  	color: theme.palette.black.main,
  },
  note:{
  	marginTop:theme.spacing.unit,
  	marginBottom:theme.spacing.unit,
  	color: theme.palette.gray.main,
  	fontSize: theme.fontSizes.XXS,

  },
  checkList:{
  	padding:theme.spacing.unit,
  },
  checkListIcon:{
  	color:theme.palette.gray.light,
  	verticalAlign:"middle",
  	marginRight: theme.spacing.unit
  },
  checkListItem:{
  	verticalAlign:"middle",
  	display:"inline-block",
  	color: theme.palette.gray.main
  },
  shippingTimeLabel:{
  	fontWeight:800,
  	fontSize:theme.fontSizes.XXS,
  	color: theme.palette.black.main,
  	paddingTop: theme.spacing.unit,
  },
  shippingTimeValue:{
  	fontSize:theme.fontSizes.XXS,
  	color: theme.palette.gray.main,
  },
  buttonBox:{
  	textAlign:"center"
  },
  button: {
    ...theme.buttons.secondary,
    fontSize: theme.fontSizes.MD,
    marginTop: 3 * theme.spacing.unit
  }
});

class OrderCompleted extends BaseContainer {

  constructor(props){
		super(props, OrderCompletedController)
		
		this.state = {
			loading: true,
			order: null, 
			total: 0
		}
  }


	componentDidMount() {
		document.title = 'Raízs | Pedido finalizado';	
	}
	
  componentWillMount() {
    this.controller.fetchData();
  }

	_renderFamilyInfo() {
		const { inLine, labelTitle, labelSubtitle } = this.props.classes;
		return <div className={inLine}>
			<div className={labelTitle}>Família de Almeida</div>
			<div className={labelSubtitle}>Fornecedora da maioria dos itens pedidos</div>
		</div>
	}

	_renderExpensesInfo() {
		const { inLine, labelTitle, labelSubtitle } = this.props.classes;
		return <div className={inLine}>
			<div className={labelTitle}>{Formatter.currency(this.state.order.amountTotal*0.2)}</div>
			<div className={labelSubtitle}>Destinado a agricultura familiar</div>
		</div>
	}

	_renderCheckListItem(text) {
		const { checkList, checkListItem, checkListIcon } = this.props.classes;
		return <div className={checkList}>
			<Icon className={checkListIcon}>check_circle</Icon>
			<div className={checkListItem}>{text}</div>
		</div>
	}

	_renderInfos() {
		const { infoBox, separator, infoSection, greenTitle, priceUnit, infoTitle, note, shippingTimeLabel, shippingTimeValue, buttonBox, button } = this.props.classes;
		const { order, sub, total, shippingDiscount } = this.state;
    let itemCount = 0;
    if (sub) itemCount += sub._countItems(sub.lines, "first");
    
    if (order) itemCount += order.itemCount;
    itemCount += " items";
		return (
			<div className={infoBox}>
				<div className={infoSection}>
					<div className={greenTitle}>RESUMO</div>
					<div className={priceUnit}>R$</div><div className={infoTitle}>{Formatter.currency(total)}</div>
					{shippingDiscount && <div className={note}>Economizou com o frete!</div>}
					{order && this._renderCheckListItem(itemCount)}
					{sub && this._renderCheckListItem("1 Assinatura de cesta")}
					{!order.hasDonation || this._renderCheckListItem("Doação")}
				</div>

				<div className={separator} />

				<div className={infoSection}>
					<div className={greenTitle}>ENTREGA</div>
					<div className={infoTitle}>{order.shippingEstimatedDate}</div>
					<div className={note}>{order.shippingEstimatedWeekDay}</div>
					<div className={shippingTimeLabel}>Horário de entrega</div>
					<div className={shippingTimeValue}>{order.shippingTimeRange} </div>
				</div>
				<div className={buttonBox}>
					<Button className={button} onClick={()=>this.props.history.push("/dashboard/sale-orders")} >
						Visualizar Pedidos    
					</Button>
				</div>
			</div>
			);
	}

	render() {
		const { wrapper, confirmMessage, basketBox, basketImg } = this.props.classes;

		if (this.state.loading) {
			return <div className={wrapper}>
				<Loading/>
			</div>
		}

		return (
			<div className={wrapper}>
				<div className={confirmMessage} >
					Pedido Finalizado
				</div>
				<div className={basketBox}>
					{this._renderFamilyInfo()}
					<img className={basketImg} src="/icons/cesta-foto.png" alt='cesta'/>
					{this._renderExpensesInfo()}
				</div>
				{this._renderInfos()}
			</div>
		);
  }
}

const mapStateToProps = state => ({
  user: state.user.current,
});

export default compose(
	withStyles(styles),
	withRouter,
	connect(mapStateToProps, { setSaleOrdersAction, setSaleSubscriptionsAction }),
)(OrderCompleted);
