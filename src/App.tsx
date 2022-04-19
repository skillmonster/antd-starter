import React, { Suspense } from 'react';
import './styles/main.less';
import { History } from 'history';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { AuthConfig } from './config/routes/auth.config';
import { AdminConfig } from './config/routes/route.config';
interface AppProps {
  history: History;
}
function App({ history }: AppProps) {
  return (
    <>
      <Router history={history}>
        <Suspense fallback={'loading'}>
          <AuthConfig />
        </Suspense>
        <AdminConfig />
      </Router>
    </>
  );
}

export default App;
