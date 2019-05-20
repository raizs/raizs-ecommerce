import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import 'img-2';



const styles = theme => ({
  box:{
    display:"inline-block",
    width:"250px",
    height:"800px",
    // backgroundColor:"red",
    paddingLeft:"100px",
    verticalAlign:"top"
  },
});

class ProductImage extends Component{
  constructor(props){
    super(props)

  }


  render(){
    const { classes, description, src } = this.props;
    console.log(this.props)
    return (
      <img-2
        className={classes.image}
        width={248}
        height={224}
        alt={description}
        src={src}
        src-preview={src}
        >
        </img-2>
    )
  }
};

ProductImage = compose(
  withStyles(styles),
  )(ProductImage);

export { ProductImage };