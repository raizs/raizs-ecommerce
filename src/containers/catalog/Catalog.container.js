import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import compose from 'recompose/compose';
import { withStyles, Icon } from '@material-ui/core';

import { CatalogController } from './Catalog.controller';
import { BaseContainer } from '../../helpers';

import { Timeline, TimelineSections, TimelineSection } from '../../components';
import { CatalogSection } from './components';
import { withTimeline } from '../withTimeline';
import { catalogFilters } from '../../assets';

import classnames from "classnames";

import {
  setProductsAction,
  setUnitsOfMeasureAction,
  setProductBrandsAction,
  updateCartAction,
  openModalProductAction
} from '../../store/actions';

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    width: '100%'
  },
  sortBox:{
    paddingBottom: 2*theme.spacing.unit,
  },
  sortTitle:{
    display:"inline-block",
    fontWeight:800, 
    fontSize: theme.fontSizes.MD
  },
  sortItem:{
    display:"inline-block",
    marginLeft: 3*theme.spacing.unit,
    cursor:"pointer"
  },
  sortItemTitle:{
    verticalAlign:"middle",
    display:"inline-block",
    fontWeight:800, 
    fontSize: theme.fontSizes.MD,
  },
  sortIcon:{
    color: theme.palette.gray.main,
    verticalAlign:"middle"
  },
  selectedSortIcon:{
    color: theme.palette.green.main

  }
});

const actions = {
  setProductsAction,
  setUnitsOfMeasureAction,
  setProductBrandsAction,
  updateCartAction,
  openModalProductAction
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

  state = {
    filter: "popularity",
    ascending: false
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

   _renderFilters(){
    const { classes } = this.props;
    const { filter, ascending } = this.state;
    return catalogFilters.map(f=>{
      let iconClassName = [classes.sortIcon];
      let icon = "arrow_upward"
      if (filter == f.id){
        iconClassName.push(classes.selectedSortIcon)
        if (ascending){
          icon = "arrow_downward"
        }

      }
      return <div className={classes.sortItem} onClick={()=>this.controller.toggleSort(f.id)}>
        <div className={classes.sortItemTitle}>{f.label}</div>
        <Icon fontSize="large" className={classnames(iconClassName)}>{icon}</Icon>
      </div>
    })
   }

   _renderSortFiltersBox(){
    const { classes } = this.props;
    return <div className={classes.sortBox}>
        <div className={classes.sortTitle}>Ordenar por:</div>
        {this._renderFilters()}
    </div>
   }


  _renderTimelineSections() {
    const { categories, availableWidth, brands, cart, openModalProductAction } = this.props;
    const { handleUpdateCart, getProductsSortedByFilter } = this.controller;
    const products = getProductsSortedByFilter();
    return categories.catalogSectionsArr.map(item => {
      return (
        <TimelineSection key={item.id} id={item.id}>
        {this._renderSortFiltersBox()}
          <CatalogSection
            {...item}
            brands={brands}
            products={products}
            availableWidth={availableWidth}
            handleUpdateCart={handleUpdateCart}
            cart={cart}
            openModalProductAction={openModalProductAction}
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
      categories: { catalogTimelineObj }
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <Timeline
          history={history}
          fixed={shouldFixTimeline}
          content={{ items: catalogTimelineObj }}
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