import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import createRootReducer, { rootSaga } from '../store';
import { createReduxHistoryContext } from 'redux-first-history';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
    //other options if needed
  });
const configureStore = (initialState?: any) => {
  const sagaMiddleware = createSagaMiddleware();
  let middleWare: Array<any> = [routerMiddleware, sagaMiddleware];
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const logger = (createLogger as any)();
    middleWare.push(logger);
  }
  const store = createStore(
    createRootReducer(routerReducer),
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
  );
  sagaMiddleware.run<any>(rootSaga);
  return store;
};
export const history = createReduxHistory(configureStore());
export default configureStore;
