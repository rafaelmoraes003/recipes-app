const FETCH_DATA = 'FETCH_DATA';

const fetchData = (value) => ({
  type: FETCH_DATA,
  payload: value,
});

export {
  FETCH_DATA,
  fetchData,
};
