import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import { Formatter } from '../../../../helpers';
import { withTimeline } from '../../../withTimeline';
import compose from 'recompose/compose';
import { Timeline, TimelineSections, TimelineSection } from '../../../../components';

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
    const { categories } = this.props;
    return categories.catalogSectionsArr.map(item => {
      console.log(item);
      return (
        <TimelineSection key={item} id={item}>
          a
        </TimelineSection>
      );
    });
  }

  render() {
    const {
      classes,
      history,
      cart,
      availableWidth,
      timelineWidth,
      shouldFixTimeline,
      categories: { timelineObj }
    } = this.props;

    return (
      <div className={classes.wrapper}>

        <section className={classes.top}>
          <h1>Complete sua cesta</h1>
          <h2>Descubra diversos produtos e não perca mais tempo indo até o mercado.</h2>
        </section>

        <section className={classes.main}>
          <Timeline
            history={history}
            content={{ items: timelineObj }}
            fixed={shouldFixTimeline}
          />
          <TimelineSections fixed={shouldFixTimeline} timelineWidth={timelineWidth} width={availableWidth}>
            {this._renderTimelineSections()}
          </TimelineSections>
        </section>

        <section className={classes.bottom}>
          <div className='summary'>
            <p>Orgânicos Genéricos: <b>{cart.productCount} ite{cart.productCount === 1 ? 'm' : 'ns'}</b></p>
            <p>Complementos: <b>{cart.productCount} ite{cart.productCount === 1 ? 'm' : 'ns'}</b></p>
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