const SAVE_USER = 'SAVE_USER';

const saveUser = (user) => ({
  type: SAVE_USER,
  payload: user,
});

export {
  SAVE_USER,
  saveUser,
};
