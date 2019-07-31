import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }
);

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  cartItems => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
  }
);
