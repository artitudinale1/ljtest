import { assetsConstants } from "../constants";
import { assetsService } from "../services";
import { alertActions } from "./";
import { history } from "../utils";

export const assetsActions = {
  getAssets,
  addFilter,
  removeFilter
};

function getAssets() {
  return dispatch => {
    assetsService.getAssets().then(
      assets => {
        dispatch(success(assets));
        // history.push('/assets');
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: assetsConstants.ASSETS_FETCH_REQUEST };
  }
  function success(assets) {
    return { type: assetsConstants.ASSETS_FETCH_SUCCESS, assets };
  }
  function failure(error) {
    return { type: assetsConstants.ASSETS_FETCH_FAILURE, error };
  }
}

function addFilter(label, option) {
  return {
    type: assetsConstants.ASSETS_FILTER_ADDED,
    filter: {
      label: label,
      option: [option]
    }
  };
}

function removeFilter(filter) {
  return { type: assetsConstants.ASSETS_FILTER_REMOVED };
}
