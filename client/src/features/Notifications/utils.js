import ApiCall from "../../components/api/ApiCall"
import { Link } from "react-router-dom"

export const formatCommentOld = async (n, yes, index, setList, refresh) => {

    if (!yes) {
        let msg
        msg = (
            <>  
                <Link>lololol</Link> added a comment to your post <Link to={`/postThread/`}><b>fake post</b> </Link>
            </>
        )
        //setList(index, msg)
        return msg
    }
    let answerParent = ''
    let answerAuthorId = ''
    let postTitle = ''
    let msg = <div>DID NOT WAIT</div>
    console.log("getting answers")
    await ApiCall.get(`/answers/${n.source}`)
    .then(async res => {
        console.log(res)

        if (res.status === 201){
            const answer = res.data
            console.log(res.data)
            answerParent = answer.child_of
            answerAuthorId = answer.created_by
            console.log("getting post thread")
            await ApiCall.get(`/postThread/${n.source}`)
            .then(res => {
                console.log(res)

                if (res.status === 201){
                    const thread = res.data
                    postTitle = thread.title
                    console.log("setting msg")
                    msg =  (
                        <>  
                            <Link>{answerAuthorId}</Link> added a comment to your post <Link to={`/postThread/${n.source}`}><b>{postTitle}</b> </Link>
                        </>
                    )
                    //setList(index, msg)
                }
            })
        }
    }) // get msg
    console.log("reutnring msg")
    return msg


}

export const formatComment = (n, yes) => {
    let msg
    if (!yes) {
        return  <>  
                <Link>lololol</Link> added a comment to your post <Link to={`/postThread/`}><b>fake post</b> </Link>
            </>
    }
    msg = (
        <>  
            <Link>{n.sourceAuthor}</Link> added a comment to your post <Link to={`/postThread/${n.source}`}><b>{n.sourceTitle}</b> </Link>
        </>
    )
    return msg
}

export const formatMessage = async (setMsg, n) => {
    let msg
    switch(n.type) {
        case 'comment':
            msg = await formatComment(n, false)
            break
        default:
            msg = await formatComment(n, true) //() => `No way to format notif yet ${n.source}  ${n.type}`
            break
    }
    setMsg(msg)
}


export const formatMessages = (lst) => {
    let msg
    return lst.map( (n) => {
        switch(n.type) {
            case 'comment':
                msg =   formatComment(n)
                break
            default:
                msg =  formatComment(n, true) //() => `No way to format notif yet ${n.source}  ${n.type}`
                break
        }

        return msg
    })
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