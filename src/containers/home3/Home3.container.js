import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import compose from 'recompose/compose';

import { updateCartAction } from '../../store/actions';
import { Home3Controller } from './Home3.controller';
import { BaseContainer } from '../../helpers';
import {
  ProductsSlider,
  CategoriesMosaic,
  Characteristics,
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
    display: 'inline-block',
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit
  },
  section: {
    padding: `${6 * theme.spacing.unit}px 0`,
  },
  title: {
    ...theme.typography.raizs,
    marginTop: 6 * theme.spacing.unit
  },
  subtitle: {
    fontSize: theme.fontSizes.LG,
    fontWeight: 700,
    marginBottom: 4 * theme.spacing.unit,
    paddingLeft: 8 * theme.spacing.unit
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
  }
});

class Home3 extends BaseContainer {
  constructor(props) {
    super(props, Home3Controller);
  }

  render() {
    const { classes, newProducts, cart, categories } = this.props;
    const { handleUpdateCart } = this.controller;

    return (
      <div className={classes.wrapper}>

        <section className={classes.section}>
          <h5 className={classes.subtitle}>
            Novidades
          </h5>
          <ProductsSlider
            products={newProducts}
            cart={cart}
            handleUpdateCart={handleUpdateCart}
          />
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

        <section className={classes.section}>
          <h5 className={classes.subtitle}>
            Características
          </h5>
          <Characteristics />
        </section>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  newProducts: state.products.newProducts,
  cart: state.cart.current,
  categories: state.categories.model
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(Home3);