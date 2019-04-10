import React from 'react'
import { withStyles } from '@material-ui/core';

import styles from './styles/catalogSection.styles'
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
    classes,
    subcategories,
    products,
    availableWidth,
    brands,
    handleUpdateCart,
    cart
  } = props;

  return (
    <div id={id} className={classes.wrapper} >
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

CatalogSection = withStyles(styles)(CatalogSection);

export { CatalogSection };
