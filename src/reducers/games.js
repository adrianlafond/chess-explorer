import * as type from '../constants/actions';

const games = [];

export default (state = games, action) => {
  switch (action.type) {
    case type.CREATE_GAME:
      break;
    case type.START_SQUARE:
    case type.ENTER_SQUARE:
    case type.EXIT_SQUARE:
    case type.COMPLETE_SQUARE:
      console.log(action.type, action.square || '-');
      break;
    default:
      break;
  }
  return state;
}
