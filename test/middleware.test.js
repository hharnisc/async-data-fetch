import sleep from 'then-sleep';
import RPCClient from '@hharnisc/micro-rpc-client';
import middleware from '../src/middleware';
import { actionTypes } from '../src/reducer';

describe('middleware', () => {
  it('should call next when running middleware', () => {
    const next = jest.fn();
    const action = {
      type: 'INIT',
    };
    middleware()(next)(action);
    expect(next)
      .toBeCalled();
  });

  it('should dispatch a FETCH_START action when beginning a fetch', () => {
    const name = 'fake rpc';
    const args = {
      test: 'yes',
    };
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        asyncDataFetch: {},
      }),
    };
    const action = {
      type: actionTypes.FETCH,
      name,
      args,
    };
    middleware(store)(() => {})(action);
    expect(store.dispatch)
      .toBeCalledWith({
        type: `${name}_${actionTypes.FETCH_START}`,
        name,
        args,
        id: 0,
      });
  });
  it('should increment id when dispatch a subsequent FETCH_START actions', () => {
    const name = 'fake rpc';
    const args = {
      test: 'yes',
    };
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        asyncDataFetch: {},
      }),
    };
    const action = {
      type: actionTypes.FETCH,
      name,
      args,
    };
    const middlewareWithStore = middleware(store);
    middlewareWithStore(() => {})(action);
    middlewareWithStore(() => {})(action);
    expect(store.dispatch)
      .toBeCalledWith({
        type: `${name}_${actionTypes.FETCH_START}`,
        name,
        args,
        id: 1,
      });
    middlewareWithStore(() => {})(action);
    expect(store.dispatch)
      .toBeCalledWith({
        type: `${name}_${actionTypes.FETCH_START}`,
        name,
        args,
        id: 2,
      });
  });
  it('should call the method using the RPCClient', () => {
    const name = 'fake rpc';
    const args = {
      test: 'yes',
    };
    const action = {
      type: actionTypes.FETCH,
      name,
      args,
    };
    const store = {
      dispatch: () => {},
      getState: () => ({
        asyncDataFetch: {},
      }),
    };
    middleware(store)(() => {})(action);
    expect(RPCClient.prototype.call)
      .toBeCalledWith(name, args);
  });
  it('should dispatch a FETCH_SUCCESS action', async () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        asyncDataFetch: {},
      }),
    };
    const name = 'fake rpc';
    const args = {
      test: 'yes',
    };
    const action = {
      type: actionTypes.FETCH,
      name,
      args,
    };
    middleware(store)(() => {})(action);
    await sleep(); // give the event loop a chance to process promise
    expect(store.dispatch)
      .toBeCalledWith({
        type: `${name}_${actionTypes.FETCH_SUCCESS}`,
        name,
        args,
        id: 0,
        result: RPCClient.fakeResult,
      });
  });
  it('should dispatch a FETCH_FAIL action', async () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        asyncDataFetch: {},
      }),
    };
    const name = 'fail';
    const args = {
      test: 'yes',
    };
    const action = {
      type: actionTypes.FETCH,
      name,
      args,
    };
    middleware(store)(() => {})(action);
    await sleep(); // give the event loop a chance to process promise
    expect(store.dispatch)
      .toBeCalledWith({
        type: `${name}_${actionTypes.FETCH_FAIL}`,
        name,
        args,
        id: 0,
        error: RPCClient.fakeError,
      });
  });
});
