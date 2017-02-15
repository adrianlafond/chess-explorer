import * as type from '../constants/actions';

const games = [];

export default (state = games, action) => {
  switch (action.type) {
    case type.CREATE_GAME:
      break;
    default:
      break;
  }
  return state;
}
