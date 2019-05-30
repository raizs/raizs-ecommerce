import React from 'react'
import { withRouter } from 'react-router';
import { withStyles, Icon } from '@material-ui/core';
import compose from 'recompose/compose';
import { connect } from "react-redux"

import { BaseContainer } from "../../helpers"
import { toggleSearchBarAction } from "../../store/actions"
import { SearchBarController } from "../controllers/SearchBar.controller.js"
import { TextInput, Loading } from "../../molecules"

import classnames from "classnames"
import "img-2"

const styles = theme => ({
  wrapper:{
    transition:"0.2s",
    backgroundColor:theme.palette.gray.darkBg,
    overflow:"hidden",
    position:"absolute",
    zIndex:5, 
    padding:1.5*theme.spacing.unit,
    marginTop:"-9px",
    border: `1px solid gray`,
    borderTop: 0,
    borderRadius: `0 0 ${theme.spacing.unit}px ${theme.spacing.unit}px`
  },
  closedWrapper:{
    border: 0,
    padding:0
  },
  searchBox:{
    width:"100%",
    display:"inline-block",
    verticalAlign:"top",
  },
  searchIcon:{
    verticalAlign: 'middle',
    display: 'inline-block',
    color: "white",
    padding:`0 ${theme.spacing.unit}px`,
    width:"52px",
    height:"40px",
    backgroundColor:theme.palette.green.main,
    textAlig:"center",
    borderRadius: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px 0`,
    cursor:"pointer"

  },
  inputValue:{
    ...theme.inputs.text,
    width:"calc(100% - 52px)",
    display:"inline-block",
    "&>input":{
      width:"100%",
      borderRadius:`${theme.spacing.unit}px 0 0 ${theme.spacing.unit}px`,
      borderColor:"gray",
      fontSize: theme.fontSizes.XS,
      height: "40px"

    },
  },
  notFound:{
    fontSize: theme.fontSizes.LG,
    fontWeight: 800,
    padding: 4*theme.spacing.unit
  },
  productsBox:{
    marginTop: 2*theme.spacing.unit,
    maxHeight: "300px",
    overflow:"scroll"

  },
  productBox:{
    backgroundColor: "white",
    margin: `${theme.spacing.unit}px 0`,
    padding: theme.spacing.unit,
    borderRadius: theme.spacing.unit,
    cursor:"pointer"
  },
  productImgBox:{
    verticalAlign:"middle",
    display:"inline-block",
    width:"20px",
    height:"20px",
  },
  productName:{
    verticalAlign:"middle",
    paddingLeft: 3*theme.spacing.unit,
    fontSize:theme.fontSizes.XS,
    display:"inline-block",
    overflow:"hidden",
    color: theme.palette.gray.main,
    height:theme.fontSizes.XS,
    width:"calc(100% - 170px)"
  },
  productBrand:{
    verticalAlign:"middle",
    display:"inline-block",
    fontSize:theme.fontSizes.XS,
    overflow:"hidden",
    color: theme.palette.gray.main,
    height:theme.fontSizes.XS,
    width:"150px"
  },


})

class SearchBar extends BaseContainer {
  constructor(props) {
    super(props, SearchBarController);
  }

  state = {
    search: "",
    errors: {
      search: null
    },
    results: this.props.products.all
  }

  _renderResults() {
    const { classes } = this.props;
    const { search, results, loading } = this.state;

    if (!search) return null;
    if (loading) return <Loading absolute noBg/>

    if (results.length) {
      return <div id="products-container" className={classes.productsBox}>
        {this._renderProductCards()}
      </div>
    }

    return <div className={classes.notFound}>
        Ops! Não encontramos resultados para "{search}".
    </div>
  }

  _renderProductCards() {
    const { classes } = this.props;
    const { results } = this.state;
    return results.map(product => {
      return <div className={classes.productBox} onClick={()=>this.controller.goToProduct(product.id)}>
        <div className={classes.productImgBox}>
           <img-2
            width={20}
            height={20}
            alt={product.name}
            src={product.imageUrl}
            src-preview={product.imageUrl}
          />
        </div>
        <div className={classes.productName}>
          {product.name}
        </div>
        <div className={classes.productBrand}>
          {product.brandName}
        </div>
      </div>
    })

  }


  render() {
    const { classes, searching, width, } = this.props;
    const { handleChange, handleSearch } = this.controller;
    
    let wrapperClassName = [classes.wrapper];
    if(!searching) {
      wrapperClassName.push(classes.closedWrapper);
    }

    return (
      <div style={{ width: searching ? width + 1 : 0 }} className={classnames(wrapperClassName)}>
        <div className={classes.searchBox}>
          <TextInput 
            className={classes.inputValue}
            id="search"
            error={this.state.errors.search}
            value={this.state.search}
            handleChange={handleChange}
            placeholder="Procure por centenas de produtos"
            />
          <Icon onClick={handleSearch} fontSize="large" className={classes.searchIcon}>search</Icon>
        </div>
        {this._renderResults()}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  products: state.products.model,
  searching: state.header.isSearchBarOpen,
})

SearchBar = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { toggleSearchBarAction })
)(SearchBar);

export { SearchBar };