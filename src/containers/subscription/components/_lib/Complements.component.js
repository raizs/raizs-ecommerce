import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import { withTimeline } from '../../../withTimeline';
import compose from 'recompose/compose';
import { Timeline, TimelineSections, TimelineSection, ProductsSlider } from '../../../../components';
import { ComplementsSection } from './ComplementsSection.component';
import { BottomSection } from './BottomSection.component';

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    userSelect: 'none',
    paddingBottom: '120px',
    minHeight: window.innerHeight - 64
  },
  top: {
    textAlign: 'center',
    backgroundColor: theme.palette.gray.bg,
    padding: 4 * theme.spacing.unit,
    paddingBottom: 0,
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
      '& > button#continue': {
        ...theme.buttons.primary,
        marginLeft: 2 * theme.spacing.unit,
        fontSize: theme.fontSizes.LG
      }
    }
  }
});

class Complements extends Component {

  _renderTimelineSections() {
    const {
      categories,
      cart,
      newProducts,
      products,
      handleUpdate,
      availableWidth,
      brands,
      stockDate
    } = this.props;
    const to = categories.complementsSectionsArr.map(item => {
      return (
        <TimelineSection style={{ marginTop: 0 }} key={item.id} id={item.id}>
          <ComplementsSection
            section={item}
            cart={cart}
            products={products}
            handleUpdateCart={handleUpdate}
            width={availableWidth}
            brands={brands}
            stockDate={stockDate}
            availableWidth={availableWidth}
          />
        </TimelineSection>
      );
    });

    to.unshift(
      <TimelineSection key='novidades' id='novidades'>
        <div style={{ paddingLeft: '32px' }}>
          <h3>Novidades</h3>
          <ProductsSlider
            cart={cart}
            all='allWithoutFLV'
            products={newProducts}
            handleUpdateCart={handleUpdate}
            availableWidth={availableWidth}
            stockDate={stockDate}
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
      currentSectionId,
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
          {/* <h2>Descubra diversos produtos e não perca mais tempo indo até o mercado.</h2> */}
        </section>

        <section className={classes.main}>
          <Timeline
            history={history}
            content={timelineContent}
            fixed={shouldFixTimeline}
            currentSectionId={currentSectionId}
            maxHeight='calc(100% - 108px)'
          />
          <TimelineSections fixed={shouldFixTimeline} timelineWidth={timelineWidth} width={availableWidth}>
            {this._renderTimelineSections()}
          </TimelineSections>
        </section>

        <BottomSection
          cart={cart}
          buttonLabel='Continuar para carrinho'
          buttonClickAction={() => history.push('/carrinho')}
        />
      </div>
    )
  }
}

Complements = compose(
  withTimeline({ sectionOffset: 50, padding: 16, sectionsOffset: 340 }),
  withStyles(styles),
  withRouter
)(Complements);

export { Complements };