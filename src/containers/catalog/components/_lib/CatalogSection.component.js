import React from 'react'

import { CatalogSectionList } from './CatalogSectionList.component';

const _renderSubcategories = ({
  subcategories,
  products,
  availableWidth,
  brands,
  handleUpdateCart,
  cart
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
    cart
  } = props;

  return (
    <div id={id}>
      {_renderSubcategories({
        subcategories,
        products,
        availableWidth,
        brands,
        handleUpdateCart,
        cart
      })}
    </div>
  )
};

export { CatalogSection };
