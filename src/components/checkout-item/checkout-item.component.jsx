import React from "react";
import { connect } from "react-redux";
import {
  removeItem,
  addItem,
  decreaseItem
} from "./../../redux/cart/cart.actions";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem, remove, add, decrease }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => decrease(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => add(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => remove(cartItem)}>
        &#10006;
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  remove: item => dispatch(removeItem(item)),
  add: item => dispatch(addItem(item)),
  decrease: item => dispatch(decreaseItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);
