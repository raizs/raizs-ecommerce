import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import compose from 'recompose/compose';
import { withStyles, Icon, Button } from '@material-ui/core';

import { CatalogController } from './Catalog.controller';
import { BaseContainer } from '../../helpers';

import {
  Timeline,
  TimelineSections,
  TimelineSection
} from '../../components';
import { CatalogSection } from './components';
import { withTimeline } from '../withTimeline';
import { catalogFilters } from '../../assets';

import classnames from "classnames";

import {
  updateCartAction,
  openModalProductAction,
  selectDateAction,
  openCartWarningModalAction
} from '../../store/actions';

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    width: '100%',
    position: 'relative',
    userSelect: 'none',
    '& div.date-picker-wrapper': {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 2 * theme.spacing.unit,
    },
    '& > button#backToTop': {
      ...theme.buttons.secondary,
      height: 40,
      width: '40px',
      minWidth: '40px',
      borderRadius: '50%',
      position: 'fixed',
      top: -48,
      right: 32,
      boxShadow: theme.shadows[5],
      textAlign: 'center',
      lineHeight: '40px',
      zIndex: 10,
      transition: 'top .4s',
      '& *': { color: theme.palette.green.main },
      '& > span': { position: 'absolute' },
      '&.-show': { top: 4 * theme.spacing.unit },
      '&:hover': { top: '200px !important' },
    }
  },
  sortBox: {
    paddingBottom: 2*theme.spacing.unit,
    position: 'absolute',
    right: '32px'
  },
  sortTitle: {
    display:"inline-block",
    fontWeight:800, 
    fontSize: theme.fontSizes.MD
  },
  sortItem: {
    display:"inline-block",
    marginLeft: 3*theme.spacing.unit,
    cursor:"pointer"
  },
  sortItemTitle: {
    verticalAlign:"middle",
    display:"inline-block",
    fontWeight:800, 
    fontSize: theme.fontSizes.MD,
  },
  sortIcon: {
    color: theme.palette.gray.main,
    verticalAlign:"middle"
  },
  selectedSortIcon: {
    color: theme.palette.green.main
  }
});

const actions = {
  updateCartAction,
  openModalProductAction,
  selectDateAction,
  openCartWarningModalAction
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
    ascending: false,
    shouldDisplayBackButton: false,

    currentSectionId: ''
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  componentDidMount() {
    window.addEventListener('scroll', this._scrollEvent.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this._scrollEvent);
  }
  
  _scrollEvent(e) {
    const { shouldDisplayBackButton } = this.state;
    const scrollTop = document.documentElement.scrollTop;
    const breakpoint = 200;

    if(!shouldDisplayBackButton && scrollTop > breakpoint) this.setState({ shouldDisplayBackButton: true });
    if(shouldDisplayBackButton && scrollTop <= breakpoint) this.setState({ shouldDisplayBackButton: false });
  }
  
  /**
   * _renderTimelineSections - renders the correct section based on the
   * section id
   *
   * @returns
   * @memberof Catalog
   */

   _renderFilters() {
    const { classes } = this.props;
    const { filter, ascending } = this.state;

    return catalogFilters.map(f => {
      let iconClassName = [classes.sortIcon];
      let icon = "arrow_upward";
      if(filter === f.id) {
        iconClassName.push(classes.selectedSortIcon);
        if(ascending) icon = "arrow_downward";
      }
      return <div key={f.id} className={classes.sortItem} onClick={()=>this.controller.toggleSort(f.id)}>
        <div className={classes.sortItemTitle}>{f.label}</div>
        <Icon fontSize="large" className={classnames(iconClassName)}>{icon}</Icon>
      </div>
    });
   }

   _renderSortFiltersBox() {
    const { classes } = this.props;
    return <div className={classes.sortBox}>
      <div className={classes.sortTitle}>Ordenar por:</div>
      {this._renderFilters()}
    </div>
   }

  _renderTimelineSections() {
    const { categories, availableWidth, cart, openModalProductAction, selectedDateObj } = this.props;
    const { handleUpdateCart, getAvailableProducts } = this.controller;
    const { filter, ascending } = this.state;
    const { products } = getAvailableProducts();
    
    return categories.catalogSectionsArr.map(item => {
      return (
        <TimelineSection key={item.id} id={item.id}>
          {this._renderSortFiltersBox()}
          <CatalogSection
            {...item}
            cart={cart}
            filter={filter}
            products={products}
            ascending={ascending}
            availableWidth={availableWidth}
            handleUpdateCart={handleUpdateCart}
            openModalProductAction={openModalProductAction}
            stockDate={selectedDateObj.stockDate}
          />
        </TimelineSection>
      );
    });
  }

  render() {
    const { shouldDisplayBackButton } = this.state;
    const {
      classes,
      history,
      availableWidth,
      timelineWidth,
      shouldFixTimeline,
      categories: { catalogTimelineObj },
      currentSectionId,
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <Timeline
          history={history}
          fixed={shouldFixTimeline}
          content={{ items: catalogTimelineObj }}
          currentSectionId={currentSectionId}
        />
        <TimelineSections
          width={availableWidth}
          fixed={shouldFixTimeline}
          timelineWidth={timelineWidth}
        >
          {this._renderTimelineSections()}
        </TimelineSections>
        <Button
          id='backToTop'
          onClick={() => window.scrollTo({ top: 0 })}
          className={shouldDisplayBackButton ? '-show' : ''}
        >
          <Icon>keyboard_arrow_up</Icon>
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  brands: state.brands.model,
  categories: state.categories.model,
  products: state.products.model,
  uom: state.unitsOfMeasure.model,
  cart: state.cart.current,
  subscriptionCart: state.subscriptionCart.current,
  date: state.datePicker,
  selectedDate: state.datePicker.selected,
  selectedDateObj: state.datePicker.obj,
  stockDate: state.datePicker.obj.stockDate
})

export default compose(
  withTimeline,
  withStyles(styles),
  connect(mapStateToProps, actions)
)(Catalog);