import {authHeader} from '../utils';
import assetListSample from '../data/assetListSample.json';

export const assetsService = {
  getAssets,
};

function getAssets() {
  const assetList = assetListSample.assets.map(function(asset, i) {
    return {
      id: i,
      asset: asset,
      visability: true,
      selected: false,
    };
  });
  const assets = {assets: assetList, filters: assetListSample.filters};
  return new Promise((resolve, reject) => resolve(assets));
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
