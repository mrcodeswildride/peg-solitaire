var rows = document.querySelectorAll(".row");
var holes = document.querySelectorAll(".hole");
var messageDisplay = document.getElementById("message");

var gameInProgress = true;
var pegSelected = null;

for (var i = 0; i < holes.length; i++) {
    holes[i].addEventListener("click", clickHole);
}

function clickHole() {
    if (gameInProgress) {
        if (!pegSelected) {
            if (this.classList.contains("peg")) {
                this.classList.add("selected");
                pegSelected = this;
            }
        }
        else {
            if (this == pegSelected) {
                pegSelected.classList.remove("selected");
                pegSelected = null;
            }
            else if (this.classList.contains("peg")) {
                pegSelected.classList.remove("selected");

                this.classList.add("selected");
                pegSelected = this;
            }
            else {
                if (isTwoAway(this)) {
                    var middle = getMiddle(this);

                    if (middle.classList.contains("peg")) {
                        pegSelected.classList.remove("selected");
                        pegSelected.classList.remove("peg");
                        pegSelected = null;

                        middle.classList.remove("peg");
                        this.classList.add("peg");

                        if (isWin()) {
                            gameInProgress = false;
                            messageDisplay.innerHTML = "Good job!";
                        }
                    }
                }
            }
        }
    }
}

function isTwoAway(hole) {
    var pegX = parseInt(pegSelected.getAttribute("index"), 10);
    var pegY = parseInt(pegSelected.parentElement.getAttribute("index"), 10);

    var holeX = parseInt(hole.getAttribute("index"), 10);
    var holeY = parseInt(hole.parentElement.getAttribute("index"), 10);

    return (pegX == holeX && Math.abs(pegY - holeY) == 2) || (pegY == holeY && Math.abs(pegX - holeX) == 2);
}

function getMiddle(hole) {
    var pegX = parseInt(pegSelected.getAttribute("index"), 10);
    var pegY = parseInt(pegSelected.parentElement.getAttribute("index"), 10);

    var holeX = parseInt(hole.getAttribute("index"), 10);
    var holeY = parseInt(hole.parentElement.getAttribute("index"), 10);

    if (pegX == holeX) {
        if (pegY < holeY) {
            return rows[pegY + 1].querySelectorAll("div")[pegX];
        }
        else {
            return rows[pegY - 1].querySelectorAll("div")[pegX];
        }
    }
    else {
        if (pegX < holeX) {
            return rows[pegY].querySelectorAll("div")[pegX + 1];
        }
        else {
            return rows[pegY].querySelectorAll("div")[pegX - 1];
        }
    }
}

function isWin() {
    for (var i = 0; i < holes.length; i++) {
        if (i == 16) {
            if (!holes[i].classList.contains("peg")) {
                return false;
            }
        }
        else {
            if (holes[i].classList.contains("peg")) {
                return false;
            }
        }

    }

    return true;
}
