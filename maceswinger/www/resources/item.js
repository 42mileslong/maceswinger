var materials = ["Wooden", "Stone", "Copper", "Golden", "Iron", "Diamond", "Steel", "Obsidian"];
var types = [["Sword", 1], ["Dagger", 0.5], ["Mace", 1.5]];
var craft = [["",0],["Pointy ",1],["Broken ",-2]];
class Item {
  constructor(desc,name) {
    this.element = null;
    this.buttons = null;
    this.catagory = "item";
    this.name = name;
    this.desc = desc;
  }
  addtoinv(par,place) {
    var idd = "";
    if (place == "invw") {
      par.inv.push(this);
      idd = par.inv.length-1 + "";
    }
    else if (place == "eqweap") {
      par.weap = this;
      idd = "curweap";
    }
    var iddd = idd+"content";
    if (this.catagory == "item") {
      this.createitemcard(idd,iddd,place);
    }
    else if (this.catagory == "weapon") {
      this.createweaponcard(idd,iddd,place); //yes this is a mess
    }
    this.element = document.getElementById(idd);
    if (place == "invw") {
      var parr = this;
      $("#" + iddd).click(function() {
        togglebut(parr,idd)
      });
      $("#" + idd + "head").click(function() {
        togglebut(parr,idd)
      });
    }
  }
  prompt() {
    var idd = "temp";
    var iddd = "temp2";
    if (this.catagory == "weapon") {
      this.createweaponcard(idd,iddd,"main");
    }
    else if (this.catagory == "item") {
      this.createitemcard(idd,iddd,"main");
    }
    document.getElementById(idd).style.left = size.w/2-135 + "px";
    document.getElementById(idd).style.top = size.h*1/3 + "px";
    document.getElementById(idd).style.width = "250px";
    document.getElementById(idd).style.position = "absolute";
    addelement(document.getElementById(idd),"div","card-footer",idd + "foot","<a href='#' class='button' style='width:50%' id='tempadd'><i class='f7-icons'>add</i></a><a href='#' class='button' style='width:50%' id='tempdrop'><i class='f7-icons'>close</i></a>");
    var parr = this;
    p.setstate("loot");
    $("#tempadd").click(function() {
      parr.refuse(true,p,"invw");
    });
    $("#tempdrop").click(function() {
      parr.refuse(false);
    });
  }
  createweaponcard(idd,iddd,place) {
    addelement(document.getElementById(place),"div","card",idd);
    addelement(document.getElementById(idd),"div","card-header",idd + "head",this.name);
    addelement(document.getElementById(idd),"div","card-content",iddd);
    addelement(document.getElementById(iddd),"div","card-content-inner",null,"Damage: " + this.dam + "<br/>Swing Speed: " + this.swing + "<br/>DPS: " + this.damps + "<img style='position:absolute;bottom:1px;right:20px;z-index:3' src=\"" + this.img.src + "\"></img>");
  }
  createitemcard(idd,iddd,place) {
    addelement(document.getElementById(place),"div","card",idd);
    addelement(document.getElementById(idd),"div","card-header",idd + "head",this.name);
    addelement(document.getElementById(idd),"div","card-content",iddd);
    addelement(document.getElementById(iddd),"div","card-content-inner",null,this.desc + "<img style='position:absolute;bottom:1px;right:20px;z-index:3' src=\"" + this.img.src + "\"></img>");
  }
  refuse(selected,par=null,place=null) {
    document.getElementById("temp").remove();
    if (selected) {
      this.addtoinv(par,place);
      if (p.inv.length > p.invsize) {
        invover(true);
      }
      else {
        p.setstate("story");
      }
    }
    else {
      p.setstate("story");
    }
  }
}
class Weapon extends Item {
  constructor(lv,name = null) {
    super("A weapon.",null);
    this.lv = lv;
    this.catagory = "weapon";
    if (name == "handz") {
      this.name = "handz"
      this.swing = .1;
      this.lv = 200;
      this.craft = 0;
    }
    else {
      this.type = randint(0,types.length-1);
      this.swing = types[this.type][1];
      this.craft = 0;
      if (randint(0,1) == 1) {
        this.craft = randint(1,craft.length-1);
      }
      this.name = craft[this.craft][0] + materials[this.lv] + " " + types[this.type][0];
    }
    this.dam = ((this.lv*2 + 4 + (this.lv+1)/2*craft[this.craft][1])*(Math.pow(this.swing,1.1))).toFixed(2);
    this.damps = (this.dam/this.swing).toFixed(2);
    this.img = new Image(64,128);
    ctxchange.drawImage(weapsimg, this.lv * 16,8 + this.type*32,16,32,0,0,64,128);
    ctxchange.drawImage(weapsimg, (this.type + this.craft*3) * 16,8 + 3*32,16,32,0,0,64,128);
    this.img.src = change.toDataURL("image/png");
    ctxchange.clearRect(0,0,64,128);//
  }
}
function addelement(par,type,clas,id=null,html=null,style=null) {
  var ele = document.createElement(type);
  ele.setAttribute('class', clas);
  if (html != null) {
    ele.innerHTML = html;
  }
  if (id != null) {
    ele.setAttribute('id', id);
  }
  if (style != null) {
    ele.setAttribute('style',style);
  }
  par.appendChild(ele);
}

function togglebut(parr,idd) {
  if (parr.buttons != null) {
    parr.buttons.remove();
    parr.buttons = null;
  }
  else if (document.getElementById(idd).className.split(' ')[1] != "weapselected" && parr.catagory == "weapon"){
    addelement(document.getElementById(idd),"div","card-footer",idd + "foot","<a href='#' class='button' style='width:50%' onclick='p.equipweap(\"" + parseInt(idd) + "\")'><i class='f7-icons'>add</i></a><a href='#' class='button' style='width:50%' onclick='p.drop(\"" + parseInt(idd) + "\")'><i class='f7-icons'>close</i></a>");
    parr.buttons = document.getElementById(idd + "foot");
  }
  else if (document.getElementById(idd).className.split(' ')[1] != "weapselected" && parr.catagory == "item") {
    addelement(document.getElementById(idd),"div","card-footer",idd + "foot","<a href='#' class='button' style='width:100%' onclick='p.drop(\"" + parseInt(idd) + "\")'><i class='f7-icons'>close</i></a>");
    parr.buttons = document.getElementById(idd + "foot");
  }
}
