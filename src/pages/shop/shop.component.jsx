import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { firestore } from "../../firebase/firebase.utils";
import { convertCollectionsSnapShotToMap } from "./../../firebase/firebase.utils";
import CollectionsOverview from "./../../components/collection-overview/collection-overview.component";
import CollectionPage from "./../collection/collection.component";
import { updateCollections } from "./../../redux/shop/shop.actions";
import WithSpinner from "./../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  state = {
    isLoading: true
  };
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    //onSnapShot runs on every update in the "collections" collection or when the component mounts for
    //the first time. snapshot represents the array of documents at this "collections" location
    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { match } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={routeProps => (
            <CollectionsOverviewWithSpinner
              isLoading={isLoading}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={routeProps => (
            <CollectionPageWithSpinner isLoading={isLoading} {...routeProps} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
