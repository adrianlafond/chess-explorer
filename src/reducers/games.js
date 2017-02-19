import Immutable from 'seamless-immutable';
import * as type from '../constants/actions';
import positionStandard from '../chess/position-standard';

const base = Immutable([]);

export default (state = base, action) => {
  switch (action.type) {
    case type.CREATE_GAME:
      const id = gameUid();
      state = state.setIn([state.length], {
        id,
        position: positionStandard,
      });
      break;
    case type.START_SQUARE:
    case type.ENTER_SQUARE:
    case type.EXIT_SQUARE:
    case type.COMPLETE_SQUARE:
      return actionReducer(state, action);
    default:
      break;
  }
  return state;
}

function actionReducer(state, action) {
  const index = gameIndexById(state, action.game);
  switch (action.type) {
    case type.START_SQUARE:
      return state.setIn([index, 'position', action.square, 'active'], true);
    case type.ENTER_SQUARE:
      return state.setIn([index, 'position', action.square, 'highlight'], true);
    case type.EXIT_SQUARE:
      return state.setIn([index, 'position', action.square, 'highlight'], false);
    case type.COMPLETE_SQUARE:
      break;
    default:
      break;
  }
  return state;
}

function gameIndexById(state, id) {
  for (let i = 0; i < state.length; i++) {
    if (state[i].id === id) {
      return i;
    }
  }
  return -1;
}

let _gameUid = 0;
function gameUid() {
  return 'game-' + _gameUid++;
}
