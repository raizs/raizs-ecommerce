import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';

const styles = theme => ({
  wrapper: {
    '& *': {
      transition: '.3s',
      borderRadius: 2 * theme.spacing.unit,
      userSelect: 'none'
    },
    transition: '.3s',
    zIndex: 1,
    height: 5 * theme.spacing.unit,
    fontSize: theme.fontSizes.XL,
  },
  closed: {
    width: 5 * theme.spacing.unit,
    backgroundColor: theme.palette.green.main,
    lineHeight: `${5 * theme.spacing.unit}px`,
    cursor: 'pointer',
    textAlign: 'center',
    color: 'white'
  },
  open: {
    width: 20 * theme.spacing.unit,
    height: 5 * theme.spacing.unit,
    lineHeight: `${5 * theme.spacing.unit}px`,
    border: `1px solid ${theme.palette.green.main}`,
    position: 'relative',
    cursor: 'pointer',
    '& > *': {
      display: 'inline-block',
      position: 'absolute'
    },
    '& > div.subtract': {
      left: 0,
      height: '100%',
      borderRadius: 1.5 * theme.spacing.unit,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      cursor: 'pointer',
      textAlign: 'center',
      width: 5 * theme.spacing.unit,
      lineHeight: `${4 * theme.spacing.unit}px`,
      color: theme.palette.green.main
    },
    '& > div.add': {
      right: 0,
      height: '100%',
      borderRadius: 1.5 * theme.spacing.unit,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      textAlign: 'center',
      width: 5 * theme.spacing.unit,
      lineHeight: `${4.5 * theme.spacing.unit}px`,
      color: theme.palette.green.main
    },
    '& > div.quantity': {
      textAlign: 'center',
      width: '100%',
      lineHeight: `${4.5 * theme.spacing.unit}px`,
      height: '100%',
      backgroundColor: 'white',
      fontSize: theme.fontSizes.LG,
      color: theme.palette.green.main,
      fontWeight: 600
    },
    '&:hover div.add, &:hover div.subtract': {
      backgroundColor: theme.palette.green.main,
      color: 'white'
    }
  }
});

class QuantitySelector extends Component {
  state = {
    quantity: this.props.quantity,
    item: this.props.item
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.quantity !== this.props.quantity) {
      this.setState({ quantity: nextProps.quantity });
    }  
  }

  _handleClick(direction) {
    const { quantity } = this.state;
    const { changeAction, item } = this.props;

    changeAction({ item, quantity: quantity + direction });
    this.setState({ quantity: quantity + direction });
  }

  _renderContent() {
    const { quantity } = this.state;
    const { classes } = this.props;

    return quantity ? (
      <div className={classes.open}>
        <div className='quantity'>{quantity}</div>
        <div className='subtract' onClick={() => this._handleClick(-1)}>-</div>
        <div className='add' onClick={() => this._handleClick(1)}>+</div>
      </div>
    ) : (
      <div className={classes.closed} onClick={() => this._handleClick(1)}>+</div>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classnames('quantity-selector', classes.wrapper)}
        onClick={e => e.stopPropagation()}
      >
        {this._renderContent()}
      </div>
    )
  }
}

QuantitySelector = withStyles(styles)(QuantitySelector);

export { QuantitySelector };