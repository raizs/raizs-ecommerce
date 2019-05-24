export const TOGGLE_USER_POPPER = 'TOGGLE_USER_POPPER';
export const OPEN_USER_POPPER = 'OPEN_USER_POPPER';
export const CLOSE_USER_POPPER = 'CLOSE_USER_POPPER';
export const TOGGLE_SEARCH_BAR_ACTION = 'TOGGLE_SEARCH_BAR_ACTION';

export const toggleUserPopperAction = () => ({ type: TOGGLE_USER_POPPER });
export const openUserPopperAction = () => ({ type: OPEN_USER_POPPER });
export const closeUserPopperAction = () => ({ type: CLOSE_USER_POPPER });
export const toggleSearchBarAction = (bool) => ({ type: TOGGLE_SEARCH_BAR_ACTION, data: bool });
