import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import ReactSvg from 'react-svg'


import classnames from "classnames"

const styles = (theme) => {
  return {
    searchBox:{
      transition:"0.2s",
      backgroundColor:"red",
      overflow:"hidden",
      height:"140px",
      position:"absolute",
      zIndex:5
    },
    searchIcon:{
      height: 30,
      transition: "0.2s",
      width: 30,
      verticalAlign: 'middle',
      display: 'inline-block',
      '&:hover *': {
        stroke: theme.palette.green.main
      },
    }
  }
}

class SearchBar extends Component {


  render() {
    const { classes, history, searching, width } = this.props;
    return (
      <div style={{width: searching ? width: 0}} className={classes.searchBox}>
        <ReactSvg
          src='/icons/pesquisa.svg'
          className={classes.searchIcon}
          onClick={()=>this.setState({searching:true})}
        />
      </div>
    )
  }
}

SearchBar = compose(
  withStyles(styles),
  withRouter
)(SearchBar);

export { SearchBar };