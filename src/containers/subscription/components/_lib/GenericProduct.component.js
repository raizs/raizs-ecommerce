import React, { Component } from 'react'
import { withStyles, Tooltip, Icon } from '@material-ui/core';
import { QuantitySelector } from '../../../../molecules';
import { genericExamples } from '../../../../assets';

const styles = theme => ({
  item: {
    width: '162px',
    height: '240px',
    display: 'inline-block',
    margin: '0 16px',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    borderBottomRightRadius: 2 * theme.spacing.unit,
    borderBottomLeftRadius: 2 * theme.spacing.unit,
    border: `1px solid ${theme.palette.gray.border}`,
    position: 'relative',
    '& .qs-wrapper': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      borderRadius: 2 * theme.spacing.unit,
      '& .quantity-selector .quantity': {
        left: 0
      }
    },
    '& > img': {
      width: '160px',
      height: '160px',
      borderRadius: theme.spacing.unit
    },
    '& > p.label': {
      fontSize: theme.fontSizes.SM,
      lineHeight: '20px',
      fontWeight: 700,
      marginTop: theme.spacing.unit,
      '& span': {
        verticalAlign: 'middle',
        fontSize: theme.fontSizes.MD,
        marginLeft: theme.spacing.unit,
        color: theme.palette.green.main,
        cursor: 'pointer'
      }
    },
    '& > p.price': {
      position: 'absolute',
      bottom: -3 * theme.spacing.unit,
      fontSize: theme.fontSizes.SM,
      color: theme.palette.gray.main,
      fontWeight: 600,
      textAlign: 'center',
      width: '100%'
    }
  },
  popper: {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.gray.main} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.gray.main} transparent transparent transparent`,
      },
    }
  },
  tooltip: {
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    border: `1px solid ${theme.palette.black.main}`,
    padding: theme.spacing.unit,
    fontSize: theme.fontSizes.SM,
    '& > div.wrapper': {
      '& > p': {
        fontWeight: 700
      },
      '& > ul': {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        '& > li': {
          fontWeight: 500,
          color: theme.palette.gray.main,
          lineHeight: '24px'
        }
      }
    }
  },
  arrowPopper: {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.gray.main} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.gray.main} transparent transparent transparent`,
      },
    }
  },
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  }
});

class GenericProduct extends Component {
  state = {
    arrowRef: null
  }


  _renderTooltip = id => {
    const { classes } = this.props;
    return (
      <div className='wrapper'>
        <p>O que pode vir:</p>
        <ul>
          {genericExamples[id].map(e => <li key={e}>{e}</li>)}
        </ul>
        <p>... e muito mais!</p>
        <span className={classes.arrow} ref={this._handleArrowRef} />
      </div>
    );
  }

  _handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  render() {
    const { classes, item, changeAction, quantity } = this.props;
    return (
      <div key={item.id} className={classes.item}>
        <img src={item.imageUrl} />
        <p className='label'>
          {item.name}
          <Tooltip
            classes={{
              popper: classes.popper,
              tooltip: classes.tooltip
            }}
            PopperProps={{
              popperOptions: {
                modifiers: {
                  arrow: {
                    enabled: Boolean(this.state.arrowRef),
                    element: this.state.arrowRef,
                  },
                },
              }
            }}
            title={this._renderTooltip(item.id)}
          > 
            <Icon>help_outline</Icon>
          </Tooltip>
        </p>
        <div className='qs-wrapper'>
          <QuantitySelector
            item={item}
            changeAction={changeAction}
            quantity={quantity}
            shouldClose={false}
          />
        </div>
        <p className='price'>{item.fullPrice}</p>
      </div>
    );
  }
}

GenericProduct = withStyles(styles)(GenericProduct);

export { GenericProduct };