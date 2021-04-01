var balloon, balloonImage1, balloonImage2;
// create database and position variable here

var database, position, balloonPosition;

function preload() {
    bg = loadImage("cityImage.png");
    balloonImage1 = loadAnimation("hotairballoon1.png");
    balloonImage2 = loadAnimation("hotairballoon1.png", "hotairballoon1.png",
        "hotairballoon1.png", "hotairballoon2.png", "hotairballoon2.png",
        "hotairballoon2.png", "hotairballoon3.png", "hotairballoon3.png", "hotairballoon3.png");
}

//Function to set initial environment
function setup() {
    createCanvas(1500, 700);

    database = firebase.database();

    balloon = createSprite(250, 450, 150, 150);
    balloon.addAnimation("hotAirBalloon", balloonImage1);
    balloon.scale = 0.5;

    balloonPosition = database.ref("balloon/position");
    balloonPosition.on("value", readPosition, showError);

    textSize(20);
}

// function to display UI
function draw() {
    background(bg);

    if (keyDown(LEFT_ARROW)) {
        updatePosition(-10, 0);
        balloon.addAnimation("hotAirBalloon", balloonImage2);

    } else if (keyDown(RIGHT_ARROW)) {
        updatePosition(+10, 0);
        balloon.addAnimation("hotAirBalloon", balloonImage2);

    } else if (keyDown(UP_ARROW)) {
        updatePosition(0, -10);
        balloon.addAnimation("hotAirBalloon", balloonImage2);
        balloon.scale -= 0.01;

    } else if (keyDown(DOWN_ARROW)) {
        updatePosition(0, +10);
        balloon.addAnimation("hotAirBalloon", balloonImage2);
        balloon.scale += 0.01;
    }

    drawSprites();
    fill(0);
    stroke("white");
    textSize(25);
    text("**Use arrow keys to move Hot Air Balloon!", 40, 40);
}

function readPosition(data) {
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function updatePosition(x, y) {
    database.ref("balloon/position").set({
        "x": x + position.x,
        "y": y + position.y
    });
}

function showError() {
    console.log("Error in writing to Database");
}
