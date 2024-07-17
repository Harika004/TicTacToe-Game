import React from 'react';
import "../Styling/Rules.css";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';

export default function Rules(){
    const navigate = useNavigate();
    const [clickedButton, setClickedButton] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(()=>{
        let timer;
        if(showAlert){
            timer = setTimeout(()=>{
                setShowAlert(false);
            },3000);
        }
        return ()=> clearTimeout(timer);
    })
    const buttonHandler3x3= ()=>{
        if (!clickedButton) {
            setShowAlert(true);
            return;
        }
        navigate(`/box3x3/${clickedButton}`);
    }
    const buttonHandler4x4= ()=>{
        if (!clickedButton) {
            setShowAlert(true);
            return;
        }
        navigate(`/box4x4/${clickedButton}`);
    }
    const buttonHandler5x5= ()=>{
        if (!clickedButton) {
            setShowAlert(true);
            return;
        }
        navigate(`/box5x5/${clickedButton}`);
    }
    const handleClick = (button)=>{
        setClickedButton(button);
        setShowAlert(false);
    }

    
    return(
        <>
        <div >
        <h1 className='font-sans text-violet-500'>Rules Of The Game</h1>
        <ol className='list-decimal text-2xl'>
            <li className='break-words my-12 text-fuchsia-200 '>&nbsp; The game is played on a grid that's 3 squares by 3 squares. You can defaultly select your grid to play</li>
            <li className='break-words my-12 text-fuchsia-200'>&nbsp; You are X , your friend is O . Players take turns putting their marks in empty squares.</li>
            <li className='break-words my-12 text-fuchsia-200'>&nbsp; The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.</li>
            <li className='break-words my-12 text-fuchsia-200'> &nbsp;  When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.</li>
        </ol>
        
<form>
        <h3 className='text-white text-xl mt-4'>Choose for the Player 1 </h3>
    <div className="flex justify-center">
        <div className= {`m-12 p-16 bg-fuchsia-700  bg-opacity-40 border-4  text-fuchsia-200 hover:underline ${clickedButton==='X' ? 'border-violet-600' : ''}`} type="button" onClick={()=>handleClick('X')}required>X</div>
        <div className={`m-12 p-16 bg-fuchsia-700  bg-opacity-40 border-4  text-fuchsia-200 hover:underline ${clickedButton==='O' ? 'border-violet-600' : ''}`} type="button" onClick={()=>handleClick('O')}required>O</div>

    </div>
    {showAlert && (
            <Alert variant="filled" severity="error">
                Please select either X or O before proceeding.
            </Alert>
        )}
</form>

        
    <button className='rounded-lg m-3 border-2 hover:border-violet-600  bg-fuchsia-700 text-fuchsia-200 bg-opacity-20 shadow-inner' onClick={buttonHandler3x3}>3 x 3</button>
    <button className='rounded-lg m-3 border-2 hover:border-violet-600 bg-fuchsia-700 text-fuchsia-200 bg-opacity-20 shadow-inner' onClick={buttonHandler4x4}>4 x 4</button>
    <button className='rounded-lg m-3 border-2 hover:border-violet-600 bg-fuchsia-700 text-fuchsia-200 bg-opacity-20 shadow-inner' onClick={buttonHandler5x5}>5 x 5</button>
    </div>
       
        </>
    )
}