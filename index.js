class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}


class GameBoard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.hits = [];
  }

  placeShip(ship, coordinates) {
    this.ships.push({ ship, coordinates });
  }

  attack(position) {
    
    if (
      this.hits.some(p => p[0] === position[0] && p[1] === position[1]) ||
      this.missedAttacks.some(p => p[0] === position[0] && p[1] === position[1])
    ) {
      return "invalid";
    }

    for (let obj of this.ships) {
      for (let coord of obj.coordinates) {
        if (coord[0] === position[0] && coord[1] === position[1]) {
          obj.ship.hit();
          this.hits.push(position);
          return "hit";
        }
      }
    }

    this.missedAttacks.push(position);
    return "miss";
  }

  allShipsSunk() {
    return this.ships.every(obj => obj.ship.isSunk());
  }
}


class Player {
  constructor(type) {
    this.type = type; 
    this.gameboard = new GameBoard();
  }
}


class Game {
  constructor() {
    this.player = new Player("human");
    this.computer = new Player("computer");
    this.currentPlayer = this.player;
    this.gameOver = false;
  }

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === this.player
        ? this.computer
        : this.player;
  }

  playTurn(position) {
    if (this.gameOver) return "game over";

    const enemy =
      this.currentPlayer === this.player
        ? this.computer
        : this.player;

    const result = enemy.gameboard.attack(position);

    if (result === "invalid") return "invalid";

    if (enemy.gameboard.allShipsSunk()) {
      this.gameOver = true;
      return `${this.currentPlayer.type} wins`;
    }

    this.switchTurn();
    return result;
  }
}


const game = new Game();
const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");
const status = document.getElementById("status");

const size = 5;


game.player.gameboard.placeShip(new Ship(2), [[0, 0], [0, 1]]);
game.computer.gameboard.placeShip(new Ship(2), [[2, 2], [2, 3]]);


function createBoard(boardEl, isComputer) {
  boardEl.innerHTML = "";

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      
      if (!isComputer) {
        for (let obj of game.player.gameboard.ships) {
          obj.coordinates.forEach(c => {
            if (c[0] === x && c[1] === y) {
              cell.classList.add("ship");
            }
          });
        }

       
        if (game.player.gameboard.hits.some(p => p[0] === x && p[1] === y)) {
          cell.classList.add("hit");
        }
        if (
          game.player.gameboard.missedAttacks.some(
            p => p[0] === x && p[1] === y
          )
        ) {
          cell.classList.add("miss");
        }
      }

      if (isComputer) {
        cell.addEventListener("click", () => playerAttack(x, y, cell));
      }

      boardEl.appendChild(cell);
    }
  }
}

function playerAttack(x, y, cell) {
  if (game.gameOver) return;

  const result = game.playTurn([x, y]);

  if (result === "hit" || result === "miss") {
    cell.classList.add(result);
  }

  if (result.includes("wins")) {
    status.textContent = result;
    return;
  }

  if (result === "invalid") return;

  computerAttack();
}

function computerAttack() {
  if (game.gameOver) return;

  let x, y;
  do {
    x = Math.floor(Math.random() * size);
    y = Math.floor(Math.random() * size);
  } while (
    game.player.gameboard.hits.some(p => p[0] === x && p[1] === y) ||
    game.player.gameboard.missedAttacks.some(p => p[0] === x && p[1] === y)
  );

  const result = game.playTurn([x, y]);
  updatePlayerBoard();

  if (result.includes("wins")) {
    status.textContent = result;
  }
}

function updatePlayerBoard() {
  createBoard(playerBoard, false);
}


createBoard(playerBoard, false);
createBoard(computerBoard, true);
