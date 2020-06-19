let rows = document.getElementsByClassName(`row`)
let squares = document.getElementsByClassName(`square`)
let messageParagraph = document.getElementById(`messageParagraph`)

let gameOver = false
let selectedSquare

for (let square of squares) {
  square.addEventListener(`click`, clickSquare)
}

function clickSquare() {
  if (!gameOver) {
    if (selectedSquare == null) {
      if (this.classList.contains(`peg`)) {
        selectedSquare = this
        selectedSquare.classList.add(`selected`)
      }
    }
    else if (selectedSquare == this) {
      selectedSquare.classList.remove(`selected`)
      selectedSquare = null
    }
    else if (this.classList.contains(`peg`)) {
      selectedSquare.classList.remove(`selected`)

      selectedSquare = this
      selectedSquare.classList.add(`selected`)
    }
    else if (isTwoAway(this)) {
      let middle = getMiddle(this)

      if (middle.classList.contains(`peg`)) {
        selectedSquare.classList.remove(`selected`, `peg`)
        selectedSquare = null

        middle.classList.remove(`peg`)
        this.classList.add(`peg`)

        if (isSolved()) {
          messageParagraph.innerHTML = `Good job!`
          gameOver = true
        }
      }
    }
  }
}

function isTwoAway(square) {
  let squareTwoLeft = getNeighbor(selectedSquare, -2, 0)
  let squareTwoRight = getNeighbor(selectedSquare, 2, 0)
  let squareTwoAbove = getNeighbor(selectedSquare, 0, -2)
  let squareTwoBelow = getNeighbor(selectedSquare, 0, 2)

  return square == squareTwoLeft || square == squareTwoRight ||
    square == squareTwoAbove || square == squareTwoBelow
}

function getMiddle(square) {
  if (square == getNeighbor(selectedSquare, -2, 0)) {
    return getNeighbor(selectedSquare, -1, 0)
  }
  else if (square == getNeighbor(selectedSquare, 2, 0)) {
    return getNeighbor(selectedSquare, 1, 0)
  }
  else if (square == getNeighbor(selectedSquare, 0, -2)) {
    return getNeighbor(selectedSquare, 0, -1)
  }
  else if (square == getNeighbor(selectedSquare, 0, 2)) {
    return getNeighbor(selectedSquare, 0, 1)
  }
}

function getNeighbor(square, xDiff, yDiff) {
  let row = square.parentElement // row of square
  let y // y coordinate of square, set below
  let x // x coordinate of square, set below

  // loop through rows to determine y
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] == row) {
      y = i // found matching row, so set y
    }
  }

  // loop through squares in row to determine x
  for (let i = 0; i < row.children.length; i++) {
    if (row.children[i] == square) {
      x = i // found matching square, so set x
    }
  }

  // row of neighbor square
  let neighborRow = rows[y + yDiff]

  if (neighborRow == null) {
    // row is beyond edge, so no neighbor square
    return null
  }
  else {
    // if x + xDiff is beyond edge, will be null
    return neighborRow.children[x + xDiff]
  }
}

function isSolved() {
  for (let i = 0; i < squares.length; i++) {
    if (i == 16) {
      if (!squares[i].classList.contains(`peg`)) {
        return false
      }
    }
    else {
      if (squares[i].classList.contains(`peg`)) {
        return false
      }
    }

  }

  return true
}