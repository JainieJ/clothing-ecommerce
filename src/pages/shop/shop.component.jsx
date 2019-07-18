import React, { Component } from "react";
import SHOP_DATA from "./shop.data";
import PreviewCollection from "../../components/preview-collection/preview-collection.component";

class ShopPage extends Component {
  state = {
    collections: SHOP_DATA
  };
  render() {
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {collections.map(collection => {
          return <PreviewCollection key={collection.id} {...collection} />;
        })}
      </div>
    );
  }
}

export default ShopPage;
