class Map {
  constructor(width,height) {
    this.map = [];
    this.size = {
      w: width-1,
      h: height-1
    }
    this.img = null;
    for (var i = 0; i < width; i++) {
      this.map.push([]);
      for (var j = 0; j < height; j++) {
        this.map[i].push(new feature("grass",i + j));
      }
    }
    this.addfeatures("dungeon",20);
    this.addfeatures("city",2);
    this.addfeatures("village",5);
  }
  display(parid) {
    var id = "mapdisplay";
    var areahtml = "<map name='maparea' id='areamap'>"
    for (var i = 0; i < this.size.h; i++) {
      for (var j = 0; j < this.size.w; j++) {
        ctxmapchange.drawImage(this.map[i][j].img[0],24,0,8,8,i*32,j*32,32,32);
        ctxmapchange.drawImage(this.map[i][j].img[0],this.map[i][j].img[1]*8,0,8,8,i*32,j*32,32,32);
        areahtml += "<area shape='rect' coords=\"" + i*32 + "," + j*32 + "," + (i+1)*32 + "," + (j+1)*32 + "\" alt = \"" + this.map[i][j].type + "\" href='#' id=\"" + 'maparea' + (i+j) + "\">"
      }
    }
    areahtml += "</map>"
    this.img = new Image(320,320);
    this.img.src = mapchange.toDataURL("image/png");
    addelement(document.getElementById(parid),"div","",id,"<img style='' usemap='#maparea' src=\"" + this.img.src + "\"></img>" + areahtml,"");
    for (var i = 0; i < this.size.h; i++) {
      for (var j = 0; j < this.size.w; j++) {
        document.getElementById("maparea" + (i + j)).onclick = function() {
          alert(this.map[i][j].type)
        }
      }
    }
  }
  addfeatures(type, howmany) {
    for (var i = 0; i < howmany; i++) {
      var x = randint(0,this.size.w-1);
      var y = randint(0,this.size.h-1);
      while (this.map[x][y].type != "grass") {
        x = randint(0,this.size.w-1);
        y = randint(0,this.size.h-1);
      }
      this.map[x][y] = new feature(type,x + y)
    }
  }
}
class feature {
  constructor(type,level) {
    this.type = type;
    this.lv = level;
    this.img = [tiles,0];
    if (type == "city") {this.img[1] = 1;}
    else if (type == "village"){this.img[1] = 2;}
    else if (type == "grass"){this.img[1] = 3;}
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
