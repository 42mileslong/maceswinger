var entypes = [
  [["Knight",2,30],["Afroman?",4,50],["Meerkat",8,20]],//above normal
  [["Bat",3,10],["Rat",6,20]],//below normal
  [["Shrubbery",1,40],["Ogre",5,40]], //above magical
  [["Skeleton",0,30],["Goblin",7,30]], //below magical
]
class enemy {
  constructor(lv,area) {
    this.lv = lv;
    this.slider = {
      max: 100,
      step: 0,
      cur: 0,
      range: null,
    }
    //this.weapon = new Weapon(lv);
    this.golddropped = randint(-lv,lv) + 2*lv;
    this.exp = this.lv * 1.1 + 10;
    this.health = this.healthmax = 15 + this.lv * 2;
    this.alive = true;
    this.status = {
      name: "none",
      duration: 0,
      active: false,
      cur_dam_duration: 0,
      max_dam_duration: 0,
      damage: 0,
    }
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
    this.name = this.type[0];
    this.slider.range = [Math.floor(this.slider.max/2 - this.type[2]/2),Math.floor(this.slider.max/2 + this.type[2]/2)];
    this.damnums = [];
  }
  update() {
    if (this.status.active) {
      this.status.duration--
      this.status.cur_dam_duration++
      if (this.status.cur_dam_duration > this.status.max_dam_duration) {
        this.status.cur_dam_duration = 0;
        this.health -= this.status.damage;
        this.damnums.push(new Damnum(this.status.damage));
      }
      if (this.status.duration <= 0) {
        this.setstatus("none",0,0,0);
      }
    }
    if (this.health <= 0) {
      this.kill();
      p.stats.enemies_killed++;
      p.updatestats();
    }
  }
  setstatus(name,duration,maxdamdur,dam,active = false) {
    this.status = {
      name: name,
      duration: duration,
      active: active,
      cur_dam_duration: 0,
      max_dam_duration: maxdamdur,
      damage: dam,
    }
  }
  kill() {
    this.alive = false;
  }
}
