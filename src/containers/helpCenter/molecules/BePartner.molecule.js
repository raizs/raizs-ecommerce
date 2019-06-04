import React, { Component } from 'react'
import { withStyles, Button } from '@material-ui/core';
import classnames from "classnames";
import { withRouter } from 'react-router';
import smoothScroll from "smooth-scroll"
import ReactSvg from 'react-svg'
import { TextInput } from "../../../molecules";
 

const styles = theme => {
  const { unit } = theme.spacing;
  return {
    wrapper:{
      borderRadius: unit,
      width:"100%",
      maxWidth:"412px",
      padding: "12px",
      margin:`${unit}px 0`,
      cursor:"pointer",
      position:"relative",
    },
    title:{
      fontSize: theme.fontSizes.MD,
      marginBottom: 2*unit,
    },
    subtitle:{
      fontSize: theme.fontSizes.XS,
      marginTop:unit,
      fontWeight:300,
      width:"300px",
      color:theme.palette.gray.main
    },
    inputValue:{
      ...theme.inputs.text,
      margin:`${unit}px 0`,
      width:"100%",
      "&>input":{
        fontSize: theme.fontSizes.SM,
        height: "44px"

      }
    },
    textarea: {
      width: '100%',
      height: '200px',
      padding: theme.spacing.unit,
      borderRadius: theme.spacing.unit,
      lineHeight: '16px',
      border: `1px solid ${theme.palette.gray.border}`,
      resize: 'none',
      '&:focus': {
        padding: theme.spacing.unit,
        border: `1px solid ${theme.palette.green.main}`,
      }
    },
    button: {
      ...theme.buttons.primary,
      fontSize: theme.fontSizes.MD,
      marginTop: 3 * theme.spacing.unit,
      width:"150px"
    }

  }

};


class BePartner extends Component{

  constructor(props){
    super(props)
  }

  _renderInfo(key, value){
    const { classes } = this.props;
    return <div className={classes.infoBox}>
      <div className={classes.infoKey}>{key}</div>
      <div className={classes.infoValue}>{value}</div>
    </div>
  }


  _renderIcons(){
    const { classes } = this.props;
    let icons = [1, 2, 3]
    return icons.map((icon, key)=>{
      return <ReactSvg
          key={key}
          src='/icons/assinatura.svg'
          className={classes.socialIcon}
        />

    })
  }

  _renderEmailForm(){
    const { classes,
     state: { emailPartner, namePartner, phonePartner, msgPartner }, 
     controller: { handleChange, sendBePartnerEmail } } = this.props;
    return <form>
      <TextInput 
        className={classes.inputValue}
        id="namePartner"
        value={namePartner}
        handleChange={handleChange}
        placeholder="Nome"
        />
      <TextInput 
        className={classes.inputValue}
        id="emailPartner"
        value={emailPartner}
        handleChange={handleChange}
        placeholder="E-mail"
        />
      <TextInput 
        className={classes.inputValue}
        id="phonePartner"
        value={phonePartner}
        handleChange={e => handleChange(e, "formatPhone")}
        placeholder="Telefone"
        />
      <textarea
        className={classes.textarea}
        id='msgPartner'
        placeholder={"Mensagem"}
        value={msgPartner}
        onChange={handleChange}
      />
      <Button className={classes.button} onClick={sendBePartnerEmail} >
        Enviar    
      </Button>
    </form>
  }

  render(){
    const { classes } = this.props;
    return (
      <div id="seja-parceiro" className={classnames(classes.wrapper, "offset-important")}>
        <h2 className={classes.title}>Seja nosso Parceiro</h2>
        <h3 className={classes.subtitle}>Juntos vamos construir relacionamentos mais fortes através de uma vida mais saudável.</h3>
        {this._renderEmailForm()}
      </div>
    )
  }
};


export default BePartner = withStyles(styles)(BePartner);