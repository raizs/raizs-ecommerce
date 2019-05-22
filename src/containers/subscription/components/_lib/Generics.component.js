import React, { Component } from 'react'
import { withStyles, Button, Icon, Tooltip } from '@material-ui/core';
import { QuantitySelector } from '../../../../molecules';
import { subscripionItems } from '../../../../assets';

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
      marginTop: 4 * theme.spacing.unit
    },
    '& > div.actions': {
      display: 'inline-block',
      width: '100%',
      maxWidth: '1100px',
      marginTop: 6 * theme.spacing.unit,
      '& > div': {
        width: '50%',
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
  item: {
    width: '162px',
    height: '240px',
    display: 'inline-block',
    margin: '0 16px',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    borderBottomRightRadius: 2 * theme.spacing.unit,
    borderBottomLeftRadius: 2 * theme.spacing.unit,
    border: `1px solid ${theme.palette.gray.border}`,
    position: 'relative',
    '& .qs-wrapper': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      '& .quantity-selector .quantity': {
        left: 0
      }
    },
    '& > img': {
      width: '160px',
      height: '160px',
      borderRadius: theme.spacing.unit
    },
    '& > p': {
      fontSize: theme.fontSizes.SM,
      lineHeight: '20px',
      fontWeight: 700,
      marginTop: theme.spacing.unit,
      '& span': {
        verticalAlign: 'middle',
        fontSize: theme.fontSizes.SM,
        marginLeft: theme.spacing.unit,
        color: theme.palette.green.main,
        cursor: 'pointer'
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

  _renderItems() {
    const { classes, products, cart, handleUpdate } = this.props;
    return products.map(product => {
      return (
        <div key={product.id} className={classes.item}>
          <img src={product.imageUrl} />
          <p>
            {product.name}
            <Tooltip><Icon>help_outline</Icon></Tooltip>
          </p>
          <div className='qs-wrapper'>
            <QuantitySelector
              item={product}
              changeAction={handleUpdate}
              quantity={cart.productQuantities[product.id] || 0}
              shouldClose={false}
            />
          </div>
        </div>
      )
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <section className={classes.top}>
          <h1>Assinatura</h1>
          <h2>Sua cesta de orgânicos personalizada,<br/>entregue em casa periodicamente.</h2>
        </section>
        <section className={classes.main}>
          <h3>Seleção de Orgânicos</h3>
          <h4>Enviamos o que tiver de melhor na semana, respeitando a maturidade e estação de cada hortaliça.<br/>Tentamos sempre enviar uma mistura de novidades e conforto, variando de semana a semana.</h4>
          <div className='items'>
            {this._renderItems()}
          </div>
          <div className='actions'>
            <div>
              <h4>Observações</h4>
              <h5>Possui alguma preferência ou restrição?</h5>
              <Button>Adicionar</Button>
            </div>
            <div>
              <h4>Precisa de ajuda para montar sua cesta?</h4>
              <h5>Responda a algumas perguntas para atendermos às suas necessidades.</h5>
              <Button>Faça o quiz</Button>
            </div>
          </div>
        </section>
        <section className={classes.bottom}>
          <div className='summary'>
            <p>Seleção de orgânicos: <b>8 itens</b></p>
            <p>Subtotal: <b>8 itens</b></p>
          </div>
          <div className='continue'>
            <Button>Continuar montando cesta</Button>
          </div>
        </section>
      </div>
    )
  }
}

Generics = withStyles(styles)(Generics);

export { Generics };