import CreatePost from './CreatePost/CreatePost.js'
import SignUp from './SignUp/SignUp.js'
import Scheduler from './Todo/Scheduler'
import LinearAlgebraCalculator from './LinearAlgebraCalculator/LinearAlgebraCalculator';

const index = (props) => {

    const getPage = () =>{
        switch (props.page) {
            case "Catherine" :
                return <SignUp />
            case "Ishika" :
                return "Coming Soon!"
            case "Madison" :
                return <CreatePost />
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