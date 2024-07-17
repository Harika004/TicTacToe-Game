import "../Styling/Box.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Alert from '@mui/material/Alert';

export default function Box3x3(){
    const {initialPlayer} = useParams();
    const [moves, setmoves] = useState(Array(9).fill(null));
    const [currPlayer, setcurrPlayer] = useState(initialPlayer);
    const [winner,setwinner] = useState(null);
    const [isPaused, setisPaused] = useState(false);
    const navigate = useNavigate();
    const endGameHandler= ()=>{
        navigate('/');
    }

    const handleClick = (index)=>{
        if(!moves[index] && !winner && !isPaused){
            const newmoves = [...moves];
            newmoves[index] = currPlayer;
            setmoves(newmoves);
            setcurrPlayer(currPlayer === 'X' ? 'O' : 'X');
        }
    }; 
    const togglePaused = ()=>{
        setisPaused(!isPaused);
    }

    const playAgainButton = ()=>{
        setmoves(Array(9).fill(null));
        setcurrPlayer(initialPlayer);
        setwinner(null);
        setisPaused(false);
    }

    const checkWinner = (moves)=>{
        const winningCombinations = [
            [0,1,2], [3,4,5],[6,7,8],
            [0,3,4],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]

        ];

        for(let combo of winningCombinations){
            const [a,b,c] = combo;
            if(moves[a] && moves[a] === moves[b] && moves[a] === moves[c]){
                return moves[a];
            }
        }
        return moves.every(cell => cell !== null) ? 'draw' : null;
    };

    useEffect(()=>{
        const result = checkWinner(moves);
        if(result){
            setwinner(result)
        }
    },[moves] )
    
    return(

        <div>
            <div className="flex justify-center ">
            <h1 className="text-white">3 x 3</h1> 
            </div>
            {winner && (
                <div className="flex justify-center mt-4">
                    <h2 className="text-white">
                        {winner === 'draw' ? <Alert variant="filled" severity="warning" icon={false} sx={{ textAlign:'center'}} >
                        It's a draw!
                            </Alert> : <Alert variant="filled" severity="success" icon={false} sx={{
        textAlign: 'center',
      }}>
                        {`Winner: ${winner}`}</Alert>}
                        {winner && (
                <button className="rounded-lg m-8 border-2 hover:border-violet-600 bg-fuchsia-700 text-fuchsia-200 bg-opacity-20 shadow-inner"
                    onClick={playAgainButton}>
                    Play Again
                </button>
                )}
                    </h2>
                </div>
            )}
            
             
            <div id="box1" className="flex justify-center">
            {moves.slice(0, 3).map((value, index) => (
                <div key={index} className="mt-16 p-20 bg-fuchsia-700 bg-opacity-20 border hover:border-2 text-white text-xl" onClick={() => handleClick(index)}>
                    {value}
                </div>
            ))}
        </div>
        <div id="box2" className="flex justify-center">
            {moves.slice(3, 6).map((value, index) => (
                <div key={index} className="p-20 bg-fuchsia-700 bg-opacity-20 border hover:border-2 text-white text-xl" onClick={() => handleClick(index + 3)}>
                    {value}
                </div>
            ))}
        </div>
        <div id="box3" className="flex justify-center">
            {moves.slice(6, 9).map((value, index) => (
                <div key={index} className="p-20 bg-fuchsia-700 bg-opacity-20 border hover:border-2 text-white text-xl" onClick={() => handleClick(index + 6)}>
                    {value}
                </div>
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