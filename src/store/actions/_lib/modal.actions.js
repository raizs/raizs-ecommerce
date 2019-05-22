export const OPEN_MODAL_PRODUCT = 'OPEN_MODAL_PRODUCT'; 
export const CLOSE_MODAL_PRODUCT = 'CLOSE_MODAL_PRODUCT'; 

export const openModalProductAction = product => ({
  type: OPEN_MODAL_PRODUCT,
  data: product
});

export const closeModalProductAction = product => ({
  type: CLOSE_MODAL_PRODUCT,
  data: product
});