import RPCClient from '@hharnisc/micro-rpc-client';
import {
  actions,
  actionTypes,
} from './';


export default ({
  rpcClientOptions
}) => (store) => {
  let counter = 0;
  const rpc = new RPCClient(rpcClientOptions);
  return next => (action) => {
    next(action);
    switch (action.type) {
      case actionTypes.FETCH: {
        const id = counter++; // eslint-disable-line no-plusplus
        const args = action.args || {};

        store.dispatch(actions.fetchStart({
          name: action.name,
          args,
          id,
        }));

        rpc.call(action.name, args)
          .then(result => store.dispatch(actions.fetchSuccess({
            name: action.name,
            args,
            id,
            result: action.format ? action.format(result) : result,
          })))
          .catch((error) => {
            store.dispatch(actions.fetchFail({
              name: action.name,
              args,
              id,
              error: error.message,
            }));
          });
        break;
      }
      default:
        break;
    }
  };
};
