import CreatePostPage from "./Post/CreatePostPage";
const index = (props) => {

    const getPage = () =>{
        switch (props.page) {
            case "Catherine" :
                return "Catherine's page"
            case "Ishika" :
                return "Ishika's page"
            case "Madison" :
                return <CreatePostPage />
            case "Tara" :
                return "Tara's page"                    
            case "Christine" :
                return "Christine's page"
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