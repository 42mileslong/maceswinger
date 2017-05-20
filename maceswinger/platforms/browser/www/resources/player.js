class player {
  constructor() {
    this.name = "";
    this.gold = 0;
    this.health = 0;
    this.exp = {
      cur: 0,
      next: 100,
      last: 0,
    }
    this.lv = 1;
    this.inv = [];
    this.invsize = 2;
    var we = new Weapon(0,"handz");
    we.addtoinv(this,"eqweap");
    this.state = "story";
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
    if (p.inv.length == p.invsize) {
      invover(false);
    }
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
  droplowest() { //broken, for some reason
    var tempslot = 0;
    for (var i in this.inv) {
      if (this.inv[i].damps < this.inv[tempslot].damps) {
        tempslot = i;
      }
    }
    p.drop(tempslot);
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
      togglescreen("fight");
      story.variablesState["curenname"] = curen.name;
      gameloop();
    }
    else if (state == "story") {
      togglescreen("story");
      story.ChoosePathString("after");
    }
  }
  expup(exp) {
    this.exp.cur += exp;
    if (this.exp.next <= this.exp.cur) {
      this.lv++;
      document.getElementById("plv").innerHTML = this.lv;
      this.exp.last = this.exp.next;
      this.exp.next += this.exp.next*1.1;
    }
    myApp.setProgressbar(document.getElementById("expbar"), (this.exp.cur - this.exp.last) / (this.exp.next - this.exp.last)*100, 1000);
  }
}
