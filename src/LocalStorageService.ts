export interface ITFLocalStorage {
  access_token: string;
  refresh_token: string;
}
const LocalStorageService = (() => {
  function _setToken(tokenObj: ITFLocalStorage) {
    localStorage.setItem('access_token', tokenObj.access_token);
    localStorage.setItem('refresh_token', tokenObj.refresh_token);
  }
  function _getAccessToken() {
    return localStorage.getItem('access_token');
  }
  function _getExpire() {
    return localStorage.getItem('expire');
  }
  function _getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
  function _clearToken() {
    localStorage.removeItem('access_token');
  }
  return {
    // getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    getExpire: _getExpire,
  };
})();
export default LocalStorageService;
