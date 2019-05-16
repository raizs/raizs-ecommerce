import React from 'react'
import { CategoryItem } from '../../molecules';
import { withStyles } from '@material-ui/core';
import { categoryImages } from '../../assets';

const styles = theme => ({
  title: {
    fontSize: theme.fontSizes.LG,
    fontWeight: 700,
    marginTop: 6 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
    paddingLeft: 8 * theme.spacing.unit
  },
  mosaic: {
    paddingLeft: 8 * theme.spacing.unit
  }
});

let CategoriesMosaic = props => {
  const { classes, categories } = props;

  if(!categories) return null;

  return (
    <div>
      <h5 className={classes.title}>
        Categorias
      </h5>
      <div className={classes.mosaic}>
        {categories.catalogSectionsArr.map(category => {
          const { src, alt } = categoryImages[category.id];
          return (
            <CategoryItem
              title={category.parentName}
              src={src}
              alt={alt}
            />
          );
        })}
      </div>
    </div>
  );
}

CategoriesMosaic = withStyles(styles)(CategoriesMosaic);

export { CategoriesMosaic };