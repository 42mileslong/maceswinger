class enemy {
  constructor(lv) {
    this.lv = lv;
    this.weapon = new weapon(lv);
    this.golddropped = randint(-lv,lv) + 2*lv;
    this.exp = this.lv * 1.1 + 1;
  }
}
