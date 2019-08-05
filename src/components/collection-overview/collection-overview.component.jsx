import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./collection-overview.styles.scss";
import PreviewCollection from "./../preview-collection/preview-collection.component";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      {collections.map(collection => {
        return <PreviewCollection key={collection.id} {...collection} />;
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
