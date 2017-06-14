var difficulty_names = ["Trivial", "Ordinary", "Noteworthy", "Epic", "Heroic", "Ledgendary"];
var names_first = ["Tim", "John", "Will", "Gregory", "Isaac", "Jimmy", "Chris", "David"] //temp
var names_last = ["Newton", "Smith", "Mendel", "Wu"] //temp
var quest_items = ["Hoe", "Pickaxe", "Tiara", "Fork", "Spoon"] //temp
var help = ["Can I help?", "Are you OK?", "Is there any way I could assist your dillema?"]
var and = ["And...", "And?", "Go on.", "Keep talking.", "You were saying..."]
var affirmative = ["Yup.", "Yep.", "Of course.", "Yes, I am.", "Affirmative."]
var relatives = ["Mother", "Sister", "Brother", "Father", "Aunt", "Uncle", "Grandfather", "Grandmother"];
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
    this.stage = -1;
    this.diff = {
      num: Math.min(Math.floor(lv / 5),5),
      name: difficulty_names[Math.min(Math.floor(lv / 5),5)]
    }
    this.questpattern = randlist(quest_patterns[0]);//this.diff.num]);
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
        exp: 300,
        gold: 30
      }
      var tempdun = gamemap.returnclostest("dungeon");
      var tempcity = gamemap.returnclostest("city");
      this.stages = [[tempdun,"Delve into the nearby dungeon of " + tempdun.name + " in search of " + this.item.sdesc + "."],[tempcity,"Return with " + this.item.sdesc + " to " + tempcity.name + "."]];
      this.start = ["Investigate the soft whimpering emitting from a nearby alleyway.","You see a despondant man crying silently in the back of the alley, rocking back and forth in the fetal position.  Which is kinda disgusting, considering the refuse blanketing the ground.","Make uncomfortable eye contact.","The man stares back. 'Help!' he cries, somewhat awkwardly.", randlist(help)+"","'Well, I guess,' the man sniffles.  His nose is running profusely. 'You see, I...lost an important family heirloom while courousing last night in the countryside.'", randlist(and)+"","'It's my treasured " + this.item.name + " - my " + randlist(relatives) + "'s going to be very upset!'","Fine, I'll help.","'You will?  Great! I'm pretty sure it (somehow) ended up inside " + tempdun.name + ".  You could try looking there.  By the way, I'm " + this.giver.fname + ". Now get going!'","Leave " + this.giver.fname + "."];
      this.end = [["Talk to " + this.giver.fname + ".","'You're back? Already? Wait - you don't have my " + this.item.name + " yet, don't you.  Don't come back until you do.",randlist(affirmative)+""],["Talk to " + this.giver.fname + ".", "'Wow, you found it?  Great!'","Yes, great.", "'You're probably expecting some sort of reward, aren't you? '",randlist(affirmative)+"","'Well, here you go then.  See you around!'","Do me a favor and hold onto that " + this.item.name + "."]];
      this.curprompt = this.start;
      this.curpromptindex = 0;
      this.recentlytaken = false;
    }
  }
  take() {
    p.quests_taken++;
    this.recentlytaken = true;
    this.curprompt = this.end[0];
    this.curpromptindex = 0;
    this.stage = 0;
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
    if (this.stage = this.stages.length-1) {
      this.curprompt = this.end[1];
    }
    this.curpromptindex = 0;
  }
  nextprompt(cont,much=0) {
    if (cont) {this.curpromptindex+= much;}
    //console.log(this.curpromptindex, "next")
    return this.curprompt[Math.ceil(this.curpromptindex)];
  }
  contprompts() {
    console.log(this.curpromptindex,"cont")
    if (this.curpromptindex < this.curprompt.length-1 && !this.recentlytaken) {
      return 1;
    }
    else if (!this.recentlytaken && this.stage == -1) {
      this.take();
      var parr = this;
      setTimeout(function(){parr.recentlytaken = false; }, 10);
      return 0;
    }
    else if (!this.recentlytaken && this.stage == this.stages.length-1) {
      this.recentlytaken = true
      document.getElementById(this.parid).remove()
      document.getElementById(this.item.card_id).remove()
      p.expup(this.reward.exp);
      p.gold += this.reward.gold;
      return 0
    }
    else {//function this gets called like 4 times for some reason during each quest dialouge option
      return 0
    }
  }
}
