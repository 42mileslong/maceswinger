class player {
  constructor() {
    this.name = "";
    this.gold = 0;
    this.health = 0;
    this.exp = 0;
    this.lv = 0;
    this.inv = [];
    var we = new weapon(0,"handz");
    we.addtoinv(this)
    this.weap = this.inv[0];
  }
}
