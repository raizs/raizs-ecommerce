import React, { Component } from 'react'
import { withStyles, Icon } from '@material-ui/core';
import compose from 'recompose/compose';


import Slider from "react-slick"
import {SliderArrow } from "./SliderArrow.molecule"

const hardCordedFamilies=[
  {
    id:"1",
    name:"Silva",
    img:"https://muzambinho.com.br/wp-content/uploads/2018/07/Sem-T%C3%ADtulo-1-33-1280x720.jpg"
  },
  {
    id:"2",
    name:"Moralezinho Ronaldo",
    img:"https://muzambinho.com.br/wp-content/uploads/2018/07/Sem-T%C3%ADtulo-1-33-1280x720.jpg"
  },
  {
    id:"3",
    name:"Cruz",
    img:"https://muzambinho.com.br/wp-content/uploads/2018/07/Sem-T%C3%ADtulo-1-33-1280x720.jpg"
  },
  {
    id:"4",
    name:"Lopes",
    img:"https://muzambinho.com.br/wp-content/uploads/2018/07/Sem-T%C3%ADtulo-1-33-1280x720.jpg"
  },
  {
    id:"5",
    name:"Pereira",
    img:"https://muzambinho.com.br/wp-content/uploads/2018/07/Sem-T%C3%ADtulo-1-33-1280x720.jpg"
  },
  {
    id:"6",
    name:"Mazoni",
    img:"https://muzambinho.com.br/wp-content/uploads/2018/07/Sem-T%C3%ADtulo-1-33-1280x720.jpg"
  },
  {
    id:"7",
    name:"Oliveira",
    img:"https://muzambinho.com.br/wp-content/uploads/2018/07/Sem-T%C3%ADtulo-1-33-1280x720.jpg"
  },
]



const styles = theme => ({
  slider:{
    paddingRight:"50px",
    width: "400px",
    height:"50px",
  },
  img:{
    display:"inline-block",
    verticalAlign:"middle"
    
  },
  familyBox:{
    overflow:"hidden",
    height:"50px",
    paddingTop:theme.spacing.unit
  },
  familyName:{
    fontSize:theme.fontSizes.XS,
    display:"inline-block",
    fontFamily:"raizs",
    verticalAlign:"middle",
    overflow:"hidden",
    width:"68px",
    paddingLeft:"4px",
  },
  title:{
    marginTop:4*theme.spacing.unit,
    fontSize: theme.fontSizes.SM,
    fontWeight: 800,
    marginBottom: theme.spacing.unit
  }
});


class ProductFamilies extends Component{
  constructor(props){
    super(props)
  }

  _renderFamilies(){

    const { classes } = this.props;
    const families = [...hardCordedFamilies];

    return families.map((family, key)=>{
      return <div className={classes.familyBox} key={key}>
        <img-2 
          style={{verticalAlign:"middle"}}
          className={classes.img}
          width={30}
          height={30}
          alt={family.name}
          src={family.img}
          src-preview={family.img}/>
          <div className={classes.familyName}>
            {family.name}

          </div>
      </div>
    })
    
  }

  render(){
    const { classes, product  } = this.props;
    const settings = {
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    nextArrow: <SliderArrow to='next' styles={{width:"40px", height:"40px"}}/>,
      className: classes.slider
    };
    return (
      <span>
        <div className={classes.title}>Famílias Produtoras</div>        
        <Slider {...settings}>
          {this._renderFamilies()}
        </Slider>
      </span>
          )
  }
};


ProductFamilies = compose(
  withStyles(styles),
  )(ProductFamilies);

export { ProductFamilies };