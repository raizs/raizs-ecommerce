import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  wrapper:{
    position:"fixed",
    bottom: 0, 
    zIndex:100,
    height: "400px",
    padding: 3*theme.spacing.unit,
    backgroundColor:theme.palette.green.main,
    width:"100%"
  }
});
 
class FloatingCartResume extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}></div>
    );
  }
}

FloatingCartResume = withStyles(styles)(FloatingCartResume);

export { FloatingCartResume };