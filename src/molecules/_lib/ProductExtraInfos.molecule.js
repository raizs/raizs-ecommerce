import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import classnames from "classnames"

import { productExtraInfos } from "../../assets"
import { NutritionalInfo } from "../../atoms"

const styles = theme => ({
  extraInfo: {
    width: "100%",
    height: "165px"
  },
  menuTopic: {
    display: "inline-block",
    width: "33%",
    fontWeight:  700,
    fontSize: theme.fontSizes.XSM,
    cursor: "pointer",
    transition: "0.3s"
  },
  selected: {
    color: theme.palette.green.main,
    transition: "0.3s",
  },
  infoBox: {
    marginTop: 2*theme.spacing.unit,
    fontSize: theme.fontSizes.XS,
    lineHeight: theme.fontSizes.SM
  }
});

class ProductExtraInfos extends Component{

  state = {
    selected:"moreInfo"
  }

  _renderMenuTopics() {
    const { classes } = this.props;
    return productExtraInfos.map(info => {
      let topicClass = [classes.menuTopic]
      if (info.id === this.state.selected) topicClass.push(classes.selected) 
      return <div key={info.id} className={classnames(topicClass)} onClick={()=>this.setState({selected: info.id})}>
        {info.label}
      </div>
    })
  }

  _renderInfoBox() {
    const { classes, product } = this.props;
    const { selected } = this.state
    if (selected === "moreInfo" || selected === "storageInfo") {
      return <div className={classes.infoBox}>
        {product[selected]}
      </div>
    }

    else return <NutritionalInfo info={product.nutritionalInfo}/>;
  }

  render() {
    const { classes  } = this.props;
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