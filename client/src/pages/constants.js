export const useNavBarSignedInPages = () => {
    return [
        {
            path: '/',
            title: "HOME"
        },
        {
            path: '/forum',
            title: "FORUM"
        },
        {
            path: '/discover',
            title: "DISCOVER"
        },
        {
            path: '/todo',
            title: "TODOLIST"
        },
        {
            path: '/daily',
            title: "DAILY SUMMARY"
        }
    ]
}

export const useNavBarSignedOutPages = () => [
    {
        path: '/login',
        title: "SIGN IN"
    }
]
