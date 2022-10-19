import CreatePost from './CreatePost/CreatePost'
import SignUp from './SignUp/SignUp'
import Scheduler from './Todo/Scheduler'
import LinearAlgebraCalculator from './LinearAlgebraCalculator/LinearAlgebraCalculator';
import StudyTimer from './Todo/StudyTimer/StudyTimer';
import Calculator from './Calculator/Calculator';
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
                return <Calculator />                    
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