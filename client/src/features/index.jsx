import CreatePost from './CreatePost/CreatePost'
import SignUp from './SignUp/SignUp'
import Scheduler from './Todo/Scheduler'
import LinearAlgebraCalculator from './LinearAlgebraCalculator/LinearAlgebraCalculator';
import StudyTimer from './Todo/StudyTimer/StudyTimer';
import Forum from './Forum/Forum';
const index = (props) => {

    const getPage = () =>{
        switch (props.page) {
            case "Catherine" :
                return <SignUp />
            case "Ishika" :
                return <Forum/>
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
            <StudyTimer/>
        </div>
    )
}

export default index