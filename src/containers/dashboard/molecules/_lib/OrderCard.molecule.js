import React from 'react';
import classnames from 'classnames';
import { withStyles, Button } from '@material-ui/core';
import { CartHelper } from '../../../../helpers';

const styles = theme => ({
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    padding: theme.spacing.unit,
    '& + div.order-card': {
      marginTop: 2 * theme.spacing.unit
    },
    '& > div': {
      display: 'inline-block',
      width: '20%',
      padding: theme.spacing.unit,
      verticalAlign: 'top',
      '& > p': {
        fontSize: theme.fontSizes.SM,
        '& + p': {
          marginTop: theme.spacing.unit
        }
      },
      '& > p.bold': {
        fontWeight: 700
      },
      '& > p.semibold': {
        fontWeight: 600
      },
      '& > p.green': {
        color: theme.palette.green.main,
      },
      '& > p.gray': {
        color: theme.palette.gray.main,
      },
      '& > p.xs': {
        fontSize: theme.fontSizes.XS
      },
      '& > p.xxs': {
        fontSize: theme.fontSizes.XXS
      },
      '& > p.details': {
        textDecoration: 'underline',
        cursor: 'pointer',
        fontSize: theme.fontSizes.SM,
        display: 'inline-block',
        float: 'right',
        fontWeight: 700,
        '&:hover': {
          color: theme.palette.green.main
        }
      },
      '& > button': {
        ...theme.buttons.secondary,
        fontSize: theme.fontSizes.XSM,
        lineHeight: '16px'
      }
    }
  }
});

let OrderCard = props => {
  const {
    name,
    classes,
    shippingTimeRange,
    stateString,
    itemCountString,
    shippingEstimatedDate,
    shippingEstimatedWeekDay
  } = props;

  return (
    <div className={classnames(classes.wrapper, 'order-card')}>
      <div>
        <p className='bold green xs'>PEDIDO</p>
        <p className='bold'>{name}</p>
        <p className='semibold gray xs'>{itemCountString}</p>
      </div>
      <div>
        <p className='bold green xs'>ENTREGA</p>
        <p className='bold'>{shippingEstimatedDate}</p>
        <p className='semibold gray xs'>{shippingEstimatedWeekDay}</p>
        <p className='bold xxs' style={{ marginTop: '16px' }}>PREVISÃO DE ENTREGA</p>
        <p className='semibold gray xs'>{shippingTimeRange}</p>
      </div>
      <div>
        <p className='bold green xs'>STATUS</p>
        <p className='bold'>{stateString}</p>
      </div>
      <div>
        <Button>Refazer Pedido</Button>
      </div>
      <div>
        <p className='details xsm'>visualizar</p>
      </div>
    </div>
  );
}

OrderCard = withStyles(styles)(OrderCard);

export { OrderCard } ;