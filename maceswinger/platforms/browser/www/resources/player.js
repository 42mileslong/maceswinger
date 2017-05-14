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
    this.weap = we;
    this.state = "fight";
  }
  equipweap(invslot) {
    $(this.weap.element).remove();
    this.weap.addtoinv(this,"invw");
    this.weap = this.inv[invslot];
    $(this.inv[invslot].element).remove();
    this.inv[invslot] = null;
    settransition(this.weap.swing);
    this.weap.addtoinv(this,"eqweap");
    $(this.weap.element).addClass("weapselected");
  }
  hit(en) {
    curen.health -= this.weap.dam;
    curen.update();
  }
  drop(id) {
    this.inv[id].element.remove();
    this.inv[id] = null;
  }
}
