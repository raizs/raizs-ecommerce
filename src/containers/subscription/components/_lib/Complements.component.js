import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import { Formatter } from '../../../../helpers';
import { withTimeline } from '../../../withTimeline';
import compose from 'recompose/compose';
import { Timeline, TimelineSections, TimelineSection, ProductsSlider } from '../../../../components';
import { ComplementsSection } from './ComplementsSection.component';

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
    padding: 0
  },
  bottom: {
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 10,
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

class Complements extends Component {

  _renderTimelineSections() {
    const { categories, cart, newProducts, products, handleUpdate } = this.props;
    const to = categories.complementsSectionsArr.map(item => {
      return (
        <TimelineSection style={{ marginTop: 0 }} key={item.id} id={item.id}>
          <ComplementsSection
            section={item}
            cart={cart}
            products={products}
            handleUpdateCart={handleUpdate}
          />
        </TimelineSection>
      );
    });

    to.unshift(
      <TimelineSection key='novidades' id='novidades'>
        <div>
          <h3>Novidades</h3>
          <ProductsSlider
            cart={cart}
            all='allWithoutFLV'
            products={newProducts}
            handleUpdateCart={handleUpdate}
            isArrowSmall={true}
          />
        </div>
      </TimelineSection>
    );

    return to;
  }

  render() {
    const {
      classes,
      history,
      cart,
      availableWidth,
      timelineWidth,
      shouldFixTimeline,
      categories: { complementsTimelineObj }
    } = this.props;

    const timelineContent = {
      items: [
        {
          id: "novidades",
          label: "NOVIDADES",
          order: 0,
          url: "#novidades",
          isBig: true
        },
        ...complementsTimelineObj
      ]
    };

    return (
      <div className={classes.wrapper}>

        <section className={classes.top}>
          <h1>Complete sua cesta</h1>
          <h2>Descubra diversos produtos e não perca mais tempo indo até o mercado.</h2>
        </section>

        <section className={classes.main}>
          <Timeline
            history={history}
            content={timelineContent}
            fixed={shouldFixTimeline}
          />
          <TimelineSections fixed={shouldFixTimeline} timelineWidth={timelineWidth} width={availableWidth}>
            {this._renderTimelineSections()}
          </TimelineSections>
        </section>

        <section className={classes.bottom}>
          <div className='summary'>
            <p>Orgânicos Genéricos: <b>{cart.genericsCount} ite{cart.genericsCount === 1 ? 'm' : 'ns'}</b></p>
            <p>Complementos: <b>{cart.complementsCount} ite{cart.complementsCount === 1 ? 'm' : 'ns'}</b></p>
            <p>Subtotal: <b>{Formatter.currency(cart.subtotal)}</b></p>
          </div>
          <div className='continue'>
            <Button>Continuar para revisão</Button>
          </div>
        </section>

      </div>
    )
  }
}

Complements = compose(
  withTimeline,
  withStyles(styles),
  withRouter
)(Complements);

export { Complements };