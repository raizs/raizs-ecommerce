import React from 'react'

import { CatalogSectionList } from './CatalogSectionList.component';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  h2: {
    fontSize: theme.fontSizes.LG,
    fontWeight: 700,
    marginBottom: 4 * theme.spacing.unit
  }
});

const _renderSubcategories = ({
  subcategories,
  products,
  availableWidth,
  handleUpdateCart,
  cart,
  openModalProductAction,
  small,
  shouldAnchor = true,
  filter,
  ascending,
  stockDate
}) => {
  return subcategories.map(subcategory => {
    const groupedProducts = products.groupedByCategoryId[subcategory.subcategoryId] || [];
    const grouped = {
      available: [],
      unavailable: []
    };

    groupedProducts.forEach(product => {
      if(product.stock && product.stock[stockDate] > 0) grouped.available.push(product);
      else if(product.stock && product.stock[stockDate] === 0)grouped.unavailable.push(product)
    });

    return (
      <CatalogSectionList
        {...subcategory}
        cart={cart}
        key={subcategory.id}
        availableWidth={availableWidth}
        groupedProducts={groupedProducts}
        grouped={grouped}
        handleUpdateCart={handleUpdateCart}
        openModalProductAction={openModalProductAction}
        small={small}
        shouldAnchor={shouldAnchor}
        filter={filter}
        ascending={ascending}
        stockDate={stockDate}
      />
    )
  });
};

let CatalogSection = props => {
  const {
    id,
    cart,
    small,
    filter,
    classes,
    products,
    stockDate,
    ascending,
    showTitle,
    parentName,
    shouldAnchor,
    subcategories,
    availableWidth,
    handleUpdateCart,
    openModalProductAction
  } = props;

  return (
    <div id={id}>
      {showTitle && <h2 className={classes.h2}>{parentName}</h2>}
      {_renderSubcategories({
        subcategories,
        products,
        availableWidth,
        handleUpdateCart,
        cart,
        openModalProductAction,
        small,
        shouldAnchor,
        filter,
        ascending,
        stockDate
      })}
    </div>
  )
};

CatalogSection = withStyles(styles)(CatalogSection);

export { CatalogSection };
