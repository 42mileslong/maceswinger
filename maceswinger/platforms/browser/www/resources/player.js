class player {
  constructor() {
    this.name = "";
    this.gold = 0;
    this.health = {
        max: 20,
        cur: 20,
    }
    this.points = [["Strength",5],["Intelligence",5],["Dexterity",5],["Luck",5]];
    this.traits = [[],[]];//first short name (easy search), second full trait
    this.freepoints = 5;
    this.accuracy = 1.5; //lower = better
    this.exp = {
      cur: 0,
      next: 100,
      last: 0,
      mult: 1,
    }
    this.lv = 1;
    this.inv = [];
    this.questinv = [];
    this.activequests = [];
    this.invsize = 2;
    this.invfull = false;
    this.selectedtraits = [];
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
    this.mods = {
      melee: 1,
      swing: 1,
    };
  }
  refreshstats() {//apply points during char creation
    this.accuracy *= (5-this.points[2][1])/20+1;//dex up = accuracy up (b/c smaller accuracy = more accurate)
    this.health.max += this.points[0][1]*2;//str up = health up
    this.mods.melee *= (this.points[0][1]-5)/20+1;//str up = melee dam up
    this.mods.swing *= (5-(this.points[0][1]+this.points[2][1])/2)/20+1;//str and dex up = swing time down
    this.exp.mult *= (this.points[1][1]-5)/20+1;//int up exp multiplier up (moar int = moar exp)
    this.health.cur = this.health.max;
  }
  applytrait(trait) {//apply traits from char creation
    this.traits[0].push(trait[0]);
    this.traits[1].push(trait);
    if (trait[0] == "hh") {
      this.mods.melee *= 1.25;
      this.mods.swing *= 1.25;
    }
    else if (trait[0] == "sc") {
      this.points[3][1]++;
      this.mods.melee *= .9;
    }
    else if (trait[0] == "ff") {
      this.accuracy *= 1.25;
      this.mods.swing *= .75;
    }
    else {
      console.log("error applying trait");
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
    if (en.atk.atking && en.atk.rangenums[0] <= en.slider.cur && en.atk.rangenums[1] >= en.slider.cur) {
      en.damnums.push(new Damnum("Blocked!"));
      en.attackfinished();
    }
    else if (en.slider.range[0] <= en.slider.cur && en.slider.range[1] >= en.slider.cur) {
      var dam = this.weap.getdam();
      en.health -= dam;
      en.damnums.push(new Damnum(dam,this.weap.status.damcolor));
      if (this.weap.status.induces && randint(0,1) == 1) {//50% chance magic weapon inflicts its status effect
        en.setstatus(this.weap.status.type,this.weap.status.duration,this.weap.status.damduration,this.weap.status.damage,this.weap.status.damcolor,true);
        if (this.weap.status.type == "Lightning") {
          en.damnums.push(new Damnum("Paralyzed!"));
          en.paralyzed = true;
          en.attackfinished();
        }
      }
    }
  }
  dealhit(dam) { //called when player is hit
    this.health.cur -= dam;
    myApp.setProgressbar(document.getElementById("healthbar"), this.health.cur/this.health.max*100, 1000);
    if (this.health.cur <= 0) {
      this.setstate("story");
    }
  }
  drop(id) { //to drop an item
    $(this.inv[id].element).remove();
    this.inv[id] = null;
    this.refreshinv();
    if (p.inv.length == p.invsize) {
      invover(false);
    }
  }
  refreshinv() { //reset player inventory id's once item is dropped/added?
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
  droplowest() { //broken, for some reason (supposed to drop weapon with lowest dps)
    var tempslot = 0;
    for (var i in this.inv) {
      if (this.inv[i].damps < this.inv[tempslot].damps) {
        tempslot = i;
      }
    }
    p.drop(tempslot);
  }
  setstate(state,type="normal") { //set different game states (story, loot (item collection), fight)
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
      scrollQuickToTop();
      gameloop();
    }
    else if (state == "story") {
      togglescreen("story");
      if (p.health.cur > 0) {
        story.ChoosePathString("after");
      }
      else {
        story.ChoosePathString("dead");
      }
    }
  }
  expup(exp) { //add player xp
    this.exp.cur += Math.round(exp*this.exp.mult);
    if (this.exp.next <= this.exp.cur) {
      this.lv++;
      document.getElementById("plv").innerHTML = this.lv;
      this.exp.last = this.exp.next;
      this.exp.next += this.exp.next*1.1;
      this.health.max += 2;
      this.health.cur = this.health.max;
      myApp.setProgressbar(document.getElementById("healthbar"), this.health.cur/this.health.max*100, 1000);
    }
    myApp.setProgressbar(document.getElementById("expbar"), (this.exp.cur - this.exp.last) / (this.exp.next - this.exp.last)*100, 1000);
  }
  move(dir) { // this gets called twice when player moves, for some reason (ink bug?) Super annoying, but this works around it
    if (dir == "west") {gamemap.setplayer(this.coords.x-.5,this.coords.y)}
    else if (dir == "east") {gamemap.setplayer(this.coords.x+.5,this.coords.y)}
    else if (dir == "north") {gamemap.setplayer(this.coords.x,this.coords.y-.5)}
    else if (dir == "south") {gamemap.setplayer(this.coords.x,this.coords.y+.5)}
  }
  updatestats() { //refresh player stats (on stats page)
    document.getElementById("statspage").innerHTML = "Enemies killed: " + this.stats.enemies_killed + "<br />Quests taken: " + this.stats.quests_taken;
  }
}
