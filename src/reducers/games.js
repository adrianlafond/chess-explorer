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
        position: positionStandard
      });
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

let _gameUid = 0;
function gameUid() {
  return 'game-' + _gameUid++;
}
