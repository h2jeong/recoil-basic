import { atom, selector, selectorFamily, waitForAll } from "recoil";

export const currentUserIDState = atom({
  key: "CurrentUserID",
  default: selector({
      key: 'CurrentUserID/Default',
      get: () => myFetchCurrentUserId()
  }),
});

export const userInfoQuery = selectorFamily({
  key: "UserInfoQuery",
  get: (userID) => async () => {
    const response = await myDBQuery({ userID });
    if (response?.error) throw response.error;
    return response;
  },
});


export const userNameQuery = selectorFamily({
    key: 'UserName',
    get: userID => async () => {
        const response = await myDBQuery({userID});
        if (response.error) throw response.error;
        return response.name;
    }
})

export const currentUserInfoQuery = selector({
  key: "CurrentUserInfoQuery",
  get: ({ get }) => get(userInfoQuery(get(currentUserIDState))),
});

export const friendsInfoQuery = selector({
  key: "FriendsInfoQuery",
  get: ({ get }) => {
    const { friendList } = get(currentUserInfoQuery);
    const friends = get(waitForAll(friendList.map(friendID => userInfoQuery(friendID))))

    return friends;
  },
});

function myDBQuery() {}
function myFetchCurrentUserId() {}
