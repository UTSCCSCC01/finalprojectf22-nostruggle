import CreatePost from './CreatePost/CreatePost'
import SignUp from './SignUp/SignUp'
import Scheduler from './Todo/Scheduler'
import LinearAlgebraCalculator from './LinearAlgebraCalculator/LinearAlgebraCalculator';
import StudyTimer from './Todo/StudyTimer/StudyTimer';
import Calculator from './Calculator/Calculator';
import StudyTimerSummary from './Todo/StudyTimer/Summary/StudyTimerSummary';
import Forum from './Forum/Forum';
import Dashboard from '../pages/Dashboard';
const index = (props) => {

    const getPage = () =>{
        switch (props.page) {
            case "Dashboard":
                return <Dashboard/>
            case "Catherine" :
                return <SignUp />
            case "Ishika" :
                return <Forum/>
            case "Madison" :
                return <CreatePost />
            case "Tara" :
                return <Calculator />                    
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
        <div >
            { getPage() }
        </div>
    )
}

export default index