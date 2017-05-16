function init() {
  p.equipweap(0);
  window.requestAnimationFrame(gameloop);
}
function gameloop() {
  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.clearRect(0,0,canvas.width,canvas.height)
  if (p.state == "fight") {
    var width = Math.floor(Math.min(size.w*.75,(size.h-410)*11/23));
    var height = Math.floor(Math.min(size.h-410,size.w*23/11*.75));
    ctx.drawImage(healthbar,0,0,(Math.ceil(curen.health/curen.healthmax*21)),2,Math.floor((size.w*.75-width/11*21)/2),0,Math.floor(width/11*curen.health/curen.healthmax*21),Math.floor(height/23*2));
    ctx.drawImage(enemiesimg,curen.type[1]*11,0,11,23,Math.floor((size.w*.75-width)/2),0,width,height);
    //ctx.fillText(curen.health,size.w*.75/2,40);
    if (!curen.alive) {
      (new weapon(randint(0,materials.length-1))).prompt();
    }
  }
  window.requestAnimationFrame(gameloop);
}
function settransition(time,par) {
  $("#" + par).css({
    "transition": (time + "s ease-in"),
    "-webkit-transition": (time + "s ease-in"),
    "-moz-transition": (time + "s ease-in"),
    "-ms-transition": (time + "s ease-in"),
    "-o-transition": (time + "s ease-in"),
  });
}
