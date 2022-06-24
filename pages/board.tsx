import { useState } from "react";

type Tile = "cross" | "circle" | "empty";
type Position = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type Board = { [position in Position]: Tile };
type Player = { [player in "Player 1" | "Player 2"]: "cross" | "circle" };

export default function Board() {
  const initialBoard: Board = {
    "1": "empty",
    "2": "empty",
    "3": "empty",
    "4": "empty",
    "5": "empty",
    "6": "empty",
    "7": "empty",
    "8": "empty",
    "9": "empty",
  };

  const [board, setBoard] = useState<Board>(initialBoard);

  const [currentPlayer, setCurrentPlayer] = useState<"Player 1" | "Player 2">(
    "Player 1"
  );

  const [winnerTheme, setWinnerTheme] = useState("");

  const players: Player = { "Player 1": "cross", "Player 2": "circle" };

  const winningTrio: Position[][] = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
  ];

  const hasWinningTrio = (newBoard: Board) => {
    for (let i = 0; i < winningTrio.length; i++) {
      const tileIndex = winningTrio[i];
      if (newBoard[tileIndex[0]] === "empty") continue;

      if (
        newBoard[tileIndex[0]] === newBoard[tileIndex[1]] &&
        newBoard[tileIndex[1]] === newBoard[tileIndex[2]]
      )
        return true;
    }
    return false;
  };

  const playerMove = ({
    position,
    currentPlayer,
    symbol,
  }: {
    position: Position;
    currentPlayer: "Player 1" | "Player 2";
    symbol: Tile;
  }) => {
    if (symbol === "empty") {
      const newBoard = { ...board, [position]: players[currentPlayer] };

      if (hasWinningTrio(newBoard)) {
        setBoard(newBoard);
        setWinnerTheme(currentPlayer);
        setTimeout(() => {
          confirm(`${currentPlayer} wins! Play again?`);
          setBoard(initialBoard);
          setWinnerTheme("");
          setCurrentPlayer("Player 1");
        }, 100);
      } else if (!Object.entries(newBoard).flat(1).includes("empty")) {
        setBoard(newBoard);
        setTimeout(() => {
          confirm("It's a tie! Play again?");
          setBoard(initialBoard);
          setCurrentPlayer("Player 1");
        }, 100);
      } else {
        setBoard(newBoard);
        setCurrentPlayer(
          currentPlayer === "Player 1" ? "Player 2" : "Player 1"
        );
      }
    }
  };

  console.log(board);

  return (
    <div
      className={
        winnerTheme === "Player 1"
          ? "cross-theme"
          : winnerTheme === "Player 2"
          ? "circle-theme"
          : ""
      }
    >
      <div className="outer-container">
        <div className="header">
          It&apos;s your turn,{" "}
          <span
            className={
              currentPlayer === "Player 1"
                ? "cross-text"
                : currentPlayer === "Player 2"
                ? "circle-text"
                : ""
            }
          >
            {currentPlayer}
          </span>
          !
        </div>
        <div className="grid-container">
          {Object.entries(board).map(([pos, symbol]) => {
            const position = pos as Position;
            return (
              <div
                key={position}
                className={
                  symbol === "cross"
                    ? "cross-theme"
                    : symbol === "circle"
                    ? "circle-theme"
                    : ""
                }
                onClick={() => playerMove({ position, currentPlayer, symbol })}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
