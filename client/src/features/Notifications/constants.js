import ApiCall from "../../components/api/ApiCall"

const formatComment = async (notif) => {
    const commentId = notif.source;
    const comment = await ApiCall.get('/comment')
    return <
}
export const formatMessage = (notif) => {
    switch (notif.type) {
        case 'comment':


    }
}