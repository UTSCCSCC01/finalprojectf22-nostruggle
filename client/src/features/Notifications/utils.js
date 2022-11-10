import ApiCall from "../../components/api/ApiCall"
import { Link } from "react-router-dom"

export const formatComment = async (n) => {
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
                }
            })
        }
    }) // get msg
    console.log("reutnring msg")
    return msg


}

export const formatMessages = async (setList, lst) => {
    let newList = []
    let msg
    lst.map(async (n, index) => {
        switch(n.type) {
            case 'answer':
                msg = await formatComment(n)
                break
            default:
                msg = `No way to format notif yet ${n.source}  ${n.type}`
                break
        }
        console.log("pushing")
        console.log(msg)
        newList.push(msg)
        if (index === lst.length - 1) {
            console.log(newList)
            console.log("new list")
            setList(newList)
        }
    })
}


export const sendNotification = async (type, source, toUserId) => {
    const data = {
        source: source,
        toUserId: toUserId,
        type: type
    }
    await ApiCall.post('/notification', data )
    .then(() => console.log("sent notif"))
}