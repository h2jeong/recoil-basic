import React, { useEffect } from 'react'
import { atomFamily, selectorFamily, useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserIDState } from './atoms';

const userInfoQueryRequestIDState = atomFamily({
    key: 'UserInfoQueryRequestID',
    default: 0
})

const userInfoQuery = selectorFamily({
    key: 'UserInfoQuery',
    get: userID => async ({get}) => {
        get(userInfoQueryRequestIDState(userID));

        const response = await myDBQuery({userID})
        
        if (response?.error) {
            throw response.error;
        }

        return response;
    }
})

const userInfoState = atomFamily({
    key: 'UserInfo',
    default: userID => fetch(useInfoURL(userID))
})

function useRefreshUserInfo(userID) {
    const setUserInfoQueryRequestID = useSetRecoilState(userInfoQueryRequestIDState(userID))
    return () => {
        setUserInfoQueryRequestID(requestID => requestID + 1);
    }
}

function RefreshUserInfo({userID}) {
    const refreshUserInfo = useRecoilCallback(({set}) => async id => {
        const userInfo = await myDBQuery({userID});
        set(userInfoState(userID), userInfo);
    }, [userID])

    useEffect(() => {
        const intervalID = setInterval(refreshUserInfo, 1000);
        return () => clearInterval(intervalID)
    }, [refreshUserInfo])

    return null;
}

const CurrentUserInfo2 = () => {
    const currentUserID = useRecoilValue(currentUserIDState);
    const currentUserInfo = useRecoilValue(userInfoQuery(currentUserID))
    const refreshUserInfo = useRefreshUserInfo(currentUserID);

    return (
        <div>
            <h1>{currentUserInfo.name}</h1>
            <button onClick={refreshUserInfo}>Refresh</button>
        </div>
    )
}

function myDBQuery() {}
function useInfoURL() {}

export default CurrentUserInfo2
