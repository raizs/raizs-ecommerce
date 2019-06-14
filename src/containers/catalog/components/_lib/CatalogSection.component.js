import React from 'react'

import { CatalogSectionList } from './CatalogSectionList.component';

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
  } = props;

  return (
    <div id={id}>
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

export { CatalogSection };
