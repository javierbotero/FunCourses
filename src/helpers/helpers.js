const initCreator = obj => ({
  method: obj.verb,
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(obj.data),
});

const objThunk = (url, verb, data) => {
  const init = initCreator({
    verb,
    data,
  });
  return {
    url,
    init,
  };
};

const tokenPayload = (id, token) => ({
  token_id: id,
  token,
});

const userPayload = (id, password) => ({
  current_user_id: id,
  current_user_password: password,
});

const handleApiRequest = async (initCreator, verb, url, data) => {
  const init = initCreator({ verb, data });
  const response = await fetch(url, init)
    .then(res => res)
    .catch(err => err);
  return response;
};

export {
  initCreator,
  objThunk,
  tokenPayload,
  userPayload,
  handleApiRequest,
};
