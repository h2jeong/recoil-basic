import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { userNameQuery } from "./atoms";

const UserInfo = ({ userID }) => {
  // const userName = useRecoilValue(userNameQuery(userID))
  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));

  switch (userNameLoadable.state) {
    case "hasValue":
      return <div>{userNameLoadable.contents}</div>;
    case "loading":
      return <div>loading...</div>;
    case "hasError":
      throw userNameLoadable.contents;
    default:
      return false;
  }
};

export default UserInfo;
