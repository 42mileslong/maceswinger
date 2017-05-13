function init() {
  p.equipweap(0);
  window.requestAnimationFrame(gameloop);
}
function gameloop() {
  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.fillRect(0,0,canvas.width,canvas.height)
  if (p.state == "fight") {
    ctx.drawImage(enemiesimg,curen.type[1]*11,0,11,23,0,0,110,230);
    p.hitupdate();
  }
  window.requestAnimationFrame(gameloop);
}
function hit() {
  console.log("hit")
  if (p.hit.ble) {
    curen.health -= p.weap.dam;
    curen.update();
    if (!curen.alive) {
      p.hit.ble = false;
    }
  }
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
