import React, { Component } from "react";
import { withStyles, Icon } from "@material-ui/core";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import classnames from "classnames";

const styles = theme => ({
  wrapper:{
    position:"fixed",
    bottom: 0, 
    zIndex:100,
    width:"100%"
  },
  expandableButton:{
    width:"100%",
    height: "70px",
    backgroundColor:theme.palette.green.main,
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row"

  },
  expandableButtonBox:{
    fontFamily:"raizs",
    fontSize:theme.fontSizes.LG,
    color: "white", 
    cursor:'pointer'
  },
  expandableButtonIcon:{
    color: theme.palette.green.main,
    borderRadius:"50%",
    backgroundColor:"white",
    marginLeft: theme.spacing.unit,
    verticalAlign:"middle"
  },
  openContent:{
    width:"100%",
    height:"300px",
    transition:"0.2s",
    backgroundColor:"white",
    padding:theme.spacing

  },
  closedContent:{
    height:"0"
  },
  limitBox:{
    width:"1024px",
    marginLeft:"calc(50% - 512px)",
    backgroundColor:"red"
  },
  rightContent:{
    display:"inline-block",
    float:"right"
  },
  leftContent:{
    display:"inline-block",
  }
});
class FloatingCartResume extends Component {

  constructor(props){
    super(props);
  }

  state = {
    open: true,
  }

  _renderExpandableButton(){
    const { classes } = this.props;
    const { open } = this.state;
    return<div className={classes.expandableButton}>
        <div onClick={()=>this.setState({open:!open})}  className={classes.expandableButtonBox}>TUDO CERTO
        <Icon className={classes.expandableButtonIcon}>{open ? "keyboard_arrow_down" : "keyboard_arrow_up"}</Icon>
        </div>         
      </div>

  }


  _renderLeftContent(){
    const { classes } = this.props;

    return <div className={classes.leftContent}>
      leftContent
    </div>
  }

  _renderRightContent(){
    const { classes } = this.props;

    return <div className={classes.rightContent}>
      RIGHT
    </div>
  }


  _renderOpenContent(){
    return <div className={this.props.classes.limitBox}>
      {this._renderLeftContent()}
      {this._renderRightContent()}
    </div>
  }


  render() {
    console.log(this.props)
    const { classes } = this.props;
    const { open } = this.state;
    let openContentClassName = [classes.openContent];
    if (!open) openContentClassName.push(classes.closedContent)

    return (
      <div className={classes.wrapper}>
        {this._renderExpandableButton()}
        <div className={classnames(openContentClassName)}>
          {open && this._renderOpenContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.current,
  subscriptionCart: state.subscriptionCart
});

FloatingCartResume = compose(
  withStyles(styles),
  connect(mapStateToProps, {} )
)(FloatingCartResume);

export { FloatingCartResume };