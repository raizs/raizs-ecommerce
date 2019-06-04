import React from 'react'
import { withStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Loading, TextInput } from '../../molecules';
import { BaseContainer } from '../../helpers';
import { CepCheckerController } from "../controllers/CepChecker.controller.js"
import { setCepAction } from '../../store/actions';

const actions = { setCepAction };

const styles = theme => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    '& > h5': {
      color: theme.palette.black.main,
      fontSize: theme.fontSizes.LG,
      lineHeight: '28px',
      fontWeight: 700,
      marginTop: 5 * theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    '& p.description':{
      padding:theme.spacing.unit,
      fontSize:theme.fontSizes.MD,
      width:"250px",
      marginLeft:"calc(50% - 125px)",
      color:theme.palette.gray.main,
      marginBottom: theme.spacing.unit
    },
    '& > form': {
      position: 'relative',
      display: 'inline-block',
      padding: `${2 * theme.spacing.unit}px 0`,
      width: '1024px',
      '& > .loading': {
        marginLeft: 2 * theme.spacing.unit
      }
    },
    '& p.alter': {
      textDecoration: 'underline',
      cursor: 'pointer',
      fontSize: theme.fontSizes.SM,
      display: 'inline-block',
      textAlign: 'center',
      fontWeight: 600,
      '&:hover': {
        color: theme.palette.green.main
      }
    }
  },
  textInput: {
    ...theme.inputs.text,
    display: 'inline-block',
    width: '200px'
  }
});

const initialMsg = "Digite seu CEP e veja se entregamos na sua região.";

class SimpleCepChecker extends BaseContainer {

  constructor(props) {
    super(props, CepCheckerController);
  }

  state = {
    loading: false,
    cep: "",
    code: '',
    msg: initialMsg,
    searched: false,
    success: false, 
    description: ""
  }
  
  _renderDescription() {
    const descriptions = {
      success: 'Entregando para: ',
      invalid: 'O cep digitado é inválido.',
      unreachable: ''
    };

    const { code, cep }  = this.state;

    let string = descriptions[code];
    if(code === 'success') string += cep;

    return string && <p className='description'>{string}</p>;
  }

  _renderForm() {
    const { handleChange, handleSubmit } = this.controller;
    const { cep, loading, success, searched } = this.state;
    const { classes } = this.props;

    return (!searched || !success) &&
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        <TextInput
          id="cep"
          value={cep}
          placeholder='CEP'
          handleChange={handleChange}
          handleBlur={handleSubmit}
          className={classes.textInput}
        />
        {loading && <Loading inline size={20}/>}
      </form>;
  }

  render() { 
    const { classes } = this.props;
    const { success, searched, msg } = this.state;

    console.log(this.props.cep);

    return (
      <section className={classes.wrapper}>
        <h5>{msg}</h5>
        {this._renderDescription()}
        {this._renderForm()}
        <div>
          {
            searched && success ?
            <p
              onClick={() => this.setState({
                searched: false,
                msg: initialMsg
              })}
              className='alter'
            >
              alterar CEP
            </p> : null
          }
        </div>
      </section>
    );
  }
};

const mapStateToProps = state => ({
  cep: state.cep.current
});

SimpleCepChecker = compose(
  withStyles(styles),
  connect(mapStateToProps, actions)
)(SimpleCepChecker);

export { SimpleCepChecker };