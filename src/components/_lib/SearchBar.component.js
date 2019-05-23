import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import ReactSvg from 'react-svg'

import { BaseContainer } from "../../helpers"
import { SearchBarController } from "../controllers/SearchBar.controller.js"
import { TextInput } from "../../molecules"



const styles = theme => ({
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
  },
  inputBox:{
    width:"50%",
    display:"inline-block",
    verticalAlign:"top",
    height:"76px"
  },
  inputLabel:{
    fontSize: theme.fontSizes.XS,
    fontWeight:800,
    color: theme.palette.black.main,
    marginBottom: theme.spacing.unit
  },
  inputValue:{
    ...theme.inputs.text,
    "&>input":{
      fontSize: theme.fontSizes.XS,
      height: "40px"

    }
  },


})

class SearchBar extends BaseContainer {

  constructor(props){
    super(props, SearchBarController)

  }

  state={
    errors:{

    }
  }


  render() {
    const { classes, history, searching, width } = this.props;
    return (
      <div style={{width: searching ? width: 0}} className={classes.searchBox}>
      </div>
    )
  }
}

SearchBar = compose(
  withStyles(styles),
  withRouter
)(SearchBar);

export { SearchBar };
        // <div className={classes.inputBox}>
        // <ReactSvg
        //   src='/icons/pesquisa.svg'
        //   className={classes.searchIcon}
        //   onClick={()=>this.setState({searching:true})}
        // />
        //   <TextInput 
        //     className={classes.inputValue}
        //     id={field.id}
        //     error={this.state.errors[field.id]}
        //     value={this.state[field.id]}
        //     handleChange={e => handleChange(e, field.format)}
        //     label={field.label}
        //     labelClassName={classes.inputLabel}
        //     />
        // </div>