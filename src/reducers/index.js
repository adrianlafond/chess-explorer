import { combineReducers } from 'redux'
import games from './games';
import ui from './ui';

const reducers = combineReducers({
  games,
  ui,
});

export default reducers;
