//town names (copied from my last game)
var tnamepre = ["New ", "Old ", "West ", "East ", "Outer ", "Inner ", "South ", "North ", "Upper ", "Lower ", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var tname1 = ["White", "Brad", "Butter", "Village", "Wig", "Apple", "Chester", "Ash", "Aire", "Strat", "Daven", "Tam", "Whel", "Lowe", "South", "Sud", "Shef", "Ax", "Black", "Burn", "Sar", "Alver", "Staw", "Stan", "North", "Winter", "Spring", "Raven", "Dun"];
var tname2 = ["chapel", "pond", "ston", "ton", "burg", "ville", "dale", "wick", "ford", "port", "worth", "stow", "firth", "shaw", "sworthly", "stone", "ine", "forth", "wich", "beck", "bury", "field", "minster", "bourne", "pool", "mere", "hold", "wall", "kirk"];

//dungeon names (new)
var duntype = ["Caverns", "Grotto", "Labyrinth", "Lair", "Vault", "Crypt", "Pits", "Burrows", "Tunnels", "Lair", "Vault", "Catacombs"]
var dunwhose1 = ["Hol", "Mol", "Smoll", "Mine", "Karl", "Marx", "Dis", "Clum", "Chum", "Grom", "Ill", "A", "Im", "Dun", "Mun", "Ol", "Smit", "Spit", "Shorn", "Garn", "Meu", "Ikl", "Spor"]
var dunwhose2 = ["grim's", "moth's", "dom's", "ant's", "ive's", "spute's", "son's", "man's", "mon's", "ice's", "smith's", "ock's"]
var dundesc = ["Dank", "Dark", "Spooky", "Forgotton", "Misty", "Shrouded", "Sunken", "Bottomless", "Abysmal", "Slimy", "Chilly", "Secluded", "Desecrated", "Forbidden"];
var dunwhat = ["Demise", "Cry", "Shout", "Downfall", "Lament", "Shriek", "Dispute", "Distress", "Doom", "Peril", "Snare", "Warning"]
class Map {
  constructor(width,height) {
    this.map = [];
    this.curlvl = 0;
    this.size = {
      w: width-1,
      h: height-1
    }
    for (var i = 0; i < width; i++) {
      this.map.push([]);
      for (var j = 0; j < height; j++) {
        this.map[i].push(new feature("grass",i + j));
      }
    }
    this.map[0][0] = new feature("dungeon",0);
    this.map[1][0] = new feature("city",1);
    this.addfeatures("dungeon",19);
    //this.addfeatures("city",1);
    this.addfeatures("village",5);

    this.areahtml = "<map name='maparea' id='areamap'>"
    for (var i = 0; i < this.size.h; i++) {
      for (var j = 0; j < this.size.w; j++) {
        ctxmapchange.drawImage(this.map[i][j].img[0],24,0,8,8,i*32,j*32,32,32);
        ctxmapchange.drawImage(this.map[i][j].img[0],this.map[i][j].img[1]*8,0,8,8,i*32,j*32,32,32);
        this.areahtml += "<area shape='rect' coords=\"" + i*32 + "," + j*32 + "," + (i+1)*32 + "," + (j+1)*32 + "\" alt = \"" + this.map[i][j].type + "\" href='#' id=\"" + 'maparea' + i+j + "\">"
      }
    }
    this.areahtml += "</map>"
    this.img = new Image(320,320);
    this.img.src = mapchange.toDataURL("image/png");
  }
  display(parid) {
    $("#mapdisplay").remove();
    ctxmapchange.drawImage(this.img,0,0);
    ctxmapchange.drawImage(tiles,32,0,8,8,p.coords.x*32,p.coords.y*32,32,32);
    addelement(document.getElementById(parid),"div","","mapdisplay","<img usemap='#maparea' style='margin:auto;display:block' src=\"" + mapchange.toDataURL("image/png") + "\"></img>" + this.areahtml,"");
    for (let i = 0; i < this.size.h; i++) {
      for (let j = 0; j < this.size.w; j++) {
        var lel = this;
        $("#maparea" + i + j).unbind("click").click(function() {
          alert(lel.map[i][j].type + i + j);
        });
      }
    }
    setTimeout(scrollQuickToBottom,10);
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
  setplayer(x,y) {
    p.coords.x = x;
    p.coords.y = y;
    if (p.coords.y == 0) {story.variablesState["ablenorth"] = false;}
    else {story.variablesState["ablenorth"] = true;}
    if (p.coords.y == this.size.h-1) {story.variablesState["ablesouth"] = false;}
    else {story.variablesState["ablesouth"] = true;}
    if (p.coords.x == this.size.w-1) {story.variablesState["ableeast"] = false;}
    else {story.variablesState["ableeast"] = true;}
    if (p.coords.x == 0) {story.variablesState["ablewest"] = false;}
    else {story.variablesState["ablewest"] = true;}
    var curlocation = this.map[Math.round(p.coords.x)][Math.round(p.coords.y)];
    story.variablesState["curlocationname"] = curlocation.name;
    story.variablesState["curlocationtype"] = curlocation.type;
    if (curlocation.type == "city") {
      story.variablesState["curprompt1"] = curlocation.quests[0].nextprompt(false);
      story.variablesState["curprompt2"] = curlocation.quests[1].nextprompt(false);
      story.variablesState["curprompt3"] = curlocation.quests[2].nextprompt(false);
      story.variablesState["questtype1"] = curlocation.quests[0].type;
      story.variablesState["questtype2"] = curlocation.quests[1].type;
      story.variablesState["questtype3"] = curlocation.quests[2].type;
    }
    this.curlvl = curlocation.lv;
  }
  returnclostest(type) {
    var closestdist = [[69420,this.map[0][0]]]
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j].type == type) {
          var dist = Math.sqrt(Math.pow(p.coords.x - i,2) + Math.pow(p.coords.y-j,2));
          for (var k = 0; k < closestdist.length; k++) {
            if (dist < closestdist[k][0]) {
              closestdist.splice(k,0,[dist,this.map[i][j]]);
              break
            }
          }
        }
      }
    }
    return closestdist;
  }
  curfeature() {
    return this.map[p.coords.x][p.coords.y];
  }
  addquests() {
    for (var i in this.map) {
      for (var j in this.map[i]) {
        if (this.map[i][j].type == "city") {
          this.map[i][j].quests = [new Quest(this.map[i][j].quests.lv),new Quest(this.map[i][j].quests.lv), new Quest(this.map[i][j].quests.lv)];
        }
      }
    }
  }
}
class feature {
  constructor(type,level) {
    this.type = type;
    this.lv = level;
    this.img = [tiles,0];
    if (type == "city") {
      this.name = randlist(tnamepre) + randlist(tname1) + randlist(tname2);
      this.img[1] = 1;
      this.quests = [];
    }
    else if (type == "village") {
      this.name = randlist(tname1) + randlist(tname2);
      this.img[1] = 2;
    }
    else if (type == "grass") {
      this.name = "boring old grass";
      this.img[1] = 3;
    }
    else if (type == "dungeon") {
      if (randint(0,1) == 1) {this.name = randlist(dunwhose1) + randlist(dunwhose2) + " " + randlist(dundesc) + " " + randlist(duntype);}
      else {this.name = randlist(dunwhose1) + randlist(dunwhose2) + " " + randlist(dunwhat);}
      //console.log(this.name)
      this.bossloot = [];
      this.bosslevel = false;
    }
  }
  addbossloot(item) {
    if (this.type == "dungeon") {
      this.bossloot.push(item);
    }
  }
}
