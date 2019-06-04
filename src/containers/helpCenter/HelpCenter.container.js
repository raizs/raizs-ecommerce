import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';

import classnames from 'classnames';
import { howItWorksTooltips } from "../../assets";
import { AnchorMenu } from "../../molecules";
import { withTimeline } from '../withTimeline';
import { helpCenterTimeline,  } from '../../assets';
import { Timeline, TimelineSection, TimelineSections } from '../../components';

import FAQTopic from "./molecules/FAQTopic.molecule";
import ContactUs from "./molecules/ContactUs.molecule";



const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
  },
  FAQBox:{
    paddingTop:3*theme.spacing.unit
  },
  title:{
  	fontSize: theme.fontSizes.LG,
  	marginBottom: 2*theme.spacing.unit,
  	width:"100%", 
  },
  subtitle:{
  	fontWeight:800,
  	fontSize: theme.fontSizes.SM,
  	marginTop:2*theme.spacing.unit,
  	width:"100%", 
  	textAlign:"center"
  }
  
});

let fakeQuestion = {
  question:"Como eu faço uma assinatura?",
  answer:"Você deve entrar em assinaturas, escolher os produtos e efetuar o pagamento. Você deve entrar em assinaturas, escolher os produtos e efetuar o pagamento. Você deve entrar em assinaturas, escolher os produtos e efetuar o pagamento. ",
}
const questions = [fakeQuestion, fakeQuestion, fakeQuestion, fakeQuestion]

class HelpCenter extends Component{

	

  _renderFAQ(){
    const { classes } = this.props;
    return <div id="faq" className={classnames(classes.FAQBox, "offset-important")}>
      <h2 className={classes.title}>FAQ</h2>
        <FAQTopic questions={questions} subject="PEDIDOS"/>
        <FAQTopic questions={questions} subject="ASSINATURA"/>
        <FAQTopic questions={questions} subject="INFORMAÇÕES DE CONTA E FATURAMENTO"/>
    </div>
  }


	
	render() {
		const { classes, history, availableWidth, timelineWidth, shouldFixTimeline, currentSectionId } = this.props;

	    return (
	    	<section id="help-center" className={classes.wrapper}>
          <Timeline
            history={history}
            content={helpCenterTimeline}
            fixed={shouldFixTimeline}
            currentSectionId={currentSectionId}
          />
  				<TimelineSections fixed={shouldFixTimeline} timelineWidth={timelineWidth} width={availableWidth}>
            <TimelineSection id="faq">{this._renderFAQ()}</TimelineSection>
            <TimelineSection id="contact-us"> <ContactUs/> </TimelineSection>
          </TimelineSections>

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
  withTimeline,
)(HelpCenter);
