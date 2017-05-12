var entypes = [
  [["Knight",2]],//above normal
  [["Bat",3]],//below normal
  [["Shrubbery",1]], //above magical
  [["Skeleton",0]], //below magical
]
class enemy {
  constructor(lv,area) {
    this.lv = lv;
    this.weapon = new weapon(lv);
    this.golddropped = randint(-lv,lv) + 2*lv;
    this.exp = this.lv * 1.1 + 1;
    this.health = 10;
    this.alive = true;
    if (area == "an") {
      this.type = randlist(entypes[0]);
    }
    else if (area == 'bn') {
      this.type = randlist(entypes[1]);
    }
    else if (area == 'am') {
      this.type = randlist(entypes[2]);
    }
    else if (area == 'bm') {
      this.type = randlist(entypes[3]);
    }
  }
  update() {
    if (this.health <= 0) {
      this.kill();
    }
  }
  kill() {
    this.alive = false;
  }
}
