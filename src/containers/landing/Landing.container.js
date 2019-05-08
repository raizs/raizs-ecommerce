import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import { withFirebase } from 'react-redux-firebase';
import compose from 'recompose/compose';
import Slider from 'react-slick';

import { abSections } from '../../assets';
import { updateCartAction } from '../../store/actions';
import { CatalogProduct, SliderArrow } from '../../molecules';
import { LandingController } from './Landing.controller';
import { BaseContainer } from '../../helpers';

const actions = { updateCartAction };

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg
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
  sliderWrapper: {
    position: 'relative',
    height: '360px',
    padding: '0 64px',
    '& .slick-slide': {
      display: 'inline-block',
      verticalAlign: 'top',
      '& > div:focus, & > div > div:focus': {
        outline: 'none'
      }
    }
  }
});

class Landing extends BaseContainer {
  constructor(props) {
    super(props, LandingController);
  }

  state = {
    showTopButton: true 
  }

  componentDidMount() {
    
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
    const { classes, popularProducts, cart } = this.props;
    const { handleUpdateCart } = this.controller;

    const settings = {
      slidesToShow: Math.floor(window.innerWidth / 256) - 1,
      slidesToScroll: Math.floor(window.innerWidth / 256) - 1,
      prevArrow: <SliderArrow to='prev' />,
      nextArrow: <SliderArrow to='next' />,
      infinite: false,
      draggable: false,
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
    ) : null
  }
  
  render() {
    const { classes } = this.props;

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
          <div className={classes.sliderWrapper}>
            {this._renderPopularProducts()}
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  popularProducts: state.products.popularProducts,
  cart: state.cart.current
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions),
  withFirebase
)(Landing);