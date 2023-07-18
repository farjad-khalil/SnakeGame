// Game Constants

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
musicSound.volume = 0.2;
let speed = 9;
let lastPaintTime = 0;
let score = 0;
let hiscoreval;
let board = document.querySelector(".board");
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 6 };

// funtions
function main(ctime) {
    requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;

    }
    lastPaintTime = ctime;
    gameEngine();
}
// if snake is collide
function isCollide(snakeArr) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }
    if (snakeArr[0].x < 1 || snakeArr[0].x > 18 || snakeArr[0].y < 1 || snakeArr[0].y > 18) {
        return true;
    }
    return false;
}
function gameEngine() {
    //Updating
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press any key to play again...");
        snakeArr = [{ x: 13, y: 15 }]
        score = 0;




    }
    // after eating a food,increament of score and regenrate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hi-score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        // if(score%10===0 && score>9){
        //     speed+=2;
        // }
    }
    // move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y

    // Part 2 : Displaying 
    // Display the snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })
    // Display the FOod
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}

if (score % 2 === 0 && score > 1) {

    speed += 2;
}
//Game logic starts here
// Get the high score display element
const hiscoreBox = document.querySelector(".hiscore");

// Get the high score from local storage
let hiscore = localStorage.getItem('hiscore');

if (hiscore === null) {
    // If no high score is found in local storage, set it to 0
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
} else {
    // If a high score is found, parse it from JSON and assign it to hiscoreval
    hiscoreval = JSON.parse(hiscore);
    // Display the high score
    hiscoreBox.innerHTML = "Hi-score: " + hiscoreval;
}

window.requestAnimationFrame(main);

var btns = document.querySelectorAll(".btn").length;
for (var i = 0; i < btns; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", clicked);
}
function clicked() {
    var buttonPressed = this.innerHTML;
    this.classList.add('class', 'pressed');
    selectMode(buttonPressed);
}
function selectMode(btn) {
    switch (btn) {
        case 'Easy':
            speed = 6;
            medRemove();
            hardRemove();
            break;
        case 'Medium':
            speed = 10;
            easyRemove();
            hardRemove();
            break;
        case 'Hard':
            speed = 13;
            easyRemove();
            medRemove();

            break;

        default:
            break;
    }
}
function easyRemove() {
    document.querySelectorAll(".btn")[0].classList.remove('pressed');
}
function medRemove() {
    document.querySelectorAll(".btn")[1].classList.remove('pressed');
}
function hardRemove() {
    document.querySelectorAll(".btn")[2].classList.remove('pressed');
}


var touchStartX, touchStartY, touchEndX, touchEndY;

document.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
});

document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    var deltaX = touchEndX - touchStartX;
    var deltaY = touchEndY - touchStartY;
    var minSwipeDistance = 50; // Adjust this value for sensitivity

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                // Right swipe
                console.log('Right swipe');
                if (inputDir.x != -1) {

                    inputDir.x = 1;
                    inputDir.y = 0;
                    moveSound.play()
                }
            } else {
                // Left swipe
                console.log('Left swipe');
                if (inputDir.x != 1) {

                    inputDir.x = -1;
                    inputDir.y = 0;
                    moveSound.play()
                }
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                // Down swipe
                console.log('Down swipe');
                if (inputDir.y != -1) {

                    inputDir.x = 0;
                    inputDir.y = 1;
                    moveSound.play()
                }
            } else {
                // Up swipe
                console.log('Up swipe');
                if (inputDir.y != 1) {
                    inputDir.x = 0;
                    inputDir.y = -1;
                    moveSound.play()
                }
            }
        }
    }
}
window.addEventListener("keydown", e => {
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y != 1) {
                inputDir.x = 0;
                inputDir.y = -1;
                moveSound.play()
            }
            break;

        case "ArrowDown":
            if (inputDir.y != -1) {

                inputDir.x = 0;
                inputDir.y = 1;
                moveSound.play()
            }

            break;

        case "ArrowLeft":
            if (inputDir.x != 1) {

                inputDir.x = -1;
                inputDir.y = 0;
                moveSound.play()
            }

            break;

        case "ArrowRight":
            if (inputDir.x != -1) {

                inputDir.x = 1;
                inputDir.y = 0;
                moveSound.play()
            }

            break;

        default:
            break;
    }
})