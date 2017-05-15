var materials = ["Wooden", "Stone", "Iron", "steel", "rainbow"];
var types = [["Sword", 1], ["Dagger", 0.5], ["Mace", 1.5]];
class weapon {
  constructor(lv,name = null) {
    this.lv = lv;
    if (name == "handz") {
      this.name = "handz"
      this.swing = .1;
      this.lv = 200;
    }
    else {
      this.type = randint(0,types.length-1);
      this.swing = types[this.type][1];
      this.name = materials[this.lv] + " " + types[this.type][0];
    }
    this.dam = (this.lv*2 + 4)*(Math.pow(this.swing,1.1)).toFixed(2);
    this.damps = (this.dam/this.swing).toFixed(2);
    this.element = null;
    this.buttons = null;
    this.img = new Image(64,128);
    ctxchange.drawImage(weapsimg, this.lv * 16,8 + this.type*32,16,32,0,0,64,128);
    this.img.src = change.toDataURL("image/png");
    ctxchange.clearRect(0,0,64,128);
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
    addelement(document.getElementById(place),"div","card",idd);
    addelement(document.getElementById(idd),"div","card-header",idd + "head",this.name);
    addelement(document.getElementById(idd),"div","card-content",iddd);
    addelement(document.getElementById(iddd),"div","card-content-inner",null,"Damage: " + this.dam + "<br/>Swing Speed: " + this.swing + "<br/>DPS: " + this.damps + "<img style='position:absolute;bottom:1px;right:20px;z-index:3' src=\"" + this.img.src + "\"></img>");
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
    addelement(document.getElementById("main"),"div","card",idd,null,"width:250px;position:absolute");
    document.getElementById(idd).style.left = size.w/2-135 + "px";
    document.getElementById(idd).style.top = size.h*1/3 + "px";
    addelement(document.getElementById(idd),"div","card-header",idd + "head",this.name);
    addelement(document.getElementById(idd),"div","card-content",iddd);
    addelement(document.getElementById(iddd),"div","card-content-inner",null,"Damage: " + this.dam + "<br/>Swing Speed: " + this.swing + "<br/>DPS: " + this.damps + "<img style='position:absolute;bottom:1px;right:20px;z-index:3' src=\"" + this.img.src + "\"></img>");
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
  refuse(selected,par=null,place=null) {
    p.setstate("fight");
    document.getElementById("temp").remove();
    if (selected) {
      this.addtoinv(par,place);
    }
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
  else if (document.getElementById(idd).className.split(' ')[1] != "weapselected"){
    addelement(document.getElementById(idd),"div","card-footer",idd + "foot","<a href='#' class='button' style='width:50%' onclick='p.equipweap(\"" + parseInt(idd) + "\")'><i class='f7-icons'>add</i></a><a href='#' class='button' style='width:50%' onclick='p.drop(\"" + parseInt(idd) + "\")'><i class='f7-icons'>close</i></a>");
    parr.buttons = document.getElementById(idd + "foot");
  }
}
