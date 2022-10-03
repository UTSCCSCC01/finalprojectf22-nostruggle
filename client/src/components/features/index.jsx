import Timer from './Timer'
import Scheduler from './Todo/Scheduler'
const index = (props) => {

    const getPage = () =>{
        switch (props.page) {
            case "Catherine" :
                return "Catherine's page"
            case "Ishika" :
                return "Ishika's page"
            case "Madison" :
                return "Madison's page"
            case "Tara" :
                return "Tara's page"                    
            case "Christine" :
                return <div><Scheduler/><Timer/></div>
            case "Zane" :
                return "Zane's page"
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