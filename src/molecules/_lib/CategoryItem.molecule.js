import React from 'react'
import classnames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  wrapper: {
    width: '160px',
    display: 'inline-block',
    verticalAlign: 'top',
    cursor: 'pointer',
    '& + .category-item': {
      marginLeft: 2 * theme.spacing.unit
    },
    '&:hover h5': {
      color: theme.palette.green.main
    }
  },
  image: {
    height: '140px',
    width: '100%',
    borderRadius: theme.spacing.unit
  },
  title: {
    fontSize: theme.fontSizes.MMD,
    lineHeight: theme.fontSizes.LG,
    fontWeight: 600
  }
});

let CategoryItem = props => {
  const { classes, src, alt, title } = props;
  return (
    <div className={classnames(classes.wrapper, 'category-item')}>
      <img className={classes.image} src={src} alt={alt} />
      <h5 className={classes.title}>{title}</h5>
    </div>
  )
};

CategoryItem = withStyles(styles)(CategoryItem);

export { CategoryItem };