function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }
    const getBoard = () => board;
    const updateBoard = (marker, row, column) => {
        let cellValue = board[row][column].getValue();
        if(cellValue !== ''){
            return;
        }
        board[row][column].addMaker(marker);
    }

    const printBoard = () => {

        let b = board.map(row => row.map(cell => cell.getValue()));
        return b;

    }

    return {
        printBoard,
        updateBoard,
        getBoard
    }

};

function Cell(){
    let value = '';

    const addMaker = (playerMarker) => {
        value = playerMarker;
    };
    const getValue = () => value;

return {
    addMaker,
    getValue
}

};

const player = (name, marker) =>{
    return {name, marker};
}

function GameController(player1, player2){

    const board = Gameboard();

    let activePlayer = player1;

    function switchTurn(){
        activePlayer = activePlayer === player1 ? player2 : player1;
    }
    const getActiviePlayer = () => activePlayer;

    const checkWinner = () => {
        for(let i = 0; i < 3; i++){
            for (let j = 0; j < 1; j++){
                if((board.getBoard()[i][j].getValue() === board.getBoard()[i][j+1].getValue()) &&  (board.getBoard()[i][j+1].getValue()=== board.getBoard()[i][j+2].getValue()) && board.getBoard()[i][j].getValue() !== "" ){
                    return true;
                }
                else if((board.getBoard()[j][i].getValue() === board.getBoard()[j+1][i].getValue()) &&  (board.getBoard()[j+1][i].getValue()=== board.getBoard()[j+2][i].getValue()) && board.getBoard()[j][i].getValue() !== ""){
                    return true;
                }else if((board.getBoard()[0][0].getValue() === board.getBoard()[1][1].getValue()) &&  (board.getBoard()[1][1].getValue()=== board.getBoard()[2][2].getValue()) && board.getBoard()[0][0].getValue() !== ""){
                    return true;
                }else if((board.getBoard()[0][2].getValue() === board.getBoard()[1][1].getValue()) &&  (board.getBoard()[1][1].getValue()=== board.getBoard()[2][0].getValue()) && board.getBoard()[0][2].getValue() !== ""){
                    return true;
                }
              }
            }
            return false;
        }

    const playTurn = (row, col) => {
        let oldBoard = board.printBoard().toString();
        board.updateBoard(getActiviePlayer().marker, row, col);
        let newBoard = board.printBoard().toString();
        if(oldBoard !== newBoard){ switchTurn();}

    }
    return {
        checkWinner,
        getActiviePlayer,
        switchTurn,
        playTurn,
        getBoard : board.getBoard
    };


}

function ScreenController(){

    let boardContainer = document.querySelector('.board-container')
    let player1 = player('Yesenia', 'X');
    let player2 = player('Lisa', 'O')

    const game = GameController(player1, player2);

    let board = game.getBoard();
    const updateBoard = () =>{
    boardContainer.textContent = '';
    board = game.getBoard();
    board.forEach((row, rowIndex)=> row.forEach((col, colIndex) => {
        const gameButton = document.createElement('button');
        gameButton.dataset.row = rowIndex;
        gameButton.dataset.col = colIndex;
        gameButton.innerHTML = col.getValue();
        boardContainer.appendChild(gameButton);

    }));
    }
    boardContainer.addEventListener('click', (e) => {
        let rows = parseInt(e.target.dataset.row);
        game.playTurn(rows, parseInt(e.target.dataset.col));
        updateBoard();
       if(game.checkWinner()){
        console.log(`${game.getActiviePlayer().name} has won the game`)
        let btns = boardContainer.childNodes;
        btns.forEach(btn => {
            btn.disabled = true;
        })
        }
    })

    updateBoard();

}

ScreenController();
