
const grid = document.querySelector(".bolls");
const startButton = document.getElementById("start-btn")
const imageButton = document.getElementById("btnImg")
const sco = document.getElementById("score")
// Select total count
const totalCount = document.getElementById("total-count");
// Variable to track count
let timer;
var score = 0;
let levelcounter = 1;

// Display initial count value
totalCount.innerHTML = levelcounter;

let circle = Array.from(document.querySelectorAll('.bolls div'));
let count = 0;
let index = 0;
const width = 3;

currentPosition = 1;
const colors_array = ["yellow", "pink", "red", "skyblue"];
let random = Math.floor(Math.random() * colors_array.length)
let currentcircle = colors_array[random];

function colorcreate() {
    // circle[currentPosition + index].style.background = currentcircle;
    circle[currentPosition + index].classList.add(currentcircle);
}
colorcreate();

// erase
function erase() {
    // circle[currentPosition + index].style.background = '';
    circle[currentPosition + index].classList.remove(currentcircle)
}
function moveDown() {
    erase()
    currentPosition += width;
    colorcreate();
    stop();
}
function countTheLevel() {
    var level_speed = parseInt((document.getElementById('total-count').innerHTML));
    if (timer) {
        clearInterval(timer);
    }
    if (level_speed == 1) {
        timer = setInterval(moveDown, 2000);
    }else if (level_speed == 2) {
        timer = setInterval(moveDown, 1500);
    }else if (level_speed == 3) {
        timer = setInterval(moveDown, 1000);
    }else if (level_speed == 4) {
        timer = setInterval(moveDown, 800);
    }else if (level_speed == 5) {
        timer = setInterval(moveDown, 500);
    }else if (level_speed == 6) {
        timer = setInterval(moveDown, 200);
    }else if (level_speed == 7) {
        timer = setInterval(moveDown, 100);
    }
}
countTheLevel();

// stop function

function stop() {
    if (circle[currentPosition + index + width].classList.contains("freeze")) {
        circle[currentPosition + index].classList.add("freeze")
        // start a new shape falling
        random = Math.floor(Math.random() * colors_array.length)
        currentcircle = colors_array[random];
        currentPosition = 1;
        colorcreate();
        gameover();
        addScore();
    }
}


function control(e) {
    if (e.keyCode === 37) {
        moveLeft();
    } else if (e.keyCode === 39) {
        moveRight();
    } else if (e.keyCode === 40) {
        moveDown();
    }
}
window.addEventListener("keydown", control)
function moveLeft() {
    erase();
    let leftBlockage = ((currentPosition + index) % width === 0);
    let blockage = circle[currentPosition + index - 1].classList.contains('freeze');
    if (!leftBlockage && !blockage) {
        currentPosition--;
    }
    colorcreate();
}
function moveRight() {
    erase();
    let RightBlockage = ((currentPosition + index) % width === width - 1);
    let blockage = circle[currentPosition + index + 1].classList.contains('freeze');
    if (!RightBlockage && !blockage) {
        currentPosition++;
    }
    colorcreate();
}
function pause() {
    if (timer) {
        clearInterval(timer)
        timer = null;
        imageButton.src = 'play.png'
    }
    else {
        colorcreate()
        timer = setInterval(moveDown, 1000);
        imageButton.src = 'pause.png'
    }
}
startButton.addEventListener("click", pause);

// below buttons
const left = document.getElementById("left");
const bottom = document.getElementById("bottom");
const right = document.getElementById("right");

left.addEventListener("click", moveLeft);
right.addEventListener("click", moveRight);
bottom.addEventListener("click", moveDown);

//game over 
function gameover() {
    
     const rowOver = [3,4,5];
     if (rowOver.some(index => circle[index].classList.contains("freeze"))){
        console.log("yess");
        sco.innerHTML = "Game Over";
        clearInterval(timer);
        alert(`game over Your score is:: ${score}`);

     }

    
    
    // if (circle[currentPosition + width ].classList.contains("freeze")) {
    //     sco.innerHTML = "Game Over";
    //     clearInterval(timer);
    //     alert(`game over Your score is:: ${score}`);
    //  }
}

// addscore and bolls  disappear
function addScore() {
    for (let i = 0; i < 27; i += width) {
        const row = [i, i + 1, i + 2];
        colors_array.forEach(function(item) {
            if (row.every(index => circle[index].classList.contains(item))) {
                score += 10;
                sco.textContent = `score:${score}`
                row.forEach(index => {
                    circle[index].classList.remove("freeze");
                    circle[index].classList.remove(item);
                    circle[index].style.background = '';
                })
                const circleRemoved = circle.splice(i, width);
                console.log(circleRemoved);
                circle = circleRemoved.concat(circle);
                circle.forEach(circles => grid.appendChild(circles))
            }
        });
}
    for (let i = 0; i < 21; i++) {
        const column = [i, i + width, i + (width * 2)];
        colors_array.forEach(function(item) {
            if (column.every(index => circle[index].classList.contains(item))) {
                score += 10;
                sco.textContent = `score:${score}`
                column.forEach(index => {
                    circle[index].classList.remove("freeze");
                    circle[index].classList.remove(item);
                    circle[index].style.background = '';
                    })
                }
            });
        }
    }
       
// level 
// Function to Increment count
const handleIncrement = () => {
    if (levelcounter > 6) {
        levelcounter = 6;
    }
    levelcounter++;
    totalCount.innerHTML = levelcounter;

};
// Function to decrement count
const handleDecrement = () => {

    levelcounter--;
    if (levelcounter < 1) {
        levelcounter = 1;
    }
    totalCount.innerHTML = levelcounter;
};
const incrementCount = document.getElementById("increment-count");
const decrementCount = document.getElementById("decrement-count");

incrementCount.addEventListener("click", handleIncrement);
decrementCount.addEventListener("click", handleDecrement);


