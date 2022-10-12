
import CreatePostPage from "./Post/CreatePostPage";
import SignUp from "./SignUp"
import Scheduler from "./Todo/Scheduler"
import LinearAlgebraCalculator from '../LinearAlgebraCalculator.js'

const index = (props) => {

    const getPage = () =>{
        switch (props.page) {
            case "Catherine" :
                return <SignUp />
            case "Ishika" :
                return "Coming Soon!"
            case "Madison" :
                return <CreatePostPage />
            case "Tara" :
                return "derivativeCalculator.js in the terminal"                    
            case "Christine" :
                return <Scheduler/>
            case "Zane" :
                return <LinearAlgebraCalculator />
            default: 
                return "Default page"
        }
    }
  return (
        <div>
            { getPage() }
        </div>
    )
}

export default index