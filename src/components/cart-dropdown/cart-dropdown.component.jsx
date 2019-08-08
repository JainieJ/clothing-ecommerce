import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "./../../redux/cart/cart.selectors";
import CartItem from "./../cart-item/cart-item.component";
import { toggleCartHidden } from "./../../redux/cart/cart.actions";
import {
  CartDropDownContainer,
  CartItemsContainer,
  EmptyMessageContainer,
  CartDropDownButtonContainer
} from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, history, hideDropdown }) => {
  return (
    <CartDropDownContainer>
      {cartItems.length ? (
        <CartItemsContainer>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </CartItemsContainer>
      ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      )}
      <CartDropDownButtonContainer
        onClick={() => {
          history.push("/checkout");
          hideDropdown();
        }}
      >
        GO TO CHECKOUT
      </CartDropDownButtonContainer>
    </CartDropDownContainer>
  );
};

// const mapStateToProps = state => ({
//   cartItems: selectCartItems(state)
// });
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  hideDropdown: () => dispatch(toggleCartHidden())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartDropdown)
);
