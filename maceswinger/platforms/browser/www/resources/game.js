function init() {
  p.equipweap(0);
  window.requestAnimationFrame(gameloop);
}
function gameloop() {
  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.fillRect(0,0,canvas.width,canvas.height)
  if (p.state == "fight") {
    var width = Math.floor(Math.min(size.w*.5,(size.h-390)*11/23));
    var height = Math.floor(Math.min(size.h-390,size.w*23/22));
    ctx.drawImage(enemiesimg,curen.type[1]*11,0,11,23,Math.floor((size.w*.5-width)/2),0,width,height);
    if (!curen.alive) {
      curen = new enemy(0,randlist(["an","bn","am","bm"]));
      (new weapon(0)).addtoinv(p,"invw");
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
