import React, { Component } from 'react'
import { withStyles, Button, Icon } from '@material-ui/core';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { Loading } from '../../molecules';
import { BaseContainer } from '../../helpers';
import { CepCheckerController } from "../controllers/CepChecker.controller.js"



const styles = theme => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    padding:`${5*theme.spacing.unit}px 0`,
    '& > h5': {
      color: theme.palette.black.main,
      fontSize: theme.fontSizes.LG,
      lineHeight: '28px',
      fontWeight: 700,
      width:"320px",
      marginLeft:"calc(50% - 160px)",
      marginBottom: theme.spacing.unit,
    },
    '& button': {
      ...theme.buttons.primary,
      fontSize: theme.fontSizes.MD,
      height: '45px',
      paddingBottom:theme.spacing.unit,
    },
    '& > div.anotherCep': {
      fontSize: theme.fontSizes.SM,
      textDecoration:"underline",
      color: theme.palette.green.main,
      cursor:"pointer",
      fontWeight:800,
      marginTop: 2 * theme.spacing.unit,
    },
    '& > div.input-wrapper': {
      position: 'relative',
      display: 'inline-block',
      width: '200px',
      padding: `${2 * theme.spacing.unit}px 0`,
      '&  > input': {
        width: '100%',
        padding: theme.spacing.unit,
        border: "1px solid gray",
        borderRadius: theme.spacing.unit,
        fontSize: theme.fontSizes.MD,
        '&:focus': {
          outline: 'none'
        }
      },
    }
  },
  description:{
    padding:theme.spacing.unit,
    fontSize:theme.fontSizes.SM,
    width:"250px",
    marginLeft:"calc(50% - 125px)",
    color:theme.palette.gray.main
  }
});

class CepChecker extends BaseContainer{

  constructor(props){
    super(props, CepCheckerController)

  }

  state={
    loading:false,
    cep:"",
    msg:"Digite seu CEP e veja se entregamos na sua região.",
    searched:false,
    success:false, 
    description:""
  }

  render(){ 
    const { classes } = this.props;
    const { handleChange, handleSubmit } = this.controller
    const { cep , loading, searched, msg, success, description } = this.state;

    return (
      <section className={classes.wrapper}>
        {loading && <Loading absolute/>}
        <h5>{msg}</h5>
        {searched ?
          <div className={classes.description}>{description}</div>
          :
         <div className='input-wrapper'>
            <input
              id="cep"
              value={cep}
              placeholder='CEP'
              onChange={handleChange}
              onBlur={handleSubmit}
            />
          </div> }
        <div>
          {!searched ? 
            <Button id='checkCep' onClick={handleSubmit} >Pesquisar</Button>
            :
            !success||<Button id='goToCatalog' onClick={()=>this.props.history.push("/catalogo")} >Catalogo</Button>
          }
        </div>
        {!searched || <div onClick={()=>this.setState({searched:false, msg:"Digite seu CEP e veja se entregamos na sua região."})}  className="anotherCep">TENTE OUTRO CEP</div>}
      </section>
    );
  }
};

CepChecker = compose(withStyles(styles), withRouter)(CepChecker);

export { CepChecker };