import React from "react";
import { RecoilRoot } from "recoil";
import CurrentUserInfo from "./CurrentUserInfo";
import { ErrorBoundary } from "./ErrorBoundary";
// import TodoList from './TodoList';

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
