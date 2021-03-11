import React,{ useState} from 'react';
import Board from './components/Board';
import History from './components/History';
import { calculateWinner } from './helpers';

import './styles/root.scss';

const NEW_GAME = [
  { board: Array(9).fill(null), isXNext : true }
]

function App() {
  const [ history, setHistory ] = useState(NEW_GAME);
  const [ currentMove, setCurrentMove  ] = useState(0);
  const current = history[currentMove];

  const {winner, winningSquare} = calculateWinner(current.board);
  const message = winner 
    ? `Winner is ${winner}`
    : `Next player is ${current.isXNext ? 'X' : 'O'}`;

  const handleSquareClcik = position => {
      if(current.board[position] || winner){
          return;
      }

      setHistory(prev => {
        const last = prev[prev.length - 1];

        const newBoard =  last.board.map((square, pos) => {
              if(pos === position) {
                  return last.isXNext ? 'X' : 'O';
              }
              return square;
          });
          return prev.concat({ board: newBoard, isXNext: !last.isXNext})
      });
      setCurrentMove(prev => prev + 1)
  };
  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGame = () =>{
    setHistory(NEW_GAME)
    setCurrentMove(0)
  }
  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <h1>{ message }</h1>
      <Board board={current.board} handleSquareClcik={handleSquareClcik} winningSquare={winningSquare}/>
      <button type="button" onClick={onNewGame}>Start new game</button>
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
  );
}

export default App;
