const RPCClient = jest.genMockFromModule('@hharnisc/micro-rpc-client');
RPCClient.fakeResult = { fake: 'yes' };
RPCClient.fakeError = 'there was an error';
RPCClient.prototype.call = jest.fn((name) => {
  if (name === 'fail') {
    return Promise.reject(new Error(RPCClient.fakeError));
  }
  return Promise.resolve(RPCClient.fakeResult);
});
module.exports = RPCClient;
