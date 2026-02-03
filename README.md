# Battleship

A minimal implementation of the classic Battleship game built using JavaScript, with the primary focus on pure game logic rather than UI or styling.


  🎯 Project Goals

 Focus on core game logic instead of visuals
 Practice OOP concepts (classes, encapsulation, responsibilities)
 Implement turn-based game flow
 Prepare logic that can later be reused in a React UI



 🧠 Core Concepts Implemented

* Ships with hit tracking and sunk status
* GameBoard to manage ships, hits, and missed attacks
* Turn-based gameplay between human and computer
* Win condition checking
* Input validation (no duplicate attacks)



## 🏗️ Architecture Overview

### `Ship`

Represents a ship with:

* Length
* Hit count
* Logic to determine when it’s sunk

### `GameBoard`

Handles:

* Ship placement
* Attacks
* Tracking hits and misses
* Checking if all ships are sunk

### `Player`

Represents either a **human** or **computer** player, each with their own board.

### `Game`

Controls:

* Turn switching
* Game state
* Win condition
* Communication between players



##  Gameplay Rules

* Grid size: **5×5**
* Each player has **one ship of length 2**
* Players take turns attacking coordinates
* Re-attacking the same cell is invalid
* First player to sink all enemy ships wins



## 🖥️ UI

* Very minimal DOM-based UI
* Click-based attacks on the computer board
* Visual indicators for:

  * Ships
  * Hits
  * Misses
* UI exists only to **support testing the logic**





## Future Improvements

* Random ship placement
* Smarter computer AI
* Multiple ships
* Game reset functionality
* Rewrite UI using **React**
* Add tests with **Jest**



##  What I Learned

* Designing clean, testable game logic
* Separating logic from UI
* Managing state in a turn-based game
* Preparing code for future React integration



