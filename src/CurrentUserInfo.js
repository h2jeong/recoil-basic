import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import {
  currentUserIDState,
  currentUserInfoQuery,
  friendsInfoQuery,
  userInfoQuery,
} from "./atoms";

function CurrentUserInfo() {
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);
  // const setCurrentUserID = useSetRecoilState(currentUserIDState);
  const changeUser = useRecoilCallback(({ snapshot, set }) => (userID) => {
    snapshot.getLoadable(userInfoQuery(userID)); // pre-fetch user info
    set(currentUserIDState, userID);
  });

  return (
    <div>
      <h1>{currentUser.name}</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} onClick={() => changeUser(friend.id)}>
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrentUserInfo;
