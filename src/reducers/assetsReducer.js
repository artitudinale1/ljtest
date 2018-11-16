import { assetsConstants } from "../constants";

const initialState = {
  assets: [],
  filters: {}
};
/*
function toggleAssetVisibility(assetItem, filters) {
  for (let key in assetItem.asset.asset) {
    // console.log(assetItem);
    if (
      filters["label"].toLowerCase() == key.toLowerCase() &&
      filters["option"].toLowerCase() !=
        assetItem.asset.asset[key].toLowerCase()
    ) {
      return { ...assetItem, visability: false };
    }
  }

  return { ...assetItem, visability: true };
}
*/

function toggleAssetVisibility(assetItem, filters) {
  for (let key in assetItem.asset.asset) {
    if (filters["label"].toLowerCase() == key.toLowerCase()) {
      for (let j in filters["option"]) {
        console.log(filters["option"][j]);
        //  console.log(assetItem.asset.asset[key]);
        if (
          filters["option"][j].toLowerCase() !=
          assetItem.asset.asset[key].toLowerCase()
        )
          // console.log(assetItem.asset.asset[key].toLowerCase());
          return { ...assetItem, visability: false, filters };
      }
    }
  }

  return { ...assetItem, visability: true, filters };
}

export function assets(state = initialState, action) {
  switch (action.type) {
    case assetsConstants.ASSETS_FETCH_SUCCESS:
      return {
        ...state,
        assets: action.assets.assets.map(a => ({
          asset: a,
          visability: true,
          selected: false
        })),
        filters: action.assets.filtersassetsActions
      };
    case assetsConstants.ASSETS_FILTER_ADDED:
      return {
        ...state,
        filter: action.filter,
        assets: state.assets.map(a => toggleAssetVisibility(a, action.filter))
      };
    case assetsConstants.ASSETS_FILTER_REMOVED:
      return {
        ...state,
        filter: action.filter,
        assets: state.assets.map(a => toggleAssetVisibility(a, action.filter))
      };
    default:
      return state;
  }
}
