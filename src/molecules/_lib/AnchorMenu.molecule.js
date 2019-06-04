import React, { Component } from 'react'
import { withStyles, Icon } from '@material-ui/core';
import compose from 'recompose/compose';
import classnames from "classnames";
import { withRouter } from 'react-router';
import smoothScroll from "smooth-scroll"



const styles = theme => ({
  wrapper:{
    position:'fixed',
    left:0, 
    top:"200px",
    padding:theme.spacing.unit,

  },
  greenStripe:{
    width:"100%",
    backgroundColor:theme.palette.green.main,
    height:"6px", 
    marginBottom: theme.spacing.unit
  },
  item:{
    padding:theme.spacing.unit,
    paddingLeft:0,
    color: theme.palette.gray.main,
    cursor:"pointer",
    fontSize:theme.fontSizes.XS
  },
  selected:{
    color:theme.palette.green.main
  }

});


class AnchorMenu extends Component{

  constructor(props){
    super(props)
  }

  state={
    hash:""
  }

  _renderMenuItems(){
    const { items, classes} = this.props;
    return items.map((item,key)=>{
      let itemClass = [classes.item];
      let id = "#"+item.id;
      if (this.state.hash == id){
        itemClass.push(classes.selected)
      }
      return <a key={key} href={id} >
        <div className={classnames(itemClass)} onClick={()=>this.setState({hash:id})}>
          {item.label}
        </div>
      </a>
        
    })
  }
        // onClick={}

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.greenStripe}></div>
        {this._renderMenuItems()}
      </div>
    )
  }
};


AnchorMenu = compose(
  withStyles(styles),
  )(AnchorMenu);

export { AnchorMenu };