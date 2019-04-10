import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';

import styles from './catalog.styles';

import { CatalogController } from './Catalog.controller';
import { BaseContainer } from '../../helpers';

import { Timeline, TimelineSections, TimelineSection } from '../../components';
import { CatalogSection } from './components';
import { withTimeline } from '../withTimeline';

import {
  setProductsAction,
  setUnitsOfMeasureAction,
  setProductBrandsAction,
  updateCartAction
} from '../../store/actions';

const actions = {
  setProductsAction,
  setUnitsOfMeasureAction,
  setProductBrandsAction,
  updateCartAction
};

/**
 * Catalog - Container 'Catálogo'
 *
 * @export
 * @class Catalog
 * @extends {BaseContainer}
 */
class Catalog extends BaseContainer {
  constructor(props) {
    super(props, CatalogController);
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  componentDidMount = () => {
    this.controller.initialFetch();
  }

  /**
   * _renderTimelineSections - renders the correct section based on the
   * section id
   *
   * @returns
   * @memberof Catalog
   */
  _renderTimelineSections() {
    const { categories, products, availableWidth, brands, cart } = this.props;
    const { handleUpdateCart } = this.controller;

    return categories.catalogSectionsArr.map(item => {
      return (
        <TimelineSection key={item.id} id={item.id}>
          <CatalogSection
            {...item}
            brands={brands}
            products={products}
            availableWidth={availableWidth}
            handleUpdateCart={handleUpdateCart}
            cart={cart}
          />
        </TimelineSection>
      );
    });
  }

  render() {
    const {
      classes,
      history,
      availableWidth,
      timelineWidth,
      shouldFixTimeline,
      categories: { timelineObj }
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <Timeline
          history={history}
          fixed={shouldFixTimeline}
          content={{ items: timelineObj }}
        />
        <TimelineSections
          width={availableWidth}
          fixed={shouldFixTimeline}
          timelineWidth={timelineWidth}
        >
          {this._renderTimelineSections()}
        </TimelineSections>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  brands: state.brands.model,
  categories: state.categories.model,
  products: state.products.model,
  uom: state.unitsOfMeasure.model,
  cart: state.cart.current
})

export default compose(
  withTimeline,
  withStyles(styles),
  connect(mapStateToProps, actions)
)(Catalog);