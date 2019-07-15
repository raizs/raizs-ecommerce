export const OPEN_CART_WARNING_MODAL = 'OPEN_CART_WARNING_MODAL'; 
export const CLOSE_CART_WARNING_MODAL = 'CLOSE_CART_WARNING_MODAL'; 

export const openCartWarningModalAction = ({
  cartInfo,
  subscriptionCartInfo,
  oldCart,
  oldSubscriptionCart,
  oldDate,
  newDate,
  oldSelectedDate
}) => {
  const data = {
    oldDate,
    newDate
  };
  
  if(cartInfo.length) {
    data.cartInfo = cartInfo;
    data.oldCart = oldCart;
    data.oldSelectedDate = oldSelectedDate;
  }
  
  if(subscriptionCartInfo.length) {
    data.subscriptionCartInfo = subscriptionCartInfo;
    data.oldSubscriptionCart = oldSubscriptionCart;
    data.oldSelectedDate = oldSelectedDate;
  }

  return {
    type: OPEN_CART_WARNING_MODAL,
    data
  };
};

export const closeCartWarningModalAction = () => ({ type: CLOSE_CART_WARNING_MODAL });