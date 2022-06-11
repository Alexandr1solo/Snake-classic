
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png"

const foodImg = new Image();
foodImg.src = "img/food.png"

let box = 32;                                                                             // размер одного квадрата на поле

let score = 0;

let food = {
    x: Math.floor((Math.random() * 18 + 2)) * box,                                       // от единицы до 17 по клеткам платформы
    y: Math.floor((Math.random() * 15 + 2)) * box,
};

let snake = [];
snake[0] = {
    x: 10 * box,
    y: 9 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {                                                               // коды клавиш на клавиатуры
    if(event.keyCode == 37 && dir !="right") 
        dir = "left";  
                            
    else if(event.keyCode == 38 && dir !="down")
        dir = "up";

    else if(event.keyCode == 39 && dir !="left")
        dir = "right";

    else if(event.keyCode == 40 && dir !="up")
        dir = "down";
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(game);
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for(let i = 0; i < snake.length; i++) {                                             // сама змейка
        ctx.fillStyle = i == 0 ? "blue" : "red";                                        // изменение цвета тела при поедании
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 10.5, box * 1.4);                                         // позиция счётчика

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {                                                                        // поедание еды
            x: Math.floor((Math.random() * 18 + 2)) * box,
            y: Math.floor((Math.random() * 15 + 2)) * box,
        };
    } else {
        snake.pop();
    }

    if(snakeX < box * 2 || snakeX > box * 19
        || snakeY < 2 * box || snakeY > box * 16)                                       // останавливаем игру при выход за рамки игрового поля
        clearInterval(game);

    if(dir == "left") snakeX -= box;                                                    // проверка некая
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);
