import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import classnames from 'classnames';

import { withTimeline } from '../withTimeline';
import { helpCenterTimeline  } from '../../assets';
import { Timeline, TimelineSection, TimelineSections } from '../../components';

import { howItWorksTooltips } from "../../assets";
import { BaseContainer } from "../../helpers";
import { HelpCenterController } from "./HelpCenter.controller";

import ContactUs from "./molecules/ContactUs.molecule";
import FAQTopic from "./molecules/FAQTopic.molecule";
import BePartner from "./molecules/BePartner.molecule";
import TermsAndConditions from "./molecules/TermsAndConditions.molecule";



const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
  },
  FAQBox:{
    paddingTop:3*theme.spacing.unit,
  },
  termsAndConditionsBox:{
    marginBottom:"200px",
  },
  title:{
  	fontSize: theme.fontSizes.MD,
  	marginBottom: 2*theme.spacing.unit,
  	width:"100%", 
  },
  
});

const fakeQuestion = {
  question:"Como eu faço uma assinatura?",
  answer:"Você deve entrar em assinaturas, escolher os produtos e efetuar o pagamento. Você deve entrar em assinaturas, escolher os produtos e efetuar o pagamento. Você deve entrar em assinaturas, escolher os produtos e efetuar o pagamento. ",
}
const questions = [fakeQuestion, fakeQuestion, fakeQuestion, fakeQuestion]


const fakeTopic = {
  subject: "INFORMAÇÕES PESSOAIS",
  text: "Amet commodo nulla facilisi nullam vehicula ipsum a. Sed odio morbi quis commodo odio. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Nunc scelerisque viverra mauris in aliquam. Leo duis ut diam quam. Non diam phasellus vestibulum lorem sed risus ultricies. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Imperdiet massa tincidunt nunc pulvinar. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Tincidunt praesent semper feugiat nibh sed. Quisque sagittis purus sit amet volutpat. \n\n In hendrerit gravida rutrum quisque non tellus orci. Lacus sed viverra tellus in hac habitasse platea. Pharetra sit amet aliquam id diam. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Pretium lectus quam id leo in. Quam nulla porttitor massa id neque aliquam vestibulum. Magna ac placerat vestibulum lectus mauris ultrices eros in. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Enim eu turpis egestas pretium aenean pharetra magna."
}

const fakeTerms = [fakeTopic, fakeTopic, fakeTopic, fakeTopic, fakeTopic]

class HelpCenter extends BaseContainer{

  constructor(props){
    super(props, HelpCenterController)
  }
	
  state={
    email:"",
    name:"",
    phone:"", 
    msg: "",
    emailPartner:"",
    namePartner:"",
    phonePartner:"", 
    msgPartner: ""
  }


  _renderFAQ(){
    const { classes } = this.props;
    return <div id="faq" className={classnames(classes.FAQBox, "offset-important")}>
        <FAQTopic questions={questions} subject="PEDIDOS"/>
        <FAQTopic questions={questions} subject="ASSINATURA"/>
        <FAQTopic questions={questions} subject="INFORMAÇÕES DE CONTA E FATURAMENTO"/>
    </div>
  }

  _renderTermsAndConditions(){
    return fakeTerms.map((term, key)=>{
      return <TermsAndConditions term={term}/>
    })


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
            <TimelineSection > {this._renderFAQ()} </TimelineSection>
            <TimelineSection > <ContactUs state={this.state} controller={this.controller} /> </TimelineSection>
            <TimelineSection > <BePartner state={this.state} controller={this.controller} /> </TimelineSection>
            <TimelineSection > 
              <div className={classnames(classes.termsAndConditionsBox, "offset-important")} id="politicas-e-privacidade">
                <h2 className={classes.title}>Políticas & Privacidade</h2>
                {this._renderTermsAndConditions()} 
              </div>
            </TimelineSection>
          </TimelineSections>

  			</section>
	    )
  }
}

export default compose(
	withStyles(styles),
	withRouter,
  withTimeline,
)(HelpCenter);
