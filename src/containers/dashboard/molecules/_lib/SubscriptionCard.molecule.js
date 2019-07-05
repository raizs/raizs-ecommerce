import React from 'react';
import classnames from 'classnames';
import { withStyles, Button } from '@material-ui/core';
import { CartHelper, Formatter } from '../../../../helpers';

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

const _renderNextDelivery = subscription => {
  const {
    recurringNextDate,
    recurringNextWeekDay,
    shouldShowNextDelivery,
    shippingTimeRange
  } = subscription;

  return shouldShowNextDelivery ? [
    <p key={0} className='bold green xs'>PRÓXIMA ENTREGA</p>,
    <p key={1} className='bold'>{recurringNextDate}</p>,
    <p key={2} className='semibold gray xs'>{recurringNextWeekDay}</p>,
    <p key={3} className='bold xxs' style={{ marginTop: '16px' }}>HORÁRIO DE ENTREGA</p>,
    <p key={4} className='semibold gray xs'>{shippingTimeRange}</p>
  ] : '';
}

let SubscriptionCard = props => {
  const {
    subscription,
    handleViewSaleSubscription,
    classes
  } = props;
  console.log('subscription', subscription)
  
  const {
    name,
    totalPrice,
    shippingTimeRange,
    stateString,
    itemCountString,
    recurringNextDate,
    recurringNextWeekDay
  } = subscription;

  return (
    <div className={classnames(classes.wrapper, 'order-card')}>
      <div>
        <p className='bold green xs'>ASSINATURA</p>
        <p className='bold'>{name}</p>
        <p className='semibold gray xs'>{itemCountString}</p>
      </div>
      <div>
        <p className='bold green xs'>STATUS</p>
        <p className='bold'>{stateString}</p>        
      </div>
      <div>
        <p className='bold green xs'>VALOR</p>
        <p className='bold'>{Formatter.currency(totalPrice)}</p>
      </div>
      <div>
        {_renderNextDelivery(subscription)}
      </div>
      <div>
        <p className='details xsm' onClick={() => handleViewSaleSubscription(subscription)}>editar</p>
      </div>
    </div>
  );
}

SubscriptionCard = withStyles(styles)(SubscriptionCard);

export { SubscriptionCard } ;