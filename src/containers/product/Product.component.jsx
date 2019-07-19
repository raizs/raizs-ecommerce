import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Icon } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/styles';

import { Loading, ProductImage, ProductSummary, ProductFamilies, ProductExtraInfos } from '../../molecules';
import { updateCartAction } from '../../store/actions';

import { ProductController } from "./Product.controller";

export const ProductComponent = props => {
  const theme = useTheme();

  const styles = makeStyles({
    wrapper: {
      backgroundColor: theme.palette.gray.bg,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      minHeight:"1700px",
    },
    whiteBox:{
      width:"1024px",
      backgroundColor:"white",
      display:"flex",
      justifyContent:"space-between",
      alignItems:"top",
      paddingRight:10*theme.spacing.unit,
      paddingLeft:10*theme.spacing.unit,
      paddingTop:8*theme.spacing.unit,
      paddingBottom:6*theme.spacing.unit,
    },
    rightBox:{
      width:"350px",
    },
    goBackButton:{
      color: theme.palette.green.main,
      fontSize: theme.fontSizes.SM,
      position:"absolute",
      top:3*theme.spacing.unit,
      left: 10*theme.spacing.unit,
      fontWeight:800,
      padding: theme.spacing.unit,
      cursor:"pointer"
    },
    goBackIcon:{
      color: theme.palette.green.main,
      verticalAlign:"middle",
    },
    relativeBox:{
      position:"relative",
    }
  });

  const classes = styles(props);
  const { product, history } = props;
  console.log('front', props.product.imageUrl)

  return product ? (
    <div className={classes.wrapper}>

      <div className={classes.relativeBox}>
        <p>{props.product.imageUrl}</p>
        <div onClick={() => null} className={classes.goBackButton}>
          <Icon fontSize="small" className={classes.goBackIcon}>arrow_back_ios</Icon>
          Voltar
        </div>

        <div className={classes.whiteBox}>
          <div className={classes.leftBox}>
            {/* <ProductImage src={product.imageUrl} alt={product.description} /> */}
            <LazyLoadImage
              width={400}
              height={400}
              alt={'alt'}
              src={props.product.imageUrl} />
            {/* <ProductFamilies product={product}/> */}
          </div>

          <div className={classes.rightBox}>
            a
          </div>

        </div>
      </div>
    </div>
  ) : null;
};