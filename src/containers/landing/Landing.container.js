import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import { withFirebase } from 'react-redux-firebase';
import compose from 'recompose/compose';
import Slider from 'react-slick';

import { abSections, categoryImages, mediaObjects } from '../../assets';
import { updateCartAction } from '../../store/actions';
import { CatalogProduct, SliderArrow, CategoryItem, ClientComment, Loading } from '../../molecules';
import { LandingController } from './Landing.controller';
import { BaseContainer } from '../../helpers';

const actions = { updateCartAction };

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    userSelect: 'none'
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
  
  popularProductsSliderWrapper: {
    padding: '0 64px 24px 64px',
    position: 'relative',
    marginTop: 4 * theme.spacing.unit,
    '& .slick-slide': {
      display: 'inline-block',
      verticalAlign: 'top',
      '& > div:focus, & > div > div:focus': {
        outline: 'none'
      }
    }
  },
  primaryButton: {
    ...theme.buttons.primary,
    fontSize: theme.fontSizes.LG,
    display: 'inline-block'
  },
  subtitle: {
    fontSize: theme.fontSizes.LG,
    fontWeight: 700,
    marginTop: 6 * theme.spacing.unit
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
  commentsSliderWrapper: {
    position: 'relative',
    marginTop: 4 * theme.spacing.unit,
    '& .slick-slider': {
      padding: `0 ${.48 * window.innerWidth - 332}px !important`
    },
    '& .slick-slide': {
      display: 'inline-block',
      verticalAlign: 'top',
      '& > div:focus, & > div > div:focus': {
        outline: 'none'
      },
      '&.slick-active div.wrapper': {
        border: `1px solid ${theme.palette.green.main}`
      }
    },
    '& .slick-dots': {
      textAlign: 'center',
      marginTop: 3 * theme.spacing.unit,
      '& li': {
        width: 'auto',
        display: 'inline-block',
        margin: '0 4px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        height: '8px',
        width: '8px',
        borderRadius: '50%',
        '& button': {
          position: 'absolute',
          color: 'transparent',
          backgroundColor: theme.palette.gray.main,
          height: '8px',
          width: '8px',
          borderRadius: '50%',
          cursor: 'pointer',
        },
        '&.slick-active button': {
          backgroundColor: theme.palette.green.main,
        }
      }
    }
  },

  mediaSection: {
    padding: '80px 0'
  },
  mediaSliderWrapper: {
    position: 'relative',
    marginTop: 12 * theme.spacing.unit,
    '& .slick-slide': {
      display: 'inline-block',
      verticalAlign: 'middle',
      '& a': {
        cursor: 'default',
        textAlign: 'center',
        '& img': {
          cursor: 'pointer'
        },
        '&:focus': {
          outline: 'none'
        }
      }
    },
  },

  newsletterSection: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.palette.green.main,
    textAlign: 'center',
    '& > h5': {
      color: 'white',
      fontSize: theme.fontSizes.LG,
      lineHeight: '28px',
      fontWeight: 700,
      marginBottom: 3 * theme.spacing.unit,
      paddingTop: 6 * theme.spacing.unit
    },
    '& > div.input-wrapper': {
      position: 'relative',
      display: 'inline-block',
      width: '720px',
      paddingBottom: 6 * theme.spacing.unit,
      '&  > input': {
        width: '100%',
        padding: 4 * theme.spacing.unit,
        borderRadius: theme.spacing.unit,
        fontSize: theme.fontSizes.MD,
        '&:focus': {
          outline: 'none'
        }
      },
      '& > button': {
        ...theme.buttons.secondary,
        fontSize: theme.fontSizes.MD,
        height: '45px',
        position: 'absolute',
        right: '32px',
        top: '20px',
      }
    }
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
    //   this.props.history.push('quem-somos');
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

  _renderPopularProducts() {
    const { popularProducts, cart } = this.props;
    const { handleUpdateCart } = this.controller;

    const settings = {
      slidesToShow: Math.floor(window.innerWidth / 256) - 1,
      slidesToScroll: Math.floor(window.innerWidth / 256) - 1,
      prevArrow: <SliderArrow to='prev' />,
      nextArrow: <SliderArrow to='next' />,
      infinite: false,
      draggable: false
    };

    return popularProducts && popularProducts.all.length ? (
      <Slider {...settings}>
        {popularProducts.all.map(product => {
          return (
            <div>
              <CatalogProduct
                cart={cart}
                key={product.id}
                product={product}
                handleUpdateCart={handleUpdateCart}
               />
            </div>
          )
        })}
      </Slider>
    ) : null;
  }
  
  _renderCategories() {
    if(!this.props.categories) return;

    return this.props.categories.catalogSectionsArr.map(category => {
      const { src, alt } = categoryImages[category.id];
      return (
        <CategoryItem
          title={category.parentName}
          src={src}
          alt={alt}
        />
      );
    });
  }

  _renderClientComments() {
    const settings = {
      slidesToShow: 1,
      centerMode: true,
      arrows: false,
      dots: true,
      infinite: true,
      draggable: false,
      autoplay: true,
      autoplaySpeed: 5000
    };

    return (
      <Slider {...settings}>
        {[1,2,3,4,5].map(comment => {
          return <ClientComment />;
        })}
      </Slider>
    );
  }

  _renderMediaObjects() {
    const settings = {
      slidesToShow: 3,
      centerMode: true,
      arrows: false,
      infinite: true,
      draggable: false,
      autoplay: true,
      autoplaySpeed: 3000
    };

    return (
      <Slider {...settings}>
        {mediaObjects.map(obj => {
          return <a target='blank' href={obj.url}><img src={obj.src} /></a>;
        })}
      </Slider>
    );
  }
  
  render() {
    const { classes, history } = this.props;
    const { newsletterEmail, newsletterLoading } = this.state;
    const { handleSubmitNewsletter } = this.controller;

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

        <section id='ourProducts'>
          <h3 className={classes.title}>Conheça nossos produtos</h3>
          <div className={classes.popularProductsSliderWrapper}>
            {this._renderPopularProducts()}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button
              onClick={() => history.push('catalogo')}
              className={classes.primaryButton}
              style={{ marginTop: '24px' }}
            >
              Veja Mais
            </Button>
          </div>
          <h5 className={classes.subtitle} style={{ paddingLeft: '64px', marginBottom: '16px' }}>
            Categorias
          </h5>
          <div style={{ paddingLeft: '64px', paddingBottom: '64px' }}>
            {this._renderCategories()}
          </div>
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
          <h3 className={classes.title} style={{ marginTop: 0, marginBottom: '36px' }}>
            Veja o que outros clientes tem a dizer!
          </h3>
          <div className={classes.commentsSliderWrapper}>
            {this._renderClientComments()}
          </div>
        </section>

        <section className={classes.mediaSection}>
          <h3 className={classes.title} style={{ marginTop: 0, marginBottom: '36px' }}>
            Raízs na mídia
          </h3>
          <div className={classes.mediaSliderWrapper}>
            {this._renderMediaObjects()}
          </div>
        </section>
        
        <section className={classes.newsletterSection}>
          {newsletterLoading && <Loading absolute />}
          <h5>Fique por dentro de novidades e promoções,<br/>inscreva-se na nossa newsletter.</h5>
          <div className='input-wrapper'>
            <input
              id='newsletterEmail'
              value={newsletterEmail}
              placeholder='Digite seu e-mail aqui'
              onChange={e => this.setState({ newsletterEmail: e.target.value })}
            />
            <Button id='sendNewsletter' onClick={handleSubmitNewsletter} >
              Enviar
            </Button>
          </div>
        </section>

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