import React from "react";
import { ReactComponent as Logo } from "../../img/crown.svg";
import { auth } from "./../../firebase/firebase.utils";
import { connect } from "react-redux";
import { selectCurrentUser } from "./../../redux/user/user.selectors";
import { selectHidden } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from "./header.styles";

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={() => auth.signOut()}>
            Sign Out
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   // ?????
//   currentUser,
//   hidden
// });

// const mapStateToProps = state => ({
//   // ?????
//   currentUser: selectCurrentUser(state),
//   hidden: selectHidden(state)
// });

// the same with createStructuredSelector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectHidden
});

export default connect(mapStateToProps)(Header);
