import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import compose from 'recompose/compose';

import { updateCartAction } from '../../store/actions';
import { HomeController } from './Home.controller';
import { BaseContainer } from '../../helpers';
import {
  ProductsSlider,
  CategoriesMosaic,
  ClientCommentsSlider,
  MediaSlider,
  NewsletterSection
} from '../../components';

const actions = { updateCartAction };

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    userSelect: 'none'
  },
  primaryButton: {
    ...theme.buttons.primary,
    fontSize: theme.fontSizes.LG,
    display: 'inline-block'
  },
  topSection: {
    height: window.innerHeight - 96,
    '& > div.half': {
      width: '50%',
      height: '100%',
      display: 'inline-block',
      verticalAlign: 'top',
      padding: 6 * theme.spacing.unit,
      textAlign: 'center',
      '& > h2': {
        ...theme.typography.raizs,
        marginTop: window.innerHeight/5
      },
      '& > h4': {
        marginTop: 2 * theme.spacing.unit,
        fontSize: theme.fontSizes.MD,
        lineHeight: '20px',
        fontWeight: 700
      },
      '& > h6': {
        fontSize: theme.fontSizes.XS,
        color: theme.palette.gray.main,
        marginTop: theme.spacing.unit,
        fontWeight: 500
      },
      '& > button': {
        ...theme.buttons.primary,
        fontSize: theme.fontSizes.MD,
        marginTop: 4 * theme.spacing.unit
      }
    }
  },
  title: {
    ...theme.typography.raizs,
    marginTop: 6 * theme.spacing.unit
  },
  topH1: {
    ...theme.typography.raizs,
    paddingTop: '120px'
  },
  topH2: {
    marginTop: '48px',
    fontSize: theme.fontSizes.LG,
    fontWeight: 700,
    lineHeight: '32px'
  },

  subscriptionSection: {
    height: '420px',
    width: '100%',
    backgroundImage: "url('https://i0.wp.com/www.showmetech.com.br/wp-content/uploads//2018/07/cestaabundancia.jpg?resize=990%2C556&ssl=1')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    paddingTop: '64px'
  },
  subscriptionSubtitle: {
    color: 'white',
    fontSize: theme.fontSizes.MMD,
    lineHeight: theme.fontSizes.LG,
    marginTop: theme.spacing.unit,
    marginBottom: 6 * theme.spacing.unit,
    textAlign: 'center',
  },

  commentsSection: {
    padding: '64px 0'
  },

  mediaSection: {
    padding: '80px 0'
  },

  familiesSection: {
    position: 'relative',
    '& > div': {
      display: 'inline-block',
      verticalAlign: 'top',
      padding: 8 * theme.spacing.unit
    },
    '& > div.content': {
      width: '40%',
      '& > h3': {
        ...theme.typography.raizs,
        textAlign: 'left',
        fontSize: theme.fontSizes.XL,
        lineHeight: '48px'
      },
      '& > h4': {
        fontSize: theme.fontSizes.MD,
        color: theme.palette.gray.main,
        fontWeight: 500,
        textAlign: 'left',
        marginTop: 4 * theme.spacing.unit,
        marginBottom: 3 * theme.spacing.unit,
        lineHeight: '20px'
      }
    }
  }
});

class Home extends BaseContainer {
  constructor(props) {
    super(props, HomeController);
  }

  state = {
    newsletterEmail: '',
    newsletterLoading: false
  }

  render() {
    const { classes, history, popularProducts, cart, categories } = this.props;
    const { newsletterEmail, newsletterLoading } = this.state;
    const { handleSubmitNewsletter, handleUpdateCart } = this.controller;

    return (
      <div className={classes.wrapper}>

        <section id='top' className={classes.topSection}>
          <div className='half'>
            <h2>Cesta</h2>
            <h4>Assine uma cesta personalizada e receba<br/>orgânicos variados periodicamente.</h4>
            <h6>Não precisa lembrar de refazer o pedido!</h6>
            <Button className={classes.primaryButton}>Monte agora</Button>
          </div>
          <div className='half'>
            <h2>Avulso</h2>
            <h4>Escolha orgânicos sazonais à dedo e<br/>receba-os em casa, no dia que escolher.</h4>
            <Button className={classes.primaryButton}>Explore produtos</Button>
          </div>
        </section>

        <section id='ourProducts'>
          <CategoriesMosaic categories={categories} />
          <div style={{ padding: '64px 24px 0 24px' }}>
            <ProductsSlider
              cart={cart}
              handleUpdateCart={handleUpdateCart}
              products={popularProducts}
            />
          </div>
          <div style={{ textAlign: 'center', paddingBottom: '48px' }}>
            <Button
              onClick={() => history.push('catalogo')}
              className={classes.primaryButton}
              style={{ marginTop: '24px' }}
            >
              Veja Mais
            </Button>
          </div>
        </section>

        <section className={classes.subscriptionSection}>
          <h3 className={classes.title} style={{ fontSize: '32px', color: 'white', fontWeight: 500 }}>
            Faça uma assinatura
          </h3>
          <h4 className={classes.subscriptionSubtitle}>
            Personalize sua cesta e receba orgânicos periodicamente!
          </h4>
          <div style={{ textAlign: 'center' }}>
            <Button onClick={() => console.log('to assinaturas?')} className={classes.primaryButton}>Saiba mais</Button>
          </div>
        </section>

        <section className={classes.commentsSection}>
          <ClientCommentsSlider />
        </section>

        <section className={classes.mediaSection}>
          <MediaSlider />
        </section>
        
        <NewsletterSection
          id='newsletterEmail'
          value={newsletterEmail}
          handleSubmit={handleSubmitNewsletter}
          handleChange={e => this.setState({ [e.target.id]: e.target.value })}
          loading={newsletterLoading}
        />

        <section className={classes.familiesSection}>
          <div className='content'>
            <h3>Quem produz o que você come?</h3>
            <h4>
              Sabia que parte da sua compra é destinada ao Fundo do Pequeno Produtor?<br/>
              Conheça as famílias produtoras e valorize quem cultiva seus orgânicos.
            </h4>
            <Button
              onClick={() => console.log('to familias?')}
              className={classes.primaryButton}
              style={{ fontSize: '16px' }}
            >
              Famílias Produtoras
            </Button>
          </div>
          <div className='images'>
            <p>Imagens aqui.</p>
          </div>
        </section>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  popularProducts: state.products.popularProducts,
  cart: state.cart.current,
  categories: state.categories.model
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(Home);