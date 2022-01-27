import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';

function App() {
  const [wordGrid, setWordGrid] = useState([]);
  const [currentFocusedRow, setCurrentFocusedRow] = useState(0);
  const [IsGameOver, setIsGameOver] = useState(false);
  const solution = "perpendicular";

  useEffect(() => {
    function initializeWordGrid() {
      let newWordGrid = [];
      for (let i = 0; i < 6; i++) {
        newWordGrid.push([])
      }

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
          newWordGrid[i].push({letter: "", state: "empty"}); // states: 'correct', 'wrongposition', 'incorrect', 'empty'
        }
      }

      setWordGrid(newWordGrid);
    } 

    if (wordGrid.length === 0) {
      initializeWordGrid();
    }
  });

  const handleChange = (e, row, column) => {
    const newWordGrid = [...wordGrid]
    newWordGrid[row][column].letter = e.target.value;
    setWordGrid(newWordGrid);
  };

  const handleSubmit = () => {
    const newWordGrid = [...wordGrid]
    const currentWord = newWordGrid[currentFocusedRow];
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i].letter === solution[i]) {
        currentWord[i].state = "correct";
      } else if (solution.includes(currentWord[i].letter)) {
        currentWord[i].state = "wrongposition";
      } else {
        currentWord[i].state = "incorrect";
      }
    }

    let isCorrect = true;
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i].state !== "correct") {
        isCorrect = false;
        setCurrentFocusedRow(currentFocusedRow + 1);
      }
    }
    setIsGameOver(isCorrect)
  };

  return (
    <Div>
      {IsGameOver && <div>Game Over</div>}
      {wordGrid.map((row, rowIndex) => (
        <RowWrapper key={rowIndex}>
          {row.map((col, colIndex) => (
            <Letter
              status={col.state}
              key={colIndex}
              value={wordGrid[rowIndex][colIndex].letter}
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
            />
          ))}
        </RowWrapper>
      ))}
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Letter = styled.input`
  font-size: 56px;
  background-color: ${(props) => {
    if (props.status === 'correct') {
      return "green";
    } else if (props.status === "wrongposition") {
      return "yellow";
    } else if (props.status === "incorrect") {
      return "red";
    } else if (props.status === "empty") {
      return "grey";
    }
  }};
  padding: 8px;
  width: 40px;
  height; 40px;
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const SubmitButton = styled.button`
  color: white;
  font-size: 24px;
  border-radius: 8px;
  background-color: blue;
  padding: 12px;
`;

export default App;
