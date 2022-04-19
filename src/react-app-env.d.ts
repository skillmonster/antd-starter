/// <reference types="react-scripts" />
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
interface Window {
  INITIAL_REDUX_STATE: any;
  less: any;
}
type Status = 'active' | 'inactive';

declare namespace NodeJS {
  interface ReactEnv extends ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
  }

  interface Process {
    env: ReactEnv;
  }
}
