import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "./../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCountContainer
} from "./cart-icon.styles";

const CartIcon = ({ toggleCartHidden, totalItems }) => {
  return (
    <CartIconContainer onClick={toggleCartHidden}>
      <ShoppingIconContainer className="shopping-icon" />
      <ItemCountContainer className="item-count">
        {totalItems}
      </ItemCountContainer>
    </CartIconContainer>
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
