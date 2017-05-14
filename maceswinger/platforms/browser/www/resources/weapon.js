var materials = ["wood", "stone", "iron", "steel", "rainbow"];
var types = [["Sword", 1], ["Dagger", 0.5], ["Mace", 1.5]];
var change = document.getElementById("changer");
var ctxchange = change.getContext("2d");
class weapon {
  constructor(lv,name = null) {
    this.lv = lv;
    if (name == "handz") {
      this.name = "handz"
      this.swing = .1;
      this.lv = 200;
    }
    else {
      this.type = randlist(types);
      this.swing = this.type[1];
      this.name = this.type[0];
    }
    this.dam = (this.lv*2 + 4)*(Math.pow(this.swing,1.1)).toFixed(2);
    this.damps = (this.dam/this.swing).toFixed(2);
    this.element = null;
    this.buttons = null;
    this.img = new Image(64,128);
    ctxchange.fillRect(0,0,64,128);
    ctx.drawImage(weapsimg, this.type * 16,8 + this.type*32,16,32,0,0,64,128);
    this.img.src = change.toDataURL("image/png");
  }
  addtoinv(par,place) {
    par.inv.push(this);
    var idd = par.inv.length-1 + "";
    var iddd = idd+"content";
    addelement(document.getElementById(place),"div","card",idd,null);
    addelement(document.getElementById(idd),"div","card-header",idd + "head",this.name);
    addelement(document.getElementById(idd),"div","card-content",iddd);
    addelement(document.getElementById(iddd),"div","card-content-inner",null,"Damage: " + this.dam + "<br/>Swing Speed: " + this.swing + "<br/>DPS: " + this.damps + "<img src=\"" + this.img.src + "\"></img>");
    this.element = document.getElementById(idd);
    var parr = this;
    $("#" + iddd).click(function() {
      togglebut(parr,idd)
    });
    $("#" + idd + "head").click(function() {
      togglebut(parr,idd)
    });
  }
}
function addelement(par,type,clas,id=null,html=null,parallax=null) {
  var ele = document.createElement(type);
  ele.setAttribute('class', clas);
  if (html != null) {
    ele.innerHTML = html;
  }
  if (id != null) {
    ele.setAttribute('id', id);
  }
  if (parallax != null) {
    ele.setAttribute("data-swiper-parallax", parallax)
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
