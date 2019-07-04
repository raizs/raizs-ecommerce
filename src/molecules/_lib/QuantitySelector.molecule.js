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
    zIndex: 10,
    height: 5 * theme.spacing.unit,
    fontSize: theme.fontSizes.XL,
    '&.-mini': {
      height: 'auto'
    }
  },

  closed: {
    fontFamily: 'raizs',
    width: 5 * theme.spacing.unit,
    backgroundColor: theme.palette.green.main,
    lineHeight: `36px`,
    cursor: 'pointer',
    textAlign: 'center',
    color: 'white',
    height: 5 * theme.spacing.unit
  },

  open: {
    width: 20 * theme.spacing.unit,
    height: 5 * theme.spacing.unit,
    lineHeight: `${5 * theme.spacing.unit}px`,
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.green.main}`,
    position: 'relative',
    cursor: 'pointer',
    '& > *': {
      display: 'inline-block',
      position: 'absolute'
    },
    '& > div.subtract': {
      fontFamily: 'raizs',
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
      fontFamily: 'raizs',
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
      fontSize: theme.fontSizes.LG,
      color: theme.palette.green.main,
      fontWeight: 600
    },
    '&:hover div.add, &:hover div.subtract': {
      backgroundColor: theme.palette.green.main,
      color: 'white'
    },

    '&.-mini': {
      width: '88px',
      height: '24px',
      lineHeight: '24px',
      backgroundColor: 'white',
      border: `1px solid ${theme.palette.green.main}`,
      position: 'relative',
      cursor: 'pointer',
      '& > *': {
        display: 'inline-block',
        position: 'absolute'
      },
      '& > div.subtract': {
        fontFamily: 'raizs',
        left: 0,
        height: '100%',
        borderRadius: theme.spacing.unit,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        cursor: 'pointer',
        textAlign: 'center',
        width: '22px',
        lineHeight: '20px',
        fontSize: theme.fontSizes.MMD,
        color: theme.palette.green.main
      },
      '& > div.add': {
        fontFamily: 'raizs',
        right: 0,
        height: '100%',
        borderRadius: theme.spacing.unit,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        lineHeight: '20px',
        fontSize: theme.fontSizes.MMD,
        textAlign: 'center',
        width: '22px',
        color: theme.palette.green.main
      },
      '& > div.quantity': {
        textAlign: 'center',
        width: '100%',
        lineHeight: '20px',
        height: '100%',
        fontSize: theme.fontSizes.MD,
        color: theme.palette.green.main,
        fontWeight: 600
      },
      '&:hover div.add, &:hover div.subtract': {
        backgroundColor: theme.palette.green.main,
        color: 'white'
      }
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
    const stateQuantity = this.state.quantity;
    const { changeAction, item, item: { periodicity }, maxQuantity } = this.props;
    const quantity = Math.max(0, Math.min(stateQuantity + direction, maxQuantity));

    changeAction({ item, quantity, periodicity });
    this.setState({ quantity });
  }

  _renderContent() {
    const { quantity } = this.state;
    const { classes, item, shouldClose = true, mini, disabled = false } = this.props;
    let classNames = [classes.open];
    if(mini) classNames.push('-mini');

    const opened = (
      <div className={classnames(classNames)}>
        <div className='quantity'>{quantity}</div>
        <div id={item.id} className='subtract' onClick={() => disabled ? null : this._handleClick(-1)}>-</div>
        <div id={item.id} className='add' onClick={() => disabled ? null : this._handleClick(1)}>+</div>
      </div>
    )

    if(!shouldClose) return opened;
    classNames = [classes.closed];
    if(mini) classNames.push('-mini');

    return quantity ? opened : (
      <div className={classnames(classNames)} onClick={() => this._handleClick(1)}>+</div>
    )
  }

  render() {
    const { classes, mini } = this.props;
    const classNames = ['quantity-selector', classes.wrapper];
    if(mini) classNames.push('-mini');

    return (
      <div
        className={classnames(classNames)}
        onClick={e => e.stopPropagation()}
      >
        {this._renderContent()}
      </div>
    )
  }
}

QuantitySelector = withStyles(styles)(QuantitySelector);

export { QuantitySelector };