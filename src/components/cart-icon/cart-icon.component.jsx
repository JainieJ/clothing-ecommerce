import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "./../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../img/shopping-bag.svg";

const CartIcon = ({ toggleCartHidden, totalItems }) => {
  console.log("rendering CartIcon");
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{totalItems}</span>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

// const mapStateToProps = state => ({
//   totalItems: selectCartItemsCount(state)
// });
const mapStateToProps = createStructuredSelector({
  totalItems: selectCartItemsCount
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
