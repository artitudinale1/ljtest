import {assets} from './assetsReducer';
import {assetsConstants} from '../constants';

const testState = {};

describe('assets reducer', function() {
  it('should return initial state', function() {
    expect(assets(undefined, {})).toEqual({
      assets: [],
      filters: {},
    });
  });
});
