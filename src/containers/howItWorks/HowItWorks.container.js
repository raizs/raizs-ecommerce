import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Icon } from '@material-ui/core';

import compose from 'recompose/compose';
import classnames from 'classnames';
import ReactTooltip from 'react-tooltip'
import { howItWorksTooltips } from "../../assets";
import { AnchorMenu } from "../../molecules";
import { SimpleCepChecker, Image } from "../../components";

const styles = theme => ({
  wrapper: {
    backgroundColor: "white",
  },
  howItWorksBox:{
    paddingLeft: "200px",
    paddingTop:3*theme.spacing.unit
  },
  greenIntro:{
  	fontSize: theme.fontSizes.XS,
  	color: theme.palette.green.main, 
  	marginBottom:theme.spacing.unit,
  	fontWeight:800,
  	width:"100%", 
  	textAlign:"center"
  },
  title:{
  	fontSize: theme.fontSizes.XL,
  	marginBottom: 2*theme.spacing.unit,
  	width:"100%", 
  	textAlign:"center"
  },
  subtitle:{
  	fontWeight:800,
  	fontSize: theme.fontSizes.SM,
  	marginTop:2*theme.spacing.unit,
  	width:"100%", 
  	textAlign:"center"
  },
  bgImage:{
  	height:"300px",
  	width:"824px",
  	backgroundImage: 'url("/icons/howItWorks.png")',
  	backgroundPosition:"center",
  	backgroundRepeat:"no-repeat",
  	backgroundSize:"cover",
  	position:"relative",
  	marginBottom:8*theme.spacing.unit,
  },
  baseBgBox:{
  	position:"absolute",
  	color:theme.palette.green.main,
  	fontWeight:800,
  	fontSize:theme.fontSizes.XS,
  	verticalAlign:"middle",
  	// padding:"2px"
  },
  bgSignature:{
  	top:"115px",
  	left:"140px",
  },
  bgSingleOrder:{
  	top:"175px",
  	left:"165px"
  },
  bgShippSchedule:{
  	top:"160px",
  	left:"385px"
  },
  bgReceiveInHome:{
  	top:"168px",
  	left:"560px"
  },
  helpIcon:{
  	verticalAlign:"middle",
  	marginLeft:theme.spacing.unit,
  	color: theme.palette.green.main,
  	fontSize: theme.fontSizes.MD
  },
  tooltip:{
  	width:"300px",
  },
  deliveryBox:{
  	backgroundImage: `linear-gradient(white, ${theme.palette.gray.lighter})`,
    paddingLeft: "200px",
  },
  flexBox:{
    padding: `${5*theme.spacing.unit}px 0`,
	display:"flex",
  	justifyContent:"center",
  	alignItems:"center",
  	flexDirection: "row",
  },
  deliveryLeftBox:{
  	display:"inline-block",
  	width:"300px"
  },
  deliveryRightBox:{
  	display:"inline-block",
  	width:"450px"
  	
  },
  topic:{
  	marginBottom:4*theme.spacing.unit,
  	width:"250px"
  },
  topicTitle:{
  	marginBottom: theme.spacing.unit,
  	fontWeight:800,
  	fontSize: theme.fontSizes.SM,
  	color: theme.palette.black.main
  },
  topicInfo:{
  	fontSize: theme.fontSizes.XS,
  	lineHeight: theme.fontSizes.SM,
  	color: theme.palette.gray.main
  },
  linkText:{
  	marginTop: 2*theme.spacing.unit,
  	fontSize: theme.fontSizes.XS,
  	fontWeight:800,
  	color: theme.palette.black.main,
  	width: "400px",
  	textAlign:"right"
  },
  link:{
  	display:"inline-block",
  	color: theme.palette.green.main,
  	textDecoration:"underline",
  	cursor:"pointer"
  },
  cepBox:{
  	backgroundColor:"white"
  }
  
});

class HowItWorks extends Component{

	_renderBgChilds(){
		const { classes } = this.props;
		return howItWorksTooltips.map((item,key)=>{
			return 	<div key={key} className={classnames(classes.baseBgBox, classes[item.id])}>
				{item.label} 
				<Icon data-tip='' data-for={item.id} className={classes.helpIcon}>help_outline</Icon>
				<ReactTooltip border className={classes.tooltip} type="light" id={item.id}>{item.tooltip}</ReactTooltip>
			</div>
		})
	}

	_renderDeliveryRightBox(){
		const { classes } = this.props;
		return <div className={classes.deliveryRightBox}>
			<Image
				width={400}
				height={320}
				alt="vegetais na cozinha"
				src="https://content.paodeacucar.com/wp-content/uploads/2017/08/cozinhar-legumes-e-vegetais-capa.jpg" />
			<div className={classes.linkText}>
				Ainda ficou com alguma dúvida? Consulte nossa &nbsp;
				<div onClick={()=>this.props.history.push("/central-de-ajuda")} className={classes.link}>Central de ajuda</div>
			</div>
		</div>
	}

	_renderDeliveryLeftBox(){
		const { classes } = this.props;
		return <div className={classes.deliveryLeftBox}>

			<div className={classes.topic}>
				<div className={classes.topicTitle}>Segunda a Sábado</div>
				<div className={classes.topicInfo}>Entregamos de segunda a sábado. No final do checkout você escolhe qual dia da semana encaixa mais com sua rotina</div>
			</div>

			<div className={classes.topic}>
				<div className={classes.topicTitle}>7h30 até 13h</div>
				<div className={classes.topicInfo}>Nosso horário de entrega é das 7h30 até 13h, assim seus orgânicos chegam a tempo se preparar seu almoço!</div>
			</div>

			<div className={classes.topic}>
				<div className={classes.topicTitle}>Entrega rápida</div>
				<div className={classes.topicInfo}>Entregamos no mesmo dia, caso o pedido seja realizado antes das 11h!</div>
			</div>

			<div className={classes.topic}>
				<div className={classes.topicTitle}>Valor mínimo</div>
				<div className={classes.topicInfo}>
					&bull;Pedido avulso: R$ 40,00<br/>
					&bull;Assinatura: R$ 80,00
				</div>
			</div>

		</div>

	}
	
	render() {
		const { classes } = this.props;
		let items =[{
			id:"passo-a-passo",
			label:"COMO FUNCIONA",
		},{
			id:"entrega",
			label:"ENTREGA",
		}]

	    return (
	    	<section className={classes.wrapper}>
				<AnchorMenu items={items} />
				<div id="passo-a-passo" className={classes.howItWorksBox}>
					<div className={classes.greenIntro}>COMO FUNCIONA</div>
					<h1 className={classes.title}>Nós trazemos a fazenda para sua casa</h1>
					<div className={classes.subtitle}>Escolha o seu modelo de pedidos</div>

					<div className={classes.flexBox}>
						<div className={classes.bgImage}>
							{this._renderBgChilds()}
						</div>
					</div>
				</div>

				<div id="entrega" className={classes.deliveryBox}>
					<div className={classes.greenIntro}>ENTREGA</div>
					<h1 className={classes.title}>Frete grátis em pedidos acima de R$220,00</h1>
					<div className={classes.flexBox}>
						{this._renderDeliveryLeftBox()}
						{this._renderDeliveryRightBox()}
					</div>
				</div>

				<SimpleCepChecker/>

			</section>
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
)(HowItWorks);
