import React from 'react'
import { withStyles } from '@material-ui/core';

import styles from './styles/catalogSection.styles'
import { CatalogSectionList } from './CatalogSectionList.component';


const _renderSubcategories = (subcategories, products, availableWidth) => {
  return subcategories.map(subcategory => {
    const groupedProducts = products.groupedByCategoryId[subcategory.subcategoryId] || [];
    return (
      <CatalogSectionList {...subcategory} groupedProducts={groupedProducts} availableWidth={availableWidth} />
    )
  });
};

let CatalogSection = props => {
  const { id, classes, subcategories, products, availableWidth } = props;

  return (
    <div id={id} className={classes.wrapper} >
      { _renderSubcategories(subcategories, products, availableWidth) }
    </div>
  )
};

CatalogSection = withStyles(styles)(CatalogSection);

export { CatalogSection };
