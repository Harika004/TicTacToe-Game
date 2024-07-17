import "../Styling/Box.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Alert from '@mui/material/Alert';
export default function Box4x4(){
    const navigate = useNavigate();
    const {initialPlayer} = useParams();
    const [moves,setmoves] = useState(Array(16).fill(null));
    const [currPlayer,setcurrPlayer] = useState(initialPlayer);
    const [winner,setwinner] = useState(null);
    const [isPaused,setisPaused] = useState(false); 
    const endGameHandler= ()=>{
        navigate('/');
    }

    const handleClick = (index)=>{
        if(!moves[index] && !winner && !isPaused){
            const newmoves = [...moves];
            newmoves[index] = currPlayer;
            setmoves(newmoves);
            setcurrPlayer(currPlayer === 'X' ? 'O' : 'X');
        }};
    const togglePaused=()=>{
        setisPaused(!isPaused);
    }
    const playAgainButton = ()=>{
        setmoves(Array(16).fill(null))
        setcurrPlayer(initialPlayer);
        setwinner(null);
        setisPaused(false);
    };
    const checkwinner = ()=>{
        const winningCombinations = [
            [0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15],  //rows
            [0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15], //columns
            [0,5,10,15],[3,6,9,12], //diagonals
        ];
        for(let combo of winningCombinations){
            const [a,b,c,d]= combo;
            if(moves[a] && moves[a] === moves[b] && moves[a] === moves[c] && moves[a] === moves[d]){
                return moves[a];
            }
        }
        return moves.every(cell => cell!== null)? 'draw' : null;
    }

    useEffect(()=>{
        const result = checkwinner(moves);
        if(result){
            setwinner(result);
        }
    },[moves]);

    return(
        <div>
            <div className="flex justify-center">
            <h1 className="text-white">4 x 4</h1>
            </div>
            {winner && (<div className="flex justify-center mt-4">
                    <h2 className="text-white">
                        {winner === 'draw' ? <Alert variant="filled" severity="warning" icon={false} >
                        It's a draw!
                            </Alert> : <Alert variant="filled" severity="success" icon={false}>
                        {`Winner: ${winner}`}</Alert>}
                        {winner && (
                <button className="rounded-lg m-8 border-2 hover:border-violet-600 bg-fuchsia-700 text-fuchsia-200 bg-opacity-20 shadow-inner"
                    onClick={playAgainButton}>
                    Play Again
                </button>
                )}
                    </h2>
                </div>)}
            <div id="box1" className="flex justify-center">
                {moves.slice(0,4).map((value,index)=>(
                    <div key = {index} className="mt-16 p-16 bg-fuchsia-700  bg-opacity-20 border hover:border-2 text-white" type="button" onClick={()=> handleClick(index)}>{value}</div>
                ))}
            </div>
            <div id="box2" className="flex justify-center">
            {moves.slice(4,8).map((value,index)=>(
                    <div key = {index} className="p-16 bg-fuchsia-700  bg-opacity-20 border hover:border-2 text-white" type="button" onClick={()=> handleClick(index + 4)}>{value}</div>
                ))}
            </div>
            <div id="box3" className="flex justify-center">
            {moves.slice(8,12).map((value,index)=>(
                    <div key = {index} className=" p-16 bg-fuchsia-700  bg-opacity-20 border hover:border-2 text-white" type="button" onClick={()=> handleClick(index + 8)}>{value}</div>
                ))}
                </div>
                <div id="box4" className="flex justify-center">
                {moves.slice(12, 16).map((value, index) => (
                    <div key={index} className=" p-16 bg-fuchsia-700 bg-opacity-20 border hover:border-2 text-white" type="button" onClick={() => handleClick(index + 12)}>{value}</div>
                ))}
            </div>
                <div className="flex justify-center">
                <button className="rounded-lg m-8 border-2 hover:border-violet-600 bg-fuchsia-700 text-fuchsia-200 bg-opacity-20 shadow-inner" onClick={endGameHandler}>
                    End Game
                </button>
            <button className="rounded-lg m-8 border-2 hover:border-violet-600 bg-fuchsia-700 text-fuchsia-200 bg-opacity-20 shadow-inner"
                    onClick={togglePaused}>
                    {isPaused ? 'Resume Game' : 'Pause Game'}
                </button>
                
            </div>  
            
        </div>
    )
}