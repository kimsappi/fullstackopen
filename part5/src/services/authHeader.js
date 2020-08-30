const getAuthHeader = user => {
  return { Authorization: 'bearer ' + user.token };
};

export default getAuthHeader;
