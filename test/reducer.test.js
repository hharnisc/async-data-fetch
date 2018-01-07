import deepFreeze from 'deep-freeze';
import reducer, {
  actions,
  actionTypes,
} from '../src/reducer';

describe('reducer', () => {
  it('should return initial state', () => {
    const stateAfter = {};
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  describe('actions', () => {
    describe('FETCH', () => {
      it('should create an action with object args', () => {
        const args = {
          test: 'yes',
        };
        const name = 'fake rpc';
        expect(actions.fetch({ name, args }))
          .toEqual({
            type: actionTypes.FETCH,
            name,
            args,
          });
      });
      it('should create an action with standard args', () => {
        const args = [1, 2, 3];
        const name = 'fake rpc';
        expect(actions.fetch({ name, args }))
          .toEqual({
            type: actionTypes.FETCH,
            name,
            args,
          });
      });
      it('should create an action with no args', () => {
        const name = 'fake rpc';
        expect(actions.fetch({ name }))
          .toEqual({
            type: actionTypes.FETCH,
            name,
          });
      });
    });
    describe('$action_FETCH_START', () => {
      it('should create an action', () => {
        const name = 'fake rpc';
        const args = {
          test: 'yes',
        };
        const id = 1;
        expect(actions.fetchStart({ name, args, id }))
          .toEqual({
            type: `${name}_${actionTypes.FETCH_START}`,
            name,
            args,
            id,
          });
      });
    });
    describe('$action_FETCH_SUCCESS', () => {
      it('should create an action', () => {
        const name = 'fake rpc';
        const args = {
          test: 'yes',
        };
        const id = 1;
        const result = {
          passed: 'yes',
        };
        expect(actions.fetchSuccess({ name, args, id, result }))
          .toEqual({
            type: `${name}_${actionTypes.FETCH_SUCCESS}`,
            name,
            args,
            id,
            result,
          });
      });
    });
    describe('$action_FETCH_FAIL', () => {
      const name = 'fail';
      const args = {
        test: 'yes',
      };
      const id = 1;
      const error = new Error('some error');
      expect(actions.fetchFail({ name, args, id, error }))
        .toEqual({
          type: `${name}_${actionTypes.FETCH_FAIL}`,
          name,
          args,
          id,
          error,
        });
    });
  });
});
