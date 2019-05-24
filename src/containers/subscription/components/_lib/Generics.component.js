import React, { Component } from 'react'
import { withStyles, Button } from '@material-ui/core';
import { toast } from "react-toastify";
import { GenericProduct } from './GenericProduct.component';
import { Formatter } from '../../../../helpers';
import { ObservationsModal } from './ObservationsModal.component';

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    userSelect: 'none',
    paddingBottom: '120px'
  },
  top: {
    textAlign: 'center',
    backgroundColor: theme.palette.gray.darkBg,
    padding: 4 * theme.spacing.unit,
    '& > h1': theme.typography.raizs,
    '& > h2': {
      marginTop: 4 * theme.spacing.unit,
      fontSize: theme.fontSizes.LG,
      lineHeight: '28px',
      fontWeight: 700
    }
  },
  main: {
    padding: 6 * theme.spacing.unit,
    textAlign: 'center',
    '& > h3': {
      fontSize: theme.fontSizes.MMD,
      lineHeight: '24px',
      fontWeight: 700
    },
    '& > h4': {
      fontSize: theme.fontSizes.MD,
      lineHeight: '20px',
      color: theme.palette.gray.main,
      fontWeight: 500,
      marginTop: 2 * theme.spacing.unit
    },
    '& > div.items': {
      marginTop: 4 * theme.spacing.unit,
      marginBottom: 2 * theme.spacing.unit
    },
    '& > div.actions': {
      display: 'inline-block',
      width: '100%',
      maxWidth: '1100px',
      marginTop: 6 * theme.spacing.unit,
      '& > div': {
        // width: '50%',
        width: '100%',
        display: 'inline-block',
        padding: 4 * theme.spacing.unit,
        verticalAlign: 'top',
        '& > h4': {
          fontSize: theme.fontSizes.MMD,
          lineHeight: '24px',
          fontWeight: 700
        },
        '& > h5': {
          fontSize: theme.fontSizes.MD,
          lineHeight: '20px',
          color: theme.palette.gray.main,
          fontWeight: 500,
          marginTop: theme.spacing.unit
        },
        '& > button': {
          ...theme.buttons.secondary,
          fontSize: theme.fontSizes.MD,
          marginTop: 2 * theme.spacing.unit
        }
      }
    }
  },
  bottom: {
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    '& > div.summary': {
      backgroundColor: theme.palette.gray.darkBg,
      padding: theme.spacing.unit,
      '& > p': {
        display: 'inline-block',
        margin: '0 16px',
        fontSize: theme.fontSizes.XS,
        color: theme.palette.gray.main
      }
    },
    '& > div.continue': {
      backgroundColor: theme.palette.gray.main,
      padding: 1.5 * theme.spacing.unit,
      '& > button': {
        ...theme.buttons.primary,
        fontSize: theme.fontSizes.LG
      }
    }
  }
});

class Generics extends Component {
  state = {
    isModalOpen: false,
    restrictions: '',
    preferences: '',
    currentObservations: {
      restrictions: '',
      preferences: ''
    }
  }

  componentDidMount() {
    const { currentObservations } = this.props;
    if(currentObservations) this.setState({ currentObservations });
  }

  componentWillReceiveProps(nextProps) {
    const { currentObservations } = nextProps, prevObservations = this.props.currentObservations;
    if(currentObservations && !prevObservations) this.setState({ currentObservations });
  }
  
  _renderItems() {
    const { products, cart, handleUpdate } = this.props;
    return products.map(product =>
      <GenericProduct
        item={product}
        quantity={cart.productQuantities[product.id] || 0}
        changeAction={handleUpdate}
      />
    );
  }

  _handleSubmit() {
    const { restrictions, preferences, currentObservations } = this.state;
    
    if(restrictions !== currentObservations.restrictions || preferences !== currentObservations.preferences)
      toast('Alterações salvas!', { autoClose: 3000 });

    this.setState({
      isModalOpen: false,
      currentObservations: { restrictions, preferences }
    });
  }

  _handleClose() {
    const { restrictions, preferences, currentObservations } = this.state;

    if(restrictions !== currentObservations.restrictions || preferences !== currentObservations.preferences)
      toast('Alterações descartadas.', { autoClose: 3000 });
    
    this.setState({
      isModalOpen: false,
      restrictions: '',
      preferences: ''
    });
  }

  render() {
    const { classes, cart, handleContinueAction } = this.props;
    const { isModalOpen, restrictions, preferences, currentObservations } = this.state;

    return (
      <div className={classes.wrapper}>
        <ObservationsModal
          open={isModalOpen}
          handleClose={this._handleClose.bind(this)}
          handleChange={e => this.setState({ [e.target.id]: e.target.value })}
          handleSubmit={this._handleSubmit.bind(this)}
          restrictions={restrictions}
          preferences={preferences}
        />

        <section className={classes.top}>
          <h1>Assinatura</h1>
          <h2>Sua cesta de orgânicos personalizada,<br/>entregue em casa periodicamente.</h2>
        </section>

        <section className={classes.main}>
          <h3>Seleção de Orgânicos Genéricos</h3>
          <h4>
            Enviamos o que tiver de melhor na semana, respeitando a maturidade e estação de cada hortaliça.<br/>
            Tentamos sempre enviar uma mistura de novidades e conforto, variando de semana a semana.
          </h4>
          <div className='items'>
            {this._renderItems()}
          </div>
          <div className='actions'>
            <div>
              <h4>Observações</h4>
              <h5>Possui alguma preferência ou restrição?</h5>
              <Button
                id='observations'
                onClick={() => this.setState({
                  isModalOpen: true,
                  restrictions: currentObservations.restrictions,
                  preferences: currentObservations.preferences
                })}
              >
                {
                  currentObservations.preferences || currentObservations.restrictions ?
                  'Editar' : 'Adicionar'
                }
              </Button>
            </div>
            {/* <div>
              <h4>Precisa de ajuda para montar sua cesta?</h4>
              <h5>Responda a algumas perguntas para atendermos às suas necessidades.</h5>
              <Button>Faça o quiz</Button>
            </div> */}
          </div>
        </section>

        <section className={classes.bottom}>
          <div className='summary'>
            <p>Orgânicos Genéricos: <b>{cart.productCount} ite{cart.productCount === 1 ? 'm' : 'ns'}</b></p>
            <p>Subtotal: <b>{Formatter.currency(cart.subtotal)}</b></p>
          </div>
          <div className='continue'>
            <Button
              id='continue'
              onClick={() => handleContinueAction(currentObservations)}
            >
              Continuar montando cesta
            </Button>
          </div>
        </section>

      </div>
    )
  }
}

Generics = withStyles(styles)(Generics);

export { Generics };