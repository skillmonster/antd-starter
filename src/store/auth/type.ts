export interface IAuth {
  identified: string;
  password: string;
}

export type ActionAuth = { LOGIN_AUTH: IAuth };
export type ActionMap = ActionAuth;
export type Action<K extends keyof ActionMap = keyof ActionMap> = {
  [P in K]: {
    type: K;
    payload: ActionMap[K];
  };
}[K];
