import { axiosInstant } from '../axiosInstant';
import { IAuth } from '../store/auth/type';

export const login = (auth: IAuth) =>
  axiosInstant.post('/login', auth).then((res) => res);
