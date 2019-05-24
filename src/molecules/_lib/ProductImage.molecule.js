import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import 'img-2';


const styles = theme => ({
  imgBox:{
    border: `1px solid ${theme.palette.gray.border}`,
    height:"402px"
  },
  image:{
  },
});

class ProductImage extends Component{
  constructor(props){
    super(props)

  }


  render(){
    const { classes, description, src } = this.props;
    return (
      <div className={classes.imgBox}>
        <img-2
          className={classes.image}
          width={400}
          height={400}
          alt={description}
          src={src}
          src-preview={src}
          >
          </img-2>

      </div>
    )
  }
};

ProductImage = compose(
  withStyles(styles),
  )(ProductImage);

export { ProductImage };