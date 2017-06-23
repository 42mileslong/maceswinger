class player {
  constructor() {
    this.name = "";
    this.gold = 0;
    this.health = 0;
    this.accuracy = 1;
    this.exp = {
      cur: 0,
      next: 100,
      last: 0,
    }
    this.lv = 1;
    this.inv = [];
    this.questinv = [];
    this.activequests = [];
    this.invsize = 2;
    this.invfull = false;
    var we = new Weapon(0,"handz");
    we.addtoinv(this,"eqweap");
    this.state = "story";
    this.refreshinv();
    this.coords = {
      x: 0,
      y: 0,
    }
    this.stats = {
      quests_taken: 0,
      enemies_killed: 0,
    }
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
    if (en.slider.range[0] <= en.slider.cur && en.slider.range[1] >= en.slider.cur) {
      var dam = this.weap.getdam();
      en.health -= dam;
      en.damnums.push(new Damnum(dam));
      if (this.weap.status.induces) {
        en.setstatus(this.weap.status.type,this.weap.status.duration,this.weap.status.damduration,this.weap.status.damage,true);
      }
    }
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
  setstate(state,type="normal") {
    p.state = state;
    if (state == "loot") {
      $("#dodge").attr("disabled","disabled");
      $("#hit").attr("disabled","disabled");
    }
    else if (state == "fight") {
      var curenlvl = null;
      $("#dodge").removeAttr("disabled");
      $("#hit").removeAttr("disabled");
      if (type == "normal") {curenlvl = Math.max(randint(-2,2) + gamemap.curlvl,0);}
      else if (type == "easy") {curenlvl = Math.max(randint(-4,0) + gamemap.curlvl,0);}
      else if (type == "hard") {curenlvl = Math.max(randint(0,4) + gamemap.curlvl,0);}
      else if (type == "boss") {curenlvl = Math.max(randint(2,6) + gamemap.curlvl,0);}
      curen = new enemy(curenlvl,randlist(["an","bn","am","bm"]));
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
  move(dir) { // this gets called twice when player moves, for some reason (ink bug?)
    if (dir == "west") {gamemap.setplayer(this.coords.x-.5,this.coords.y)}
    else if (dir == "east") {gamemap.setplayer(this.coords.x+.5,this.coords.y)}
    else if (dir == "north") {gamemap.setplayer(this.coords.x,this.coords.y-.5)}
    else if (dir == "south") {gamemap.setplayer(this.coords.x,this.coords.y+.5)}
  }
  updatestats() {
    document.getElementById("statspage").innerHTML = "Enemies killed: " + this.stats.enemies_killed + "<br />Quests taken: " + this.stats.quests_taken;
  }
}
