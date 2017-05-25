class Map {
  constructor(width,height) {
    var tempmap = [];
    var ids = [];
    for (var i = 0; i < Math.ceil(width*height/20); i++) {
      var tempx = randint(4,width-4);
      var tempy = randint(4,height-4);
      ids.push(getpoint(tempx,tempy,randint(0,1)));
    }
    ids.push(getpoint(0,0,0));
    ids.push(getpoint(width-1,0,0));
    ids.push(getpoint(width-1,height-1,0));
    ids.push(getpoint(0,height-1,0));
    ids.push(getpoint(Math.floor(width/2),Math.floor(height/2),0));
    ids.push(getpoint(Math.floor(width/2),0,0));
    ids.push(getpoint(Math.floor(width/2),Math.floor(height/2),0));
    ids.push(getpoint(0,Math.floor(height/2),0));
    //console.log(ids)
    for (var i = 0; i < width; i++) {
      tempmap.push([])
      for (var j = 0; j < height; j++) {
        var curpoint = {
          p: ids[0],
          pdelta: width*height,
        }
        for (var k = 0; k < ids.length; k++) {
          if (Math.sqrt(Math.pow(ids[k].x-i,2) + Math.pow(ids[k].y-j,2)) < curpoint.pdelta) {
            //console.log(curpoint.p.x,k)
            curpoint.p = ids[k];
            curpoint.pdelta = Math.sqrt(Math.pow(curpoint.p.x-i,2) + Math.pow(curpoint.p.y-j,2));
            //console.log(curpoint.pdelta)
          }
        }
        tempmap[i].push(curpoint.p.id);
      }
    }
    this.map = tempmap;
    this.size = {
      w: width,
      h: height
    }
    this.img = null;
  }
  display(parid) {
    var id = "mapdisplay" + this.size.w + this.size.h;
    var pics = [tile_ocean,tile_forest];
    //ctxmapchange.clearRect(0,0,100,100);
    for (var i = 0; i < this.size.h; i++) {
      for (var j = 0; j < this.size.w; j++) {
        ctxmapchange.drawImage(tile_ocean,0,0);
        //pics[this.map[i][j]]
      }
    }
    this.img = new Image(100,100);
    this.img.src = mapchange.toDataURL("image/png");
    addelement(document.getElementById(parid),"div","",id,"<img style='' src=\"" + this.img.src + "\"></img>","");
  }
}
function getpoint(x,y,id) {
  var point = {
    x: x,
    y: y,
    id: id
  }
  return point;
}
