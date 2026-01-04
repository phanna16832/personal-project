import {useState } from "react";
import '../assets/calculator.css'

const Calculator = () =>{
    const [price , setPrice] = useState('');
    const [rate,setRate] = useState('6');
    const convertPrice = (Number(price) / Number(rate)).toFixed(2);
    
    let  msg = convertPrice;
    if(!price){
        msg = "Please enter price and rate";
    }
    return(
        <form>
           <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
           <select value={rate} onChange={(e) => setRate(e.target.value)}>
            <option value="6">6.0</option>
            <option value="6.1">6.1</option>
            <option value="6.2">6.2</option>
           </select>
           <button className="btn">click</button>
           <span>{msg}</span>
        </form>
    )
}

export default Calculator;