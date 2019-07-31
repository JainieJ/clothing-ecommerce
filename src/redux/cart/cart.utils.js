export const addItemToCart = (cartItems, itemToAdd) => {
  const existingCartItem = cartItems.find(item => item.id === itemToAdd.id);
  if (existingCartItem) {
    return cartItems.map(item => {
      return item.id === itemToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
  return cartItems.filter(item => item.id !== itemToRemove.id);
};

export const decreaseItemInCart = (cartItems, itemToDecrease) => {
  if (itemToDecrease.quantity === 1) {
    return cartItems.filter(item => item.id !== itemToDecrease.id);
  }
  return cartItems.map(item =>
    item.id === itemToDecrease.id
      ? { ...itemToDecrease, quantity: itemToDecrease.quantity - 1 }
      : item
  );
};
