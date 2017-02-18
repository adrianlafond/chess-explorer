import * as type from '../constants/actions';

export function createGame() {
  return { type: type.CREATE_GAME };
}

export function startSquare(game, square) {
  return { type: type.START_SQUARE, game, square };
}

export function enterSquare(game, square) {
  return { type: type.ENTER_SQUARE, game, square };
}

export function exitSquare(game, square) {
  return { type: type.EXIT_SQUARE, game, square };
}

export function completeSquare(game) {
  return { type: type.COMPLETE_SQUARE, game };
}
