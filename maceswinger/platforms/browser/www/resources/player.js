class player {
  constructor() {
    this.name = "";
    this.gold = 0;
    this.health = 0;
    this.exp = 0;
    this.lv = 0;
    this.inv = [];
    var we = new weapon(0,"handz");
    we.addtoinv(this,"eqweap");
    this.state = "fight";
    this.refreshinv();
  }
  equipweap(invslot) {
    $(this.weap.element).remove();
    this.weap.addtoinv(this,"invw");
    $(this.inv[invslot].element).remove();
    settransition(this.weap.swing);
    this.inv[invslot].addtoinv(this,"eqweap");
    this.inv[invslot] = null;
    $(this.weap.element).addClass("weapselected");
    this.refreshinv();
  }
  hit(en) {
    curen.health -= this.weap.dam;
    curen.update();
  }
  drop(id) {
    $(this.inv[id].element).remove();
    this.inv[id] = null;
    this.refreshinv();
  }
  refreshinv() {
    var tempinv = [];
    var tempcur = this.weap;
    $(this.weap.element).remove();
    this.weap = null;
    for (var i in this.inv) {
      if (this.inv[i] != null) {
        tempinv.push(this.inv[i]);
        $(this.inv[i].element).remove();
      }
    }
    this.inv = [];
    tempcur.addtoinv(this,"eqweap");
    for (var i in tempinv) {
      tempinv[i].addtoinv(this,"invw");
    }
  }
  setstate(state) {
    p.state = state;
    if (state == "loot") {
      $("#dodge").attr("disabled","disabled");
      $("#hit").attr("disabled","disabled");
    }
    else if (state == "fight") {
      $("#dodge").removeAttr("disabled");
      $("#hit").removeAttr("disabled");
      curen = new enemy(0,randlist(["an","bn","am","bm"]));
    }
  }
}
