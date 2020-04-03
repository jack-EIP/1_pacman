/***************************************
Var:            map
Description:    map matrix
                1 = wall
                2 = coin
                3 = pacman
                4 = ghost1
                5 = background
****************************************/
var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],
    [1,2,1,1,1,2,2,1,2,2,1,1,1,2,1],
    [1,2,1,2,2,2,2,2,2,2,2,2,1,2,1],
    [1,2,2,2,1,1,1,3,1,1,1,2,2,2,1],
    [1,2,1,2,2,2,2,2,2,2,2,2,1,2,1],
    [1,2,1,1,1,2,2,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,1,2,2,2,2,2,4,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

/***************************************
Var:            pacMan
Description:    Pacman's orgin position
****************************************/
var pacMan = {
    x: 7,
    y: 4   
}

/***************************************
Var:            ghost1
Description:    ghost1's orgin position
****************************************/
var ghost1 = {
    x: 13,
    y: 7
}

/***************************************
function:       drawMap()
Param:          none
Description:    draw a map following to map maxtrix
****************************************/
function drawMap() {
    // 1 = wall
    // 2 = coin
    // 3 = pacman
    // 4 = ghost
    // 5 = back ground

    document.getElementById('world').innerHTML = ""; // delete the old world

    for(var y = 0; y < map.length; y = y + 1) // draw one by one character in matrx
    {
        for (var x = 0; x < map[y].length; x = x + 1)
        {
            if (map[y][x] === 1)
                document.getElementById('world').innerHTML += "<div class='wall'></div>";
            else if (map[y][x] === 2)
                document.getElementById('world').innerHTML += "<div class='coin'></div>";
            else if (map[y][x] === 3)
                document.getElementById('world').innerHTML += "<div class='pacman'></div>";
            else if (map[y][x] === 4)
                document.getElementById('world').innerHTML += "<div class='ghost1'></div>";
            else if (map[y][x] === 5)
                document.getElementById('world').innerHTML += "<div class='bg'></div>";  
        }

        document.getElementById("world").innerHTML += "<br>";
    }
}

/***************************************
function:       getRandomNumber
Param:          min: smallest integer
                max: biggest integer
Description:    get a random number between [min, max]    
****************************************/
function getRandomNumber(min,max) {
    return x = Math.floor(Math.random()*(max-min+1) + 1)
}

/***************************************
function:       ghostMove
Param:          none
Description:    create random movemet for ghost
****************************************/
function ghostMove() {
    var dicrection = getRandomNumber(1,4) // random ghost's movement - 1 = up, 2 = down, 3 = left, 4 = right
    if (dicrection === 1 && map[ghost1.y - 1][ghost1.x] !== 1) // up
    {
        map[ghost1.y][ghost1.x] = 2; // previous of ghost's position will be coin
        if (map[ghost1.y + 1][ghost1.x] === 3)
        {
            pacMan.x = 7; // restore pacman's origon position
            pacMan.y = 4;
            map[4][7] = 3;
            map[ghost1.y + 1][ghost1.x] = 2; // pacman's current position will be a coin
        }
        ghost1.y = ghost1.y - 1; // ghost move up
        map[ghost1.y][ghost1.x] = 4 // display on map
        drawMap();
    }

    if (dicrection === 2 && map[ghost1.y + 1][ghost1.x] !== 1) // down
    {
        map[ghost1.y][ghost1.x] = 2; // previous of ghost's position will be coin
        if (map[ghost1.y - 1][ghost1.x] === 3) // ghost meet pacman when moving down
        {
            pacMan.x = 7; // restore pacman's origon position
            pacMan.y = 4;
            map[4][7] = 3;
            map[ghost1.y - 1][ghost1.x] = 2; // pacman's current position will be a coin
        }
        ghost1.y = ghost1.y + 1; // ghost move down
        map[ghost1.y][ghost1.x] = 4 // display on map
        drawMap();
    }

    if (dicrection === 3 && map[ghost1.y][ghost1.x - 1] !== 1) // left
    {
        map[ghost1.y][ghost1.x] = 2; // previous of ghost's position will be coin
        if (map[ghost1.y][ghost1.x - 1] === 3) // ghost meet pacman when moving left
        {
            pacMan.x = 7; // restore pacman's origon position
            pacMan.y = 4;
            map[4][7] = 3;
            map[ghost1.y][ghost1.x - 1] = 2; // pacman's current position will be a coin
        }  
        ghost1.x = ghost1.x - 1; // ghost move left
        map[ghost1.y][ghost1.x] = 4 // display on map
        drawMap();
    }

    if (dicrection === 4 && map[ghost1.y][ghost1.x + 1] !== 1) // right
    {
        map[ghost1.y][ghost1.x] = 2; // previous of ghost's position will be coin
        if (map[ghost1.y][ghost1.x + 1] === 3) // ghost meet pacman when moving right
        {
            pacMan.x = 7; // restore pacman's origon position
            pacMan.y = 4;
            map[4][7] = 3;
            map[ghost1.y][ghost1.x + 1] = 2; // pacman's current position will be a coin
        }
        ghost1.x = ghost1.x + 1; // ghost move right
        map[ghost1.y][ghost1.x] = 4 // display on map
        drawMap();
    }
}

/***************************************
function:       
Param:          none
Description:    ghost will move after 300ms
****************************************/
setInterval(function(){ghostMove()},300);


/***************************************
function:       
Param:          none
Description:    player's movement
****************************************/
document.onkeydown = function(e){
    console.log(e);
    if (e.keyCode === 38) // up 
    {
        if (map[pacMan.y-1][pacMan.x] !== 1) // if next position is not wall
        {
            if (map[pacMan.y - 1][pacMan.x] === 4) // pacman hit a ghost
            {
                map[pacMan.y][pacMan.x] = 5; // current position will be background
                pacMan.x = 7; // restore pacman's origon position
                pacMan.y = 4;
                map[4][7] = 3;
                drawMap();
            }
            else { // pacman doesn't hit a ghost, then continue to move
            map[pacMan.y][pacMan.x] = 5;
            pacMan.y = pacMan.y - 1;
            map[pacMan.y][pacMan.x] = 3;
            drawMap();
            }
        }
    }
    else if (e.keyCode === 40) // down
    {
        if (map[pacMan.y+1][pacMan.x] !== 1) // if next position is not wall
        {
            if (map[pacMan.y + 1][pacMan.x] === 4) // pacman hit a ghost
            {
                map[pacMan.y][pacMan.x] = 5; // current position will be background
                pacMan.x = 7; // restore pacman's origon position
                pacMan.y = 4;
                map[4][7] = 3;
                drawMap();
            }
            else { // pacman doesn't hit a ghost, then continue to move
            map[pacMan.y][pacMan.x] = 5;
            pacMan.y = pacMan.y + 1;
            map[pacMan.y][pacMan.x] = 3;
            drawMap();
            }
        }
    }
    else if (e.keyCode === 37) // left
    {
        if (map[pacMan.y][pacMan.x - 1] !== 1) // if next position is not wall
        {
            if (map[pacMan.y][pacMan.x - 1] === 4) // pacman hit a ghost
            {
                map[pacMan.y][pacMan.x] = 5; // current position will be background
                pacMan.x = 7; // restore pacman's origon position
                pacMan.y = 4;
                map[4][7] = 3;
                drawMap();
            }
            else { // pacman doesn't hit a ghost, then continue to move
            map[pacMan.y][pacMan.x] = 5;
            pacMan.x = pacMan.x - 1;
            map[pacMan.y][pacMan.x] = 3;
            drawMap();
            }
        }
    }
    else if (e.keyCode === 39) // right
    {
        if (map[pacMan.y][pacMan.x + 1] !== 1) // if next position is not wall
        {
            if (map[pacMan.y][pacMan.x + 1] === 4) // pacman hit a ghost
            {
                map[pacMan.y][pacMan.x] = 5; // current position will be background
                pacMan.x = 7; // restore pacman's origon position
                pacMan.y = 4;
                map[4][7] = 3;
                drawMap();
            }
            else { // pacman doesn't hit a ghost, then continue to move
            map[pacMan.y][pacMan.x] = 5;
            pacMan.x = pacMan.x + 1;
            map[pacMan.y][pacMan.x] = 3;
            drawMap();
            }
        }
    }
    
}


drawMap();