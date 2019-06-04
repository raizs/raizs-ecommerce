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
      maxWidth:"800px",
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
    leftContent:{
      display:"inline-block",
      verticalAlign:"top",
      width:"50%"
    },
    rightContent:{
      display:"inline-block",
      verticalAlign:"top",
      width:"250px",
      paddingLeft:"50px"
    },
    infoBox:{
      marginBottom:4*unit,
    },
    infoKey:{
      fontSize:theme.fontSizes.XXS,
      fontWeight:800,
      marginBottom:unit
    },
    infoValue:{
      fontSize:theme.fontSizes.XS,
      color:theme.palette.gray.main
    },
    emailShortcut:{
      color:theme.palette.green.main,

    },
    socialIcon:{
      height: 30,
      transition: "0.2s",
      width: 30,
      verticalAlign: 'middle',
      display: 'inline-block',
      stroke: theme.palette.green.main,
      '& *':{
        stroke: `${theme.palette.green.main} !important`,
      },
      '&:hover *': {
        stroke: "white !important"
      }, 
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


class ContactUs extends Component{

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
     state: { email, name, phone, msg }, 
     controller: { handleChange, sendContactEmail } } = this.props;
    return <form>
      <TextInput 
        className={classes.inputValue}
        id="name"
        value={name}
        handleChange={handleChange}
        placeholder="Nome"
        />
      <TextInput 
        className={classes.inputValue}
        id="email"
        value={email}
        handleChange={handleChange}
        placeholder="E-mail"
        />
      <TextInput 
        className={classes.inputValue}
        id="phone"
        value={phone}
        handleChange={e => handleChange(e, "formatPhone")}
        placeholder="Telefone"
        />
      <textarea
        className={classes.textarea}
        id='msg'
        placeholder={"Mensagem"}
        value={msg}
        onChange={handleChange}
      />
      <Button className={classes.button} onClick={sendContactEmail} >
        Enviar    
      </Button>
    </form>
  }

  render(){
    const { classes } = this.props;
    let email = "contato@raizs.com.br";
    return (
      <div id="contato" className={classnames(classes.wrapper, "offset-important")}>
        <h2 className={classes.title}>Fale Conosco</h2>
        <h3 className={classes.subtitle}>Sentiu falta de algum produto? Tem algum feedback ou dúvida? Fala pra gente aqui.</h3>

        <div className={classes.leftContent}>
          {this._renderEmailForm()}
        </div>

        <div className={classes.rightContent}>
          {this._renderInfo("E-MAIL", <a className={classes.emailShortcut} href={`mailto: ${email}`}>{email}</a>)}
          {this._renderInfo("TELEFONE", "(11) 3034-6455")}
          {this._renderInfo("WHATSAPP", "(11) 97573-0715")}
          {this._renderInfo("ENDEREÇO", "Rua Deputado Lacerda Franco, 462 - São Paulo, Brasil")}
          {this._renderInfo("SOCIAL", this._renderIcons())}
        </div>
      </div>
    )
  }
};


export default ContactUs = withStyles(styles)(ContactUs);