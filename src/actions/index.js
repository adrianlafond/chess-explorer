import * as type from '../constants/actions';

export function createGame() {
  return { type: type.CREATE_GAME };
}

export function startSquare(square) {
  return { type: type.START_SQUARE, square };
}

export function enterSquare(square) {
  return { type: type.ENTER_SQUARE, square };
}

export function exitSquare(square) {
  return { type: type.EXIT_SQUARE, square };
}

export function completeSquare() {
  return { type: type.COMPLETE_SQUARE, };
}
