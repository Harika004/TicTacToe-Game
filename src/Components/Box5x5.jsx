import "../Styling/Box.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Alert from '@mui/material/Alert';
export default function Box5x5(){
    const navigate = useNavigate();
    const {initialPlayer} = useParams();
    const [moves,setmoves] = useState(Array(25).fill(null));
    const [winner, setwinner] = useState(null);
    const [currPlayer, setcurrPlayer] = useState(null);
    const [isPaused,setisPaused] = useState(false);
    const endGameHandler= ()=>{
        navigate('/');
    } 
    const handleClick= (index)=>{
        if(!moves[index] && !winner && !isPaused){
            const newmoves = [...moves];
            newmoves[index] = currPlayer;
            setmoves(newmoves);
            setcurrPlayer(currPlayer === 'X'? 'O' : 'X');
        }
    }
    const playAgainButton = ()=>{
        setmoves(Array(25).fill(null));
        setwinner(null);
        setisPaused(false);
        setcurrPlayer(initialPlayer);
    };

    const togglePaused = ()=>{
        setisPaused(!isPaused);
    };

    const checkwinner = ()=>{
        const winningCombinations = [
            [0,1,2,3,4], [5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24], //rows
            [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24], //columns
            [0,6,12,18,24],[4,8,12,16,20], //diagonals
        ]
        for(let combo of winningCombinations){
            const [a,b,c,d,e] = combo;
            if(moves[a] && moves[a]===moves[b] && moves===moves[c] && moves[d]===moves[e]){
                return moves[a];
            }
        }
        return moves.every(cell=> cell !== null)? 'draw' : null;
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
            <h1 className="text-white">5 x 5</h1>
            </div>
            {winner && (<div className="flex justify-center mt-4">
                    <h2 className="text-white text-center">
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
                {moves.slice(0,5).map((value,index)=>(
                    <div key ={index} className="mt-16 p-12 bg-fuchsia-700  bg-opacity-20 border hover:border-2 text-white" type="button" onClick={()=>handleClick(index)}>{value}</div>
                ))}
            </div>
            <div id="box2" className="flex justify-center">
            {moves.slice(5,10).map((value,index)=>(
                    <div key ={index} className=" p-12 bg-fuchsia-700  bg-opacity-20 border hover:border-2 text-white" type="button" onClick={()=>handleClick(index + 5)}>{value}</div>
                ))}
            </div>
            <div id="box3" className="flex justify-center">
            {moves.slice(10,15).map((value,index)=>(
                    <div key ={index} className=" p-12 bg-fuchsia-700  bg-opacity-20 border hover:border-2 text-white" type="button" onClick={()=>handleClick(index + 10)}>{value}</div>
                ))}  
            </div>

            <div id="box4" className="flex justify-center">
            {moves.slice(15,20).map((value,index)=>(
                    <div key ={index} className=" p-12 bg-fuchsia-700  bg-opacity-20 border hover:border-2 text-white" type="button" onClick={()=>handleClick(index + 15)}>{value}</div>
                ))}  
            </div>
            <div id="box5" className="flex justify-center">
            {moves.slice(20,25).map((value,index)=>(
                    <div key ={index} className=" p-12 bg-fuchsia-700  bg-opacity-20 border hover:border-2 text-white" type="button" onClick={()=>handleClick(index + 20)}>{value}</div>
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