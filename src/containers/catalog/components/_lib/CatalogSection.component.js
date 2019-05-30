import React from 'react'

import { CatalogSectionList } from './CatalogSectionList.component';

const _renderSubcategories = ({
  subcategories,
  products,
  availableWidth,
  brands,
  handleUpdateCart,
  cart,
  openModalProductAction,
  small,
  shouldAnchor = true
}) => {
  return subcategories.map(subcategory => {
    const groupedProducts = products.groupedByCategoryId[subcategory.subcategoryId] || [];
    return (
      <CatalogSectionList
        {...subcategory}
        cart={cart}
        brands={brands}
        key={subcategory.id}
        availableWidth={availableWidth}
        groupedProducts={groupedProducts}
        handleUpdateCart={handleUpdateCart}
        openModalProductAction={openModalProductAction}
        small={small}
        shouldAnchor={shouldAnchor}
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
    brands,
    handleUpdateCart,
    cart,
    openModalProductAction,
    small,
    shouldAnchor
  } = props;

  return (
    <div id={id}>
      {_renderSubcategories({
        subcategories,
        products,
        availableWidth,
        brands,
        handleUpdateCart,
        cart,
        openModalProductAction,
        small,
        shouldAnchor
      })}
    </div>
  )
};

export { CatalogSection };
