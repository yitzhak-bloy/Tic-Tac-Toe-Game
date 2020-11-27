import { useState } from 'react';
import Box from '@material-ui/core/Box';

import Board from '../components/Board';
import SelectPlayer from '../components/SelectPlayer';
import SelectLevel from '../components/SelectLevel'
import { PlayerContext } from '../shared/context/Player-context';
import { DifficultyLevelContext } from '../shared/context/DifficultyLevel-context';
import { GameRunning } from '../shared/context/GameRunning-context';
import './GameBoard.css';
import { Grid } from '@material-ui/core';

const GameBoard = () => {
  const [huPlayer ,setHuPlayer] = useState('X');
  const [aiPlayer ,setaiPlayer] = useState('O');
  const [level, setLevel] = useState('hard');
  const [gameRunning, setGameRunning] = useState(false)
  
  return (
    <GameRunning.Provider value={{  
      gameRunning: gameRunning,
      gameChange: (state) => {setGameRunning(state)}
    }}> 
    <PlayerContext.Provider value={{  
      huPlayer: huPlayer,
      aiPlayer: aiPlayer,
      playerChange: (player) => {
        setHuPlayer(player) 
        setaiPlayer(player === "X" ? "O": "X" )
      } 
    }}> 
    <DifficultyLevelContext.Provider value={{  
      difficultyLevel: level,
      difficultyChange: (level) => {
        setLevel(level === "hard" ? "easy" : "hard")
      }
    }}>
      <Box className="GameBoard">
        <Grid container  justify="space-evenly"  >
          <Grid item  >
            <SelectLevel />
          </Grid>
          <Grid item>
            <SelectPlayer />
          </Grid>
        </Grid>
        <Board />
      </Box >  
    </DifficultyLevelContext.Provider>
    </PlayerContext.Provider>
    </GameRunning.Provider>
  );
}

export default GameBoard;
