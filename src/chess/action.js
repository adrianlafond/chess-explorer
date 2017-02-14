
export default function chessAction(action) {
  return action.position.setIn([action.square, 'active'], true);
}
