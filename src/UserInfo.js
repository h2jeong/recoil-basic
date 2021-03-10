import React from 'react'
import { selectorFamily, useRecoilValue } from 'recoil'

const userNameQuery = selectorFamily({
    key: 'UserName',
    get: userID => async () => {
        const response = await myDBQuery({userID});
        if (response.error) throw response.error;
        return response.name;
    }
})

const UserInfo = ({userID}) => {
    const userName = useRecoilValue(userNameQuery(userID))
    return (
        <div>
            {userName}
        </div>
    )
}

export default UserInfo
