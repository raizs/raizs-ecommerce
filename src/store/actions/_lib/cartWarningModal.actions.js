export const OPEN_CART_WARNING_MODAL = 'OPEN_CART_WARNING_MODAL'; 
export const CLOSE_CART_WARNING_MODAL = 'CLOSE_CART_WARNING_MODAL'; 

export const openCartWarningModalAction = ({
  cartInfo,
  subscriptionCartInfo,
  newCart,
  newSubscriptionCart,
  oldDate,
  newDate,
  selectedDate
}) => {
  const data = {
    oldDate,
    newDate
  };
  
  if(cartInfo.length) {
    data.cartInfo = cartInfo;
    data.newCart = newCart;
    data.selectedDate = selectedDate;
  }
  
  if(subscriptionCartInfo.length) {
    data.subscriptionCartInfo = subscriptionCartInfo;
    data.newSubscriptionCart = newSubscriptionCart;
  }

  return {
    type: OPEN_CART_WARNING_MODAL,
    data
  };
};

export const closeCartWarningModalAction = () => ({ type: CLOSE_CART_WARNING_MODAL });