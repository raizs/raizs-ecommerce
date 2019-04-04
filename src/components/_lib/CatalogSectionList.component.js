import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import chunk from 'lodash.chunk';

import styles, { MIN_ROW_HEIGHT } from './styles/catalogSection.styles'

const PRODUCT_WIDTH = 256 + 24;

class CatalogSectionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      perRow: 3,
      availableWidth: props.availableWidth,
      anchor: null,
      rowsToRender: 3
    };

    this._renderProducts = this._renderProducts.bind(this);
    this._calculateNumberOfRows = this._calculateNumberOfRows.bind(this);
  }

  componentDidMount = () => {
    const context = this;
    const id = `#${this.props.id}`;

    window.addEventListener('scroll', () => {
      const offsetTop = anchor.offsetTop;
      const htmlScroll = document.querySelector('html').scrollTop;
      const bodyScroll = document.querySelector('body').scrollTop;
      const scroll = htmlScroll || bodyScroll;
      
      const rowsToRender = context._calculateNumberOfRows(offsetTop, scroll);

      if(rowsToRender !== this.state.rowsToRender)
        context.setState({ rowsToRender });
    });
    
    const perRow = Math.floor(this.props.availableWidth / PRODUCT_WIDTH);
    const anchor = document.querySelector(id);
    const htmlScroll = document.querySelector('html').scrollTop;
    const bodyScroll = document.querySelector('body').scrollTop;
    const scroll = htmlScroll || bodyScroll;

    const rowsToRender = this._calculateNumberOfRows(anchor.offsetTop, scroll);
    const fakeHeight = Math.ceil(this.props.groupedProducts.length / perRow) * MIN_ROW_HEIGHT + 80;

    console.log(this.props.groupedProducts.length, perRow);
    anchor.style.height = `${fakeHeight}px`;
    
    this.setState({ perRow, anchor, rowsToRender });
  }
  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.availableWidth !== this.props.availableWidth) {
      const perRow = Math.floor(nextProps.availableWidth / PRODUCT_WIDTH);
      const fakeHeight = Math.ceil(this.props.groupedProducts.length / perRow) * MIN_ROW_HEIGHT + 80;

      const anchor = document.querySelector(`#${nextProps.id}`);
      anchor.style.height = `${fakeHeight}px`;

      this.setState({ perRow, anchor });
    }
  }

  _calculateNumberOfRows(offsetTop, scroll) {
    const { rowsToRender } = this.state;
    const height = window.innerHeight;

    const delta = scroll - offsetTop + height;

    if(delta >= (rowsToRender - 1) * MIN_ROW_HEIGHT) {
      return Math.min(rowsToRender + 1, this.props.groupedProducts.length);
    }

    return rowsToRender;
  }
  
  _renderProducts() {
    const { perRow, rowsToRender } = this.state;
    const { groupedProducts, classes } = this.props;
    let chunked = chunk(groupedProducts, perRow);

    chunked = chunked.slice(0, rowsToRender);

    return chunked.map(chunk => {
      return (
        <div className={classes.row}>
          {chunk.map(product => {
            return (
              <div className={classes.product}>
                <h5>{product.name}</h5>
                <img style={{ width: '100%'}} src={`https://raizs.odoo.com/product/image?template_id=${product.templateId}`} />
              </div>
            );
          })}
        </div>
      )
    });
  }

  render() {
    return (
      <div id={this.props.id}>
        <h2 className={this.props.classes.title}>{this.props.title}</h2>
        {this._renderProducts()}
      </div>
    )
  }
}

CatalogSectionList = withStyles(styles)(CatalogSectionList);

export { CatalogSectionList };