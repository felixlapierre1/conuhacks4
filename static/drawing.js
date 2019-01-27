const TILESIZE = 32;
var canvas;
var context;
console.log("Loaded drawing.js");
var images = {};
images.player = new Image();
images.player.src = "static/egg.png";
images.wasabi = new Image();
images.wasabi.src = "static/wasabi.png";
images.wall = new Image();
images.wall.src = "static/wall.png";
images.floor = new Image();
images.floor.src = "static/floor.png";
images.paper = new Image();
images.paper.src = "static/paper.png";
images.plastic = new Image();
images.plastic.src = "static/bottle.png";
images.trash = new Image();
images.trash.src = "static/trash.png";

var playerNumber = 0;

function SetupCanvas()
{
    canvas = document.getElementById("canvas");
    if(canvas == undefined)
        return false;
    canvas.width  = 1024;
    canvas.height = 512;
    context = canvas.getContext('2d');
    return true;
}

function draw(map)
{
    playerNumber = 0;
    if(!SetupCanvas())
        return;
    if(map == null)
    {
        console.log("Map not yet recieved from server");
    }
    if(map == undefined)
    {
        console.log("Map recieved from server was undefined!");
        return;
    }

    context.clearRect(0, 0, 800, 600);
    console.log("Drawing map");
    DrawTiles(map);
}

function DrawTiles(map)
{
    for(var i = 0; i < map.length; i++)
    {
        for(var j = 0; j < map.length; j++)
        {
            DrawSingleTile(map[i][j], i, j);
        }
    }
}

function DrawSingleTile(object, x, y)
{
    if(object == undefined)
    {
      DrawFloor(x, y);
    }
    else if(object.type == "player")
    {
        DrawFloor(x, y);
        DrawPlayer(object, x, y);
    }
    else if(object.type == "wall")
    {
      DrawWall(x, y);
    }
    else if(object.type == "item" && object.material == "paper")
    {
      DrawFloor(x, y);
      DrawImage(images.paper, x, y, 0);
    }
    else if(object.type == "item" && object.material == "plastic")
    {
      DrawFloor(x, y);
      DrawImage(images.plastic, x, y, 0);
    }
    else if(object.type == "item" && object.material == "trash")
    {
      DrawFloor(x, y);
      DrawImage(images.trash, x, y, 0);
    }
}

function DrawWall(x, y)
{
    DrawImage(images.wall, x, y, 0);
}

function DrawFloor(x, y)
{
    DrawImage(images.floor, x, y, 0);
}

function DrawPaper(x, y)
{
  DrawImage(images.paper, x, y, 0);
}

function DrawPlayer(player, x, y)
{
    console.log(player.number);
    if(player.number == 0)
        DrawImage(images.player, x, y, 0);
    else
        DrawImage(images.wasabi, x, y, 0);
}

function DrawImage(image, x, y, rotation)
{
    context.save();
    context.translate(TILESIZE * (x + 0.5), TILESIZE * (y + 0.5));
    context.rotate(rotation);
    context.drawImage(image, 0, 0, image.width, image.height,
        -TILESIZE/2, -TILESIZE/2, TILESIZE, TILESIZE);
    context.restore();
}

