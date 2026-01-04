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
            <h1>Hello world</h1>
            <input
                type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            />

            <span>{text}</span>
        </div>
    );
};

export default Home;