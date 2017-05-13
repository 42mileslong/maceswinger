class player {
  constructor() {
    this.name = "";
    this.gold = 0;
    this.health = 0;
    this.exp = 0;
    this.lv = 0;
    this.inv = [];
    var we = new weapon(0,"handz");
    we.addtoinv(this);
    this.weap = we;
    this.state = "fight";
    this.hit = {
      ble: true,
      count: 60 * this.weap.swing,
      max: 60 * this.weap.swing,
    }
  }
  hitupdate() {
    if (!this.hit.ble) {
      this.count--;
      if (this.count <= 0) {
        this.hit.ble = true;
        this.hit.count = this.hit.max;
      }
    }
  }
  equipweap(invslot) {
    $(this.weap.element).remove();
    this.weap.addtoinv(this);
    this.weap = this.inv[invslot];
    this.hit.count = this.hit.max = 60*this.weap.swing;
    settransition(this.weap.swing);
    $(this.weap.element).addClass("weapselected");
  }
}
