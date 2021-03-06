import React from 'react';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { Image } from '../../components';

const styles = theme => ({
  imgBox:{
    border: `1px solid ${theme.palette.gray.border}`,
    borderRadius: theme.spacing.unit,
    overflow: 'hidden',
    width: 360
  }
});

let ProductImage = props => {
  const { classes, description, src } = props;

  return (
    <div className={classes.imgBox}>
      <Image
        width={360}
        height={360}
        alt={description}
        src={src} />
    </div>
  );
};

ProductImage = compose(
  withStyles(styles),
)(ProductImage);

export { ProductImage };