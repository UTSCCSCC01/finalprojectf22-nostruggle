import ApiCall from "../../components/api/ApiCall"
import { Link } from "react-router-dom"

export const formatAnswer = (n) => {
        return  (
        <>  
            <Link to={`/profile/${n.sourceAuthor}`}>{n.sourceAuthor}</Link> added an answer to your question <Link to={`/postThread/${n.source}`}><b>{n.sourceTitle}</b> </Link>
        </>
    )
}

export const formatComment = (n) => {
    return  (
    <>  
        <Link to={`/profile/${n.sourceAuthor}`}>{n.sourceAuthor}</Link> added a comment to your answer to the post <Link to={`/postThread/${n.source}`}><b>{n.sourceTitle}</b> </Link>
    </>
)
}

export const formatMessage = (n) => {
    let msg
    switch(n.type) {
        case 'answer':
            msg = formatAnswer(n)
            break
        case 'comment':
            msg = formatComment(n)
            break
        default:
            msg =  `No way to format notif yet ${n.source}  ${n.type}`
            break
    }
    return msg
}


export const formatMessages = (lst) => {
    return lst.map( (n) => formatMessage(n))
}

export const sendNotification = async (type, source, sourceTitle, sourceAuthor, toUserId) => {
    const data = {
        source: source,
        sourceTitle: sourceTitle,
        sourceAuthor: sourceAuthor,
        toUserId: toUserId,
        type: type
    }
    await ApiCall.post('/notification', data )
    .then(() => console.log("sent notif"))
}