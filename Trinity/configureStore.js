import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default function configureStore() {
    let store = createStore(reducers, applyMiddleware(thunk, logger));
}
