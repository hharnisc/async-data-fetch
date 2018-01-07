export const actionTypes = {
  FETCH: 'FETCH',
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

export default (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const actions = {
  fetch: ({ name, args }) => ({
    type: actionTypes.FETCH,
    name,
    args,
  }),
  fetchStart: ({ name, args, id }) => ({
    type: `${name}_${actionTypes.FETCH_START}`,
    name,
    args,
    id,
  }),
  fetchSuccess: ({ name, args, id, result }) => ({
    type: `${name}_${actionTypes.FETCH_SUCCESS}`,
    name,
    args,
    id,
    result,
  }),
  fetchFail: ({ name, args, id, error }) => ({
    type: `${name}_${actionTypes.FETCH_FAIL}`,
    name,
    args,
    id,
    error,
  }),
};
