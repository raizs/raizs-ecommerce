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
      marginBottom: 3 * theme.spacing.unit,
    },
    '& button': {
      ...theme.buttons.primary,
      fontSize: theme.fontSizes.MD,
      height: '45px',
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
      paddingBottom: 2 * theme.spacing.unit,
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
  icon:{
    fontSize:20
  }
});

class CepChecker extends BaseContainer{

  constructor(props){
    super(props, CepCheckerController)

  }

  state={
    loading:false,
    cep:"",
    msg:"",
    searched:false,
    success:false
  }

  render(){ 
    const { classes } = this.props;
    const { handleChange, handleSubmit } = this.controller
    const { cep , loading, searched, msg, success } = this.state;

    return (
      <section className={classes.wrapper}>
        {loading && <Loading absolute/>}
        <h5>{searched ? msg : "Digite seu CEP e veja se entregamos na sua região."}</h5>
        {searched || <div className='input-wrapper'>
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
        {searched && !success && <Icon className={classes.icon}>sentiment_very_dissatisfied</Icon>}
        {!searched || <div onClick={()=>this.setState({searched:false})}  className="anotherCep">TENTE OUTRO CEP</div>}
      </section>
    );
  }
};

CepChecker = compose(withStyles(styles), withRouter)(CepChecker);

export { CepChecker };