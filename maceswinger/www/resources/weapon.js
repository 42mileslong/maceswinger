var materials = ["wood", "stone", "iron", "steel", "rainbow"];
var types = [["Sword", 1], ["Dagger", 0.5], ["Mace", 1.5]];
class weapon {
  constructor(lv,name = null) {
    this.lv = lv;
    if (name == "handz") {
      this.name = "handz"
      this.swing = .5;
    }
    else {
      this.type = randlist(types);
      this.swing = this.type[1];
      this.name = this.type[0];
    }
    this.dam = (this.lv*2 + 4)*(Math.pow(this.swing,1.1)).toFixed(2);
    this.damps = (this.dam/this.swing).toFixed(2);
  }
  addtoinv(par) {
    par.inv.push(this);
    var idd = par.inv.length-1 + "";
    var iddd = idd+"content";
    addelement(document.getElementById("inv"),"div","card",idd);
    addelement(document.getElementById(idd),"div","card-header",null,this.name);
    addelement(document.getElementById(idd),"div","card-content",iddd);
    addelement(document.getElementById(iddd),"div","card-content-inner",null,"Damage: " + this.dam + "<br/>Swing Speed: " + this.swing + "<br/>DPS: " + this.damps);
  }
}
function randint(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randlist(list) {
  return list[randint(0, list.length - 1)];
}
function addelement(par,type,clas,id=null,html=null) {
  var ele = document.createElement(type);
  ele.setAttribute('class', clas);
  if (html != null) {
    ele.innerHTML = html;
  }
  if (id != null) {
    ele.setAttribute('id', id);
  }
  par.appendChild(ele);
}
