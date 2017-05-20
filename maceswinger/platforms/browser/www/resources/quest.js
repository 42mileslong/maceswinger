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
class quest {
  constructor(lv) {
    this.diff = {
      num: Math.min(Math.floor(lv / 5),5),
      name: difficulty_names[Math.min(Math.floor(lv / 5),5)];
    }
    this.questpattern = randlist(quest_patterns[this.diff]);
    if (this.questpattern == "closefetch") {
      this.giver = {
        fname: randlist(names_first),
        lname: randlist(names_last)
      }
      this.item = new Item("An item needed by " + this.giver.fname + " to complete a quest.",this.giver.fname + "'s " + randlist(quest_items));
      this.desc = this.giver + " has asked me to retrieve his treasured " + this.item.name + ".  Sounds like a waste of time.";
      this.reward = {
        exp: 100,
        gold: 30
      }
    }
  }
}
