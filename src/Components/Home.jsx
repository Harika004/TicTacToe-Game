import "../Styling/Home.css";
import {useNavigate} from "react-router-dom";
export default function Home(){
    const navigate = useNavigate();
    const eventHandler = ()=>{
        // <Navigate to="./Rules" replace={true}/>
        navigate("/Rules");
    }
    return(
        <div className="text-center">
        <h1 className="main-heading text-fuchsia-800 text-8xl">Tic Tac Toe</h1>
        <h3 className="intro text-pink-50 text-2xl mt-3">Welcome To The Game!</h3>
        <div >
            <img src="https://png.pngtree.com/png-clipart/20210920/ourmid/pngtree-pen-and-paper-games-tic-tac-toe-games-blue-png-image_3928567.jpg" className="logo-img"/>
        </div>
        
        <button className="start-button bg-fuchsia-700  bg-opacity-20 " onClick={eventHandler}>Start Game</button>
        </div>
        
    )
}