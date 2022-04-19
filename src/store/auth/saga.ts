import * as types from './type';
import * as services from './../../service/Auth';
import { takeLatest, call, all, fork } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import LocalStorageService from '../../LocalStorageService';
import { history } from '../../config/configureStore';
function* handlerAuth({ payload }: types.Action) {
  try {
    const res = (yield call(services.login, payload)) as AxiosResponse;
    if (res.status === 200) {
      LocalStorageService.setToken({
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
      });
      history.push('/');
    }
  } catch (error) {}
}

function* watchHandlerAuth() {
  yield takeLatest('LOGIN_AUTH', handlerAuth);
}

export function* authSaga() {
  yield all([fork(watchHandlerAuth)]);
}
