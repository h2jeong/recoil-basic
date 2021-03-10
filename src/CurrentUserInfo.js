import React from 'react'
import { atom, selector, useRecoilValue } from 'recoil'

const currentUserIDState = atom({
    key: 'CurrentUserID',
    default: 1
})

// const tableOfUsers = atom({
//     key: 'TableOfUsers',
//     default: {}
// })

// const currentUserNameState = selector({
//     key: 'CurrentUserName',
//     get: ({get}) => {
//         return tableOfUsers[get(currentUserIDState)].name;
//     }
// })

const currentUserNameQuery = selector({
    key: 'CurrentUserName',
    get: async({get}) => {
        const response = await myDBQuery({
            userId: get(currentUserIDState)
        })
        if (response.error) throw response.error;
        return response.name;
    }
})

function CurrentUserInfo() {
    const userName = useRecoilValue(currentUserNameQuery);
    return (
        <div>
            {userName}
        </div>
    )
}

export default CurrentUserInfo
