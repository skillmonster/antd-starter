import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';
import * as utility from './utility';
import * as auth from './auth';
import { all, fork } from 'redux-saga/effects';
const rootReducer = (history: any) =>
  combineReducers({
    router: history,
    error: utility.reducer,
    success: utility.successReducer,
    modal_dialog: utility.modalDialogReducer,
    notification: utility.notificationReducer,
    modal: utility.modalReducer,
  });
export interface AppState {
  router: RouterState;
  error: utility.ErrorState;
  success: utility.SuccessState;
  modal_dialog: utility.ModalDialogState;
  notification: utility.NotificationState;
  modal: utility.ModalState<any>;
}

export default rootReducer;

export function* rootSaga() {
  yield all([fork(auth.authSaga)]);
}
