import React from "react";
import { connect } from "react-redux";
import AssetsTable from "./AssetsTable";
import { assetsActions } from "../actions";
import { AssetsFilter } from "./AssetsFilter";
import AssetsFilterAlternate from "./AssetsFilterAlternate";

class AssetsPage extends React.Component {
  componentDidMount() {
    this.props.getAssets();
  }

  render() {
    return (
      <div>
        <h2>Filter Assets</h2>
        <AssetsFilter
          label="Technology"
          option={[
            "AD-CHP",
            "Battery",
            "CHP",
            "Diesel Generator",
            "EFW",
            "Hydro",
            "Import",
            "LFG-CHP",
            "Loadbank",
            "Peak",
            "Portfolio Deal",
            "Solar",
            "Wind"
          ]}
        />

        <div>
          <AssetsTable />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication, assets } = state;
  return { authentication, assetList: assets.assets };
}

const mapDispatchToProps = dispatch => ({
  getAssets: () => {
    dispatch(assetsActions.getAssets());
  }
});

const connectedAssetsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetsPage);
export { connectedAssetsPage as AssetsPage };
