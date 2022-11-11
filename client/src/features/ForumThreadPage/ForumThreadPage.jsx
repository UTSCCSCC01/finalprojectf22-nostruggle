import { Outlet } from "react-router-dom"

function ForumThreadPage(){

    return(
        <div>
            <Outlet/>
            <h3>Post thread</h3>
        </div>
    )

}

export default ForumThreadPage;