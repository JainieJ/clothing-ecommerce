import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "./../../redux/cart/cart.selectors";
import "./cart-dropdown.styles.scss";
import CustomButton from "./../custom-button/custom-button.component";
import CartItem from "./../cart-item/cart-item.component";
import { toggleCartHidden } from "./../../redux/cart/cart.actions";

const CartDropdown = ({ cartItems, history, hideDropdown }) => {
  return (
    <div className="cart-dropdown">
      {cartItems.length ? (
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          hideDropdown();
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
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
