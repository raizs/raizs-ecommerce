import React, { Component } from 'react'
import { withStyles, Icon } from '@material-ui/core';
import compose from 'recompose/compose';
import classnames from "classnames"

import { productExtraInfos } from "../../assets"
import { NutritionalInfo } from "../../atoms"


const styles = theme => ({
  extraInfo:{
    width:"100%",
    height:"165px"
  },
  menuTopic:{
    display:"inline-block",
    width:"33%",
    fontWeight:800,
    fontSize:theme.fontSizes.XXS,
    cursor:"pointer",
    transition: "0.3s"
    
  },
  selected:{
    color: theme.palette.green.main,
    transition: "0.3s",
    
  },
  infoBox:{
    marginTop: 2*theme.spacing.unit,
    fontSize:theme.fontSizes.XS,
    lineHeight: theme.fontSizes.SM
  }
});


class ProductExtraInfos extends Component{
  constructor(props){
    super(props)
  }
  state = {
    selected:"moreInfo"
  }

  _renderMenuTopics(){
    const { classes, product  } = this.props;
    return productExtraInfos.map((info, key)=>{
      let topicClass = [classes.menuTopic]
      if (info.id == this.state.selected) topicClass.push(classes.selected) 
      return <div className={classnames(topicClass)} onClick={()=>this.setState({selected: info.id})}>
        {info.label}
      </div>
    })
  }

  _renderInfoBox(){
    const { classes, product  } = this.props;
    const { selected } = this.state
    if (selected == "moreInfo" || selected == "storageInfo"){
      return <div className={classes.infoBox}>
        {product[selected]}
      </div>
    }

    else return <NutritionalInfo info={product.nutritionalInfo}/>

  }

  render(){
    console.log(this.state)
    const { classes, product  } = this.props;
    return (
      <div className={classes.extraInfo}>
        {this._renderMenuTopics()}
        {this._renderInfoBox()}
      </div>
    )
  }
};


ProductExtraInfos = compose(
  withStyles(styles),
  )(ProductExtraInfos);

export { ProductExtraInfos };