export const OPEN_MODAL_PRODUCT = 'OPEN_MODAL_PRODUCT'; 
export const CLOSE_MODAL_PRODUCT = 'CLOSE_MODAL_PRODUCT'; 
export const SHOW_CONFIRMATION_MODAL = 'SHOW_CONFIRMATION_MODAL'; 
export const CLOSE_CONFIRMATION_MODAL = 'CLOSE_CONFIRMATION_MODAL'; 

export const openModalProductAction = product => ({
  type: OPEN_MODAL_PRODUCT,
  data: product
});

export const closeModalProductAction = () => ({
  type: CLOSE_MODAL_PRODUCT,
});

export const showConfirmationModalAction = data => ({
  type: SHOW_CONFIRMATION_MODAL,
  data
});

export const closeConfirmationModalAction = () => ({
  type: CLOSE_CONFIRMATION_MODAL,
});

