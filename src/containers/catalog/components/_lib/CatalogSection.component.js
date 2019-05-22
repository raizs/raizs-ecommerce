import React from 'react'

import { CatalogSectionList } from './CatalogSectionList.component';

const _renderSubcategories = ({
  subcategories,
  products,
  availableWidth,
  brands,
  handleUpdateCart,
  cart,
  openModalProductAction
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
    openModalProductAction
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
        openModalProductAction
      })}
    </div>
  )
};

export { CatalogSection };
