export const TOGGLE_NAVBAR = 'TOGGLE_NAVBAR';
export const OPEN_NAVBAR = 'OPEN_NAVBAR';
export const CLOSE_NAVBAR = 'CLOSE_NAVBAR';

export const toggleNavbar = () => ({
  type: TOGGLE_NAVBAR,
});

export const openNavbar = () => ({
  type: OPEN_NAVBAR,
});

export const closeNavbar = () => ({
  type: CLOSE_NAVBAR,
});