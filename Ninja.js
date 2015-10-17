

var getStarPath = function (X, Y, size) {
/*    /\
    <|==|> 
      \/     */
  //from top, counter-clockwise
  var xsign =  [ 0,-1,-1,-1, 0, 1, 1, 1, 0];
  var ysign =  [-1,-1, 0, 1, 1, 1, 0,-1,-1];
  var points = []
  for(var p = 0; p <  xsign.length; p++) {
    var x = xsign[p];
    var y = ysign[p];
    if(x === 0 || y === 0) {
      var k = 0.5;
    } else {
      k = 0.125;
    }
    x = X + (x*k + 0.5)*size;
    y = Y + (y*k + 0.5)*size;

    points.push([x, y])
  }
  return points;

};

var width = 400;
var height = 400;

var gameBoard = d3.select('.board')
                .attr('width', width)
                .attr('height', height);

gameBoard = gameBoard.append('svg:svg')
                .attr('width', width)
                .attr('height', height);


var makeEnemies = function (count) {
  enemies = []
  for(var i = 0; i < count; i++) {
    enemies.push(new Enemy(i));
  }
  return enemies;
};

var Enemy = function (i) {
  this.id = i;
  this.size = 20;
  this.x = Math.random() * (width - this.size);
  this.y = Math.random() * (height - this.size);

  this.path = getStarPath(this.x, this.y, this.size);

}

var enemyData = makeEnemies(20);

var lineFunction = d3.svg.area()
                          .interpolate("linear");




gameBoard.selectAll('path').data(enemyData, function (d) {return d.id})
                          .enter().append('path')
                          .attr('d', function (enemy) {return lineFunction(enemy.path)})
                          .attr('fill', 'black')
                          .attr('x', function (e) {return e.x})
                          .attr('y', function (e) {return e.y})
                          .attr('class', 'enemy');

var enemies = gameBoard.selectAll('path.enemy');


function myTween(endData){
    thing = false;
    var enemy = d3.select(this);
    var startPos = {
      x: parseFloat(enemy.attr("x")),
      y: parseFloat(enemy.attr("y"))
    }
    var endPos = {
      x:axes.x(endData.x),
      y:axes.y(endData.y)
    }


    return function(t){
      checkCollision(enemy,onCollision);
      var enemyNextPos = {
        x: startPos.x + (endPos.x - startPos.x)*t,
        y: startPos.y + (endPos.y - startPos.y)*t
      }
      enemy.attr('x', enemyNextPos.x)
           .attr('y', enemyNextPos.y)
    }

  }



  enemies
    .transition()
      .duration(2000)
      .tween('custom', myTween)





