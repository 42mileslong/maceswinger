var difficulty_names = ["Trivial", "Ordinary", "Noteworthy", "Epic", "Heroic", "Ledgendary"];
var names_first = ["Tim", "John", "Will", "Gregory", "Isaac", "Jimmy", "Chris", "David"] //temp
var names_last = ["Newton", "Smith", "Mendel", "Wu"] //temp
var quest_items = ["Hoe", "Pickaxe", "Tiara", "Fork", "Spoon"] //temp
var quest_patterns = [
  ["closefetch"], // difficulty 0
  [], //difficulty 1
  [], //difficulty 2
  [], //difficulty 3
  [], //difficulty 4
  [], //difficulty 5
]
class Quest {
  constructor(lv) {
    this.stage = 0;
    this.diff = {
      num: Math.min(Math.floor(lv / 5),5),
      name: difficulty_names[Math.min(Math.floor(lv / 5),5)]
    }
    this.questpattern = randlist(quest_patterns[this.diff.num]);
    if (this.questpattern == "closefetch") {
      this.giver = {
        fname: randlist(names_first),
        lname: randlist(names_last)
      }
      this.item = new Item("temp",this.giver.fname + " " + this.giver.lname,randlist(quest_items));
      this.name = "Fetch " + this.item.sdesc;
      this.item.desc = "An item required by " + this.giver.fname + " to complete the quest '" + this.name + "'.";
      this.item.quest = this;
      this.desc = this.giver.fname + " has asked me to retrieve his treasured " + this.item.name + ".  Sounds like a waste of time.";
      this.reward = {
        exp: 100,
        gold: 30
      }
      var tempdun = gamemap.returnclostest("dungeon");
      var tempcity = gamemap.curfeature();
      this.stages = [[tempdun,"Delve into the nearby dungeon of " + tempdun.name + " in search of " + this.item.sdesc + "."],[tempcity,"Return with " + this.item.sdesc + " to " + tempcity.name + "."]];
    }
  }
  take() {
    p.quests_taken++;
    this.stages[0][0].addbossloot(this.item);
    this.parid = "quest"+p.quests_taken;
    addelement(document.getElementById("questpage"),"div","card",this.parid);
    addelement(document.getElementById(this.parid),"div","card-header",this.parid + "head",this.name);
    addelement(document.getElementById(this.parid),"div","card-content",this.parid + "wrapper");
    addelement(document.getElementById(this.parid + "wrapper"),"div","card-content-inner",null,this.desc);
    addelement(document.getElementById(this.parid),"div","card-footer",this.parid + "footer",this.stages[this.stage][1]);
  }
  updatestage() {
    this.stage++;
    document.getElementById(this.parid + "footer").innerHTML = this.stages[this.stage][1];
  }
}
