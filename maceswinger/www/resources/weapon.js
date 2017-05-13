var materials = ["wood", "stone", "iron", "steel", "rainbow"];
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
      this.type = randlist(types);
      this.swing = this.type[1];
      this.name = this.type[0];
    }
    this.dam = (this.lv*2 + 4)*(Math.pow(this.swing,1.1)).toFixed(2);
    this.damps = (this.dam/this.swing).toFixed(2);
    this.element = null;
  }
  addtoinv(par,place) {
    par.inv.push(this);
    var idd = par.inv.length-1 + "";
    var iddd = idd+"content";
    addelement(document.getElementById(place),"div","card",idd,null);
    addelement(document.getElementById(idd),"div","card-header",null,this.name);
    addelement(document.getElementById(idd),"div","card-content",iddd);
    addelement(document.getElementById(iddd),"div","card-content-inner",null,"Damage: " + this.dam + "<br/>Swing Speed: " + this.swing + "<br/>DPS: " + this.damps);
    this.element = document.getElementById(idd);
    $("#" + idd).click(function() {
      p.equipweap(parseInt(idd));
    });
    $("#" + idd).dblclick(function() {
      p.drop(parseInt(idd));
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
