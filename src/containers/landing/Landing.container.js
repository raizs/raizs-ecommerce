import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import { withFirebase } from 'react-redux-firebase';
import compose from 'recompose/compose';

import { abSections } from '../../assets';
import { updateCartAction } from '../../store/actions';
import {
  ProductsSlider,
  CategoriesMosaic,
  ClientCommentsSlider,
  MediaSlider,
  NewsletterSection,
  Characteristics
} from '../../components';
import { BaseContainer } from '../../helpers';
import { LandingController } from './Landing.controller';

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
    textAlign: 'center'
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

  abSections: {
    padding: '64px',
    display: 'flex',
    justifyContent: 'center', 
    '& > div.wrapper': {
      width: '100%',
      maxWidth: '1000px',
    }
  },
  abSection: {
    width: '100%',
    height: '320px',
    '& > div': {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    '& + div': {
      marginTop: 3 * theme.spacing.unit
    }
  },
  abText: {
    '& > .title': {
      fontSize: theme.fontSizes.XL,
      fontWeight: 600,
      marginBottom: 2 * theme.spacing.unit
    },
    '& > .description': {
      fontSize: theme.fontSizes.MD,
      color: theme.palette.gray.main,
      fontWeight: 400,
      lineHeight: theme.fontSizes.MMD,
      whiteSpace: 'pre-wrap'
    }
  },
  abImage: {
    height: '100%',
    '& > img': {
      height: '100%',
      maxWidth: '100%',
      borderRadius: theme.spacing.unit
    }
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
    padding: '80px 0'
  },
  familiesSubtitle: {
    fontSize: theme.fontSizes.MMD,
    color: theme.palette.gray.main,
    fontWeight: 500,
    textAlign: 'center',
    marginTop: 4 * theme.spacing.unit,
    marginBottom: 3 * theme.spacing.unit,
    lineHeight: '24px'
  }
});

class Landing extends BaseContainer {
  constructor(props) {
    super(props, LandingController);
  }

  state = {
    newsletterEmail: '',
    newsletterLoading: false
  }

  componentWillMount() {
    // if(window.localStorage.getItem('is_first_login'))
    //   this.props.history.push('home');
  }

  componentDidMount() {
    window.localStorage.setItem('is_first_login', true);
  }
  
  _renderAbSections() {
    const { classes } = this.props;

    return abSections.map(({ a, b, key }) => {

      const contentTypes = {
        text: el => (
          <div
            className={classes.abText}
            style={{
              width: `calc(${el.width} - 24px)`,
              [`margin${el.section === 'a' ? 'Right' : 'Left'}`]: '24px'
            }}
          >
            <h4 className='title'>{el.title}</h4>
            <p className='description'>{el.description}</p>
          </div>
        ),
        image: el => (
          <div
            className={classes.abImage}
            style={{
              width: `calc(${el.width} - 24px)`,
              [`margin${el.section === 'a' ? 'Right' : 'Left'}`]: '24px'
            }}
          >
            <img src={el.src} alt={el.alt} style={{ float: el.section === 'b' ? 'right' : 'left' }} />
          </div>
        )
      };

      return (
        <div key={key} className={classes.abSection}>
          {contentTypes[a.type](a)}
          {contentTypes[b.type](b)}
        </div>
      )
    });
  }
  
  render() {
    const { classes, history, cart, popularProducts, categories } = this.props;
    const { newsletterEmail, newsletterLoading } = this.state;
    const { handleSubmitNewsletter, handleUpdateCart } = this.controller;

    return (
      <div className={classes.wrapper}>

        <section id='top' className={classes.topSection}>
          <h1 className={classes.topH1}>
            ORGÂNICOS CERTIFICADOS,<br/>DE PEQUENOS PRODUTORES,<br/>NA PORTA DA SUA CASA
          </h1>
          <h2 className={classes.topH2}>
            Você escolhe o dia que quer receber, de segunda a sábado.<br/>
            Simples, rápido e seguro.
          </h2>
        </section>

        <section id='abSection' className={classes.abSections}>
          <div className='wrapper'>
            {this._renderAbSections()}
          </div>
        </section>

        <section id='ourProducts' style={{ marginBottom: '64px' }}>
          <h3 className={classes.title} style={{ marginBottom: '48px' }}>Conheça nossos produtos</h3>
          <Characteristics />
          <ProductsSlider
            cart={cart}
            handleUpdateCart={handleUpdateCart}
            products={popularProducts}
          />
          <div style={{ textAlign: 'center' }}>
            <Button
              onClick={() => history.push('catalogo')}
              className={classes.primaryButton}
              style={{ marginTop: '24px' }}
            >
              Veja Mais
            </Button>
          </div>
          <CategoriesMosaic categories={categories} />
        </section>

        <section className={classes.subscriptionSection}>
          <h3 className={classes.title} style={{ fontSize: '32px', color: 'white', fontWeight: 500 }}>
            Preguiça de fazer um pedido toda semana?
          </h3>
          <h4 className={classes.subscriptionSubtitle}>Você pode fazer uma cesta, personalizada por você mesmo.</h4>
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
          <h3 className={classes.title}>
            Quem produz o que você come?
          </h3>
          <h4 className={classes.familiesSubtitle}>
            Conheça as famílias produtoras e<br/>valorize quem cultiva seus orgânicos.
          </h4>
          <div style={{ textAlign: 'center' }}>
            <Button
              onClick={() => console.log('to familias?')}
              className={classes.primaryButton}
              style={{ fontSize: '16px' }}
            >
              Famílias
            </Button>
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
  connect(mapStateToProps, actions),
  withFirebase
)(Landing);