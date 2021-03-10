import React from "react";
import { RecoilRoot } from "recoil";
// import CurrentUserInfo from "./CurrentUserInfo";
import CurrentUserInfo2 from "./CurrentUserInfo2";
import { ErrorBoundary } from "./ErrorBoundary";
// import UserInfo from "./UserInfo";
// import TodoList from './TodoList';

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo2 />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
