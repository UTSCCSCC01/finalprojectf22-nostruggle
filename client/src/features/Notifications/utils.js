import ApiCall from "../../components/api/ApiCall"
import { Link } from "react-router-dom"
export const formatMessage = (n) => {
    switch(n.type) {
        case 'comment':
            return formatComment(n)
    }
}

export const formatComment = (n) => {
    const commentSource = 0 // get msg
    const commentAuthorId = commentSource.userID

    return (
        <>  
            <Link>Bob Marley</Link> added a comment to your post <Link><b>{n.source}</b> </Link>
        </>
    )

}