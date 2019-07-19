import React from 'react';
import { Image } from '../../components';
import { useTheme, makeStyles } from '@material-ui/styles';

export const ProductImage = props => {
  const { description, src } = props;
  const theme = useTheme();

  const styles = makeStyles({
    imgBox:{
      border: `1px solid ${theme.palette.gray.border}`,
      borderRadius: theme.spacing.unit,
      overflow: 'hidden',
      width: 360
    }
  });

  const classes = styles(props);

  return (
    <div className={classes.imgBox}>
      <Image
        width={360}
        height={360}
        alt={description}
        src={src} />
      {/* <img
        width={360}
        height={360}
        alt={description}
        src={src} /> */}
    </div>
  );
};