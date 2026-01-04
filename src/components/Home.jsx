import {useState} from "react";

const Home = () => {
        const [text, setText] = useState('')
    if(!text){
        return(
            <span>Text empty</span>
        )
    }
    return (
        <div>
            
        </div>
    );
};

export default Home;