import React from 'react'
import { withStyles, Button } from '@material-ui/core';
import { Formatter } from '../../../../helpers';

const styles = theme => ({
  wrapper: {
    zIndex: 12,
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    '& > div.summary': {
      backgroundColor: theme.palette.gray.darkBg,
      padding: theme.spacing.unit,
      '& > p': {
        display: 'inline-block',
        margin: '0 16px',
        fontSize: theme.fontSizes.XS,
        color: theme.palette.gray.main
      }
    },
    '& > div.continue': {
      backgroundColor: theme.palette.gray.main,
      padding: 1.5 * theme.spacing.unit,
      '& > button': {
        ...theme.buttons.primary,
        fontSize: theme.fontSizes.LG
      }
    }
  }
});

let BottomSection = props => {

  const {
    classes,
    cart,
    buttonLabel,
    buttonClickAction
  } = props;

  return (
    <section className={classes.wrapper}>
      <div className='summary'>
        <p>Orgânicos Genéricos: <b>{cart.productCount} ite{cart.productCount === 1 ? 'm' : 'ns'}</b></p>
        <p>Complementos: <b>{cart.complementsCount} ite{cart.complementsCount === 1 ? 'm' : 'ns'}</b></p>
        <p>Subtotal: <b>{Formatter.currency(cart.subtotal)}</b></p>
      </div>
      <div className='continue'>
        <Button
          id='continue'
          onClick={buttonClickAction}
        >
          {buttonLabel}
        </Button>
      </div>
    </section>
  )
}

BottomSection = withStyles(styles)(BottomSection);

export { BottomSection };