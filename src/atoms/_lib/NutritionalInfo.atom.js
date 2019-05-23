import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import classnames from "classnames"
import compose from 'recompose/compose';
import { nutritionVocabulary } from "../../assets"


const styles = theme => ({
  table:{
    width:"100%",
    textAlign:"left",
    border:"1px solid black",
    borderCollapse:"collapse",
    marginTop: 2*theme.spacing.unit
  },
  head:{
    textAlign:"center",
    fontSize:theme.fontSizes.XXS,
    border: "1px solid black",
    padding:theme.spacing.unit
  },
  bodyItem:{
    padding:0.5*theme.spacing.unit,
    border: "1px solid black",
  }
});



class NutritionalInfo extends Component{
  constructor(props){
    super(props)
  }


  _renderBody(){
    const { info, classes } = this.props;
    return Object.keys(info).map((key, i)=>{
      return <tr>
        <td className={classes.bodyItem}key={i}>{nutritionVocabulary[key]}</td>
        <td className={classes.bodyItem} key={i}>{info[key]}</td>
      </tr>
    })
  }
  


  render(){
    console.log(this.state)
    const { classes  } = this.props;
    return (
      <table className={classes.table}>
        <tr>
          <th className={classes.head} colspan="2">Informações nutricionais por porção</th>
        </tr>
        {this._renderBody()}

      </table>
    )
  }
};


NutritionalInfo = compose(
  withStyles(styles),
  )(NutritionalInfo);

export { NutritionalInfo };