import CreatePost from './CreatePost/CreatePost'
import SignUp from './SignUp/SignUp'
import Scheduler from './Todo/Scheduler'
import LinearAlgebraCalculator from './LinearAlgebraCalculator/LinearAlgebraCalculator';
import StudyTimer from './Todo/StudyTimer/StudyTimer';
import StudyTimerSummary from './Todo/StudyTimer/Summary/StudyTimerSummary';
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
            case "TimeSummary" :
                return <StudyTimerSummary />
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