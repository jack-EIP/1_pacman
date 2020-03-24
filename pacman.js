// 1 = wall
// 2 = coin
// 3 = pacman
// 4 = ghost
// 5 = back ground

var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],
    [1,2,1,1,1,2,2,1,2,2,1,1,1,2,1],
    [1,2,1,2,2,2,2,2,2,2,2,2,1,2,1],
    [1,2,2,2,1,1,1,3,1,1,1,2,2,2,1],
    [1,2,1,2,2,2,2,2,2,2,2,2,1,2,1],
    [1,2,1,1,1,2,2,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var pacMan = {
    x: 7,
    y: 4   
}

function drawMap() {
    // 1 = wall
    // 2 = coin
    // 3 = pacman
    // 4 = ghost
    // 5 = back ground

    document.getElementById('world').innerHTML = ""; // delete the old world

    for(var y = 0; y < map.length; y = y + 1)
    {
        for (var x = 0; x < map[y].length; x = x + 1)
        {
            if (map[y][x] === 1)
                document.getElementById('world').innerHTML += "<div class='wall'></div>";
            else if (map[y][x] === 2)
                document.getElementById('world').innerHTML += "<div class='coin'></div>";
            else if (map[y][x] === 3)
                document.getElementById('world').innerHTML += "<div class='pacman'></div>";
            else if (map[y][x] === 5)
                document.getElementById('world').innerHTML += "<div class='bg'></div>";  
        }

        document.getElementById("world").innerHTML += "<br>";
    }
}

document.onkeydown = function(e){
    console.log(e);
    if (e.keyCode === 37) // left
    {
        if (map[pacMan.y][pacMan.x-1] !== 1)
        {
            map[pacMan.y][pacMan.x] = 5;
            pacMan.x = pacMan.x - 1;
            map[pacMan.y][pacMan.x] = 3;
            drawMap();
        }
    }
    else if (e.keyCode === 38) // up
    {
        if (map[pacMan.y-1][pacMan.x] !== 1)
        {
            map[pacMan.y][pacMan.x] = 5;
            pacMan.y = pacMan.y - 1;
            map[pacMan.y][pacMan.x] = 3;
            drawMap();
        }
    }
    else if (e.keyCode === 39) // right
    {
        if (map[pacMan.y][pacMan.x+1] !== 1)
        {
            map[pacMan.y][pacMan.x] = 5;
            pacMan.x = pacMan.x + 1;
            map[pacMan.y][pacMan.x] = 3;
            drawMap();
        }
    }
    else if (e.keyCode === 40) // down
    {
        if (map[pacMan.y+1][pacMan.x] !== 1)
        {
            map[pacMan.y][pacMan.x] = 5;
            pacMan.y = pacMan.y + 1;
            map[pacMan.y][pacMan.x] = 3;
            drawMap();
        }
    }
}


drawMap();