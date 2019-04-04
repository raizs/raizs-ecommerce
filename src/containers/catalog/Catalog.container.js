import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';

import styles from './catalog.styles';

import { CatalogController } from './Catalog.controller';
import { BaseContainer } from '../../helpers';

import { setProductsAction, setUnitsOfMeasureAction } from '../../store/actions';
import { withTimeline } from '../withTimeline';
import { catalogMacroSections } from '../../assets';
import { Timeline, TimelineSections, TimelineSection, CatalogSection } from '../../components';

const actions = { setProductsAction, setUnitsOfMeasureAction };

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
    const { categories, products, availableWidth } = this.props;

    return categories.catalogSectionsArr.map(item => {
      return (
        <TimelineSection key={item.id} id={item.id}>
          <CatalogSection {...item} products={products} availableWidth={availableWidth} />
        </TimelineSection>
      );
    });
  }

  render() {
    const { classes, history, availableWidth, timelineWidth, shouldFixTimeline, categories: { timelineObj } } = this.props;

    return (
      <div className={classes.wrapper}>
        <Timeline fixed={shouldFixTimeline} history={history} content={{ items: timelineObj }} />
        <TimelineSections fixed={shouldFixTimeline} timelineWidth={timelineWidth} width={availableWidth}>
          {this._renderTimelineSections()}
        </TimelineSections>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.model,
  categories: state.categories.model,
  uom: state.unitsOfMeasure.model
})

export default compose(
  withTimeline,
  withStyles(styles),
  connect(mapStateToProps, actions)
)(Catalog);