var difficulty_names = ["Trivial", "Ordinary", "Noteworthy", "Epic", "Heroic", "Ledgendary"];
var names_first = ["Tim", "John", "Will", "Gregory", "Isaac", "Jimmy", "Chris", "David"] //temp
var names_last = ["Newton", "Smith", "Mendel", "Wu"] //temp
var quest_items = ["Hoe", "Pickaxe", "Tiara", "Fork", "Spoon"] //temp
var help = ["Can I help?", "Are you OK?", "Is there any way I could assist your dillema?"]
var and = ["And...", "And?", "Go on.", "Keep talking.", "You were saying..."]
var affirmative = ["Yup.", "Yep.", "Of course.", "Yes, I am.", "Affirmative."]
var relatives = ["Mother", "Sister", "Brother", "Father", "Aunt", "Uncle", "Grandfather", "Grandmother"];
var quest_patterns = [
  ["closefetch","dmerchant"], // difficulty 0
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
    this.questindex = curquestindex;
    curquestindex++;
    this.questpattern = randlist(quest_patterns[0]);//this.diff.num]);
    this.recentlytaken = false;
    if (this.questpattern == "closefetch") {
      this.type = "js"
      this.giver = {
        fname: randlist(names_first),
        lname: randlist(names_last)
      }
      this.item = [new Item("temp",this.giver.fname + " " + this.giver.lname,randlist(quest_items),[this.questindex,0],this)];
      this.name = "Fetch " + this.item[0].sdesc;
      this.item[0].desc = "An item required by " + this.giver.fname + " to complete the quest '" + this.name + "'.";
      this.desc = this.giver.fname + " has asked me to retrieve his treasured " + this.item[0].name + ".  Sounds like a waste of time.";
      this.reward = {
        exp: 300,
        gold: 30
      }
      var tempdun = gamemap.returnclostest("dungeon")[0][1];
      var tempcity = gamemap.returnclostest("city")[0][1];
      this.stages = [[tempdun,"Delve into the nearby dungeon of " + tempdun.name + " in search of " + this.item[0].sdesc + "."],[tempcity,"Return with " + this.item[0].sdesc + " to " + tempcity.name + "."]];
      this.start = ["Investigate the soft whimpering emitting from a nearby alleyway.","You see a despondant man crying silently in the back of the alley, rocking back and forth in the fetal position.  Which is kinda disgusting, considering the refuse blanketing the ground.","Make uncomfortable eye contact.","The man stares back. 'Help!' he cries, somewhat awkwardly.", randlist(help)+"","'Well, I guess,' the man sniffles.  His nose is running profusely. 'You see, I...lost an important family heirloom while courousing last night in the countryside.'", randlist(and)+"","'It's my treasured " + this.item[0].name + " - my " + randlist(relatives) + "'s going to be very upset!'","Fine, I'll help.","'You will?  Great! I'm pretty sure it (somehow) ended up inside " + tempdun.name + ".  You could try looking there.  By the way, I'm " + this.giver.fname + ". Now get going!'","Leave " + this.giver.fname + "."];
      this.end = [["Talk to " + this.giver.fname + ".","'You're back? Already? Wait - you don't have my " + this.item[0].name + " yet, don't you.  Don't come back until you do.",randlist(affirmative)+""],["Talk to " + this.giver.fname + ".", "'Wow, you found it?  Great!'","Yes, great.", "'You're probably expecting some sort of reward, aren't you?'",randlist(affirmative)+"","'Well, here you go then.  See you around!'","Do me a favor and hold onto that " + this.item[0].name + "."]];
      this.substagecountdown = 0;
    }
    else if (this.questpattern == "dmerchant") {
      this.type = "ink";
      this.item = [
        new Item("The Alliterative Merchant's prized Dazzeling Diamond Decanter.","Alliterative Merchant","Dazzeling Diamond Decanter",[this.questindex,0],this),
        new Item("The Alliterative Merchant's darling Downscaled Dogwood Doorjamb.","Alliterative Merchant","Downscaled Dogwood Doorjamb",[this.questindex,1],this),
        new Item("The Alliterative Merchant's treasured Durable Duralumin Dumbell.","Alliterative Merchant","Durable Duralumin Dumbell",[this.questindex,2],this)
      ];
      this.reward = {
        exp: 900,
        gold: 100
      }
      var duns = gamemap.returnclostest("dungeon");
      var city = gamemap.returnclostest("city")[0][1];
      this.stages = [[duns,"Explore the nearby dungeons of " + duns[0][1].name + ", " + duns[1][1].name + " and " + duns[2][1].name + " to recover the Dazzeling Diamond Decanter, the Downscaled Dogwood Doorjamb, and the Durable Duralumin Dumbell."],[city,"Return to the city of " + city.name + " to return the Dazzeling Diamond Decanter, the Downscaled Dogwood Doorjamb, and the Durable Duralumin Dumbell."]];
      this.start = ["Approach a distressed looking merchant."];
      this.end = [["Discuss your ongoing quest with the alliterative merchant."],["Present the alliterative merchant his prized possessions."]]
      this.desc = "A local merchant with a propensity for alliteration has requested my assistance to retrieve several prized artifacts.  Of course, the merchant's gone out of his way to name these artifacts in the most alliterative way possible - I mean, what even IS a Downscaled Dogwood Doorjamb?";
      this.name = "The Alliterative Merchant";
      this.substagecountdown = 2;
    }
    this.curprompt = this.start;
    this.curpromptindex = 0;
    this.done = false;
  }
  take() {
    if (!this.recentlytaken) {
      p.stats.quests_taken++;
      p.updatestats();
      this.recentlytaken = true;
      this.curprompt = this.end[0];
      this.curpromptindex = 0;
      this.stage = 0;
      if (this.questpattern == "closefetch") {
        this.stages[0][0].addbossloot(this.item[0]);
      }
      else if (this.questpattern == "dmerchant") {
        this.stages[0][0][0][1].addbossloot(this.item[0]);
        this.stages[0][0][1][1].addbossloot(this.item[1]);
        this.stages[0][0][2][1].addbossloot(this.item[2]);
      }
      this.parid = "quest"+p.stats.quests_taken;
      addelement(document.getElementById("questpage"),"div","card",this.parid);
      addelement(document.getElementById(this.parid),"div","card-header",this.parid + "head",this.name);
      addelement(document.getElementById(this.parid),"div","card-content",this.parid + "wrapper");
      addelement(document.getElementById(this.parid + "wrapper"),"div","card-content-inner",null,this.desc);
      addelement(document.getElementById(this.parid),"div","card-footer",this.parid + "footer",this.stages[this.stage][1]);
      p.activequests.push(this);
    }
  }
  endquest() {
    if (!this.done) {
      document.getElementById(this.parid).remove()
      for (var i = 0; i < this.item.length; i++) {
        document.getElementById(this.item[i].card_id).remove()
      }
      p.expup(this.reward.exp);
      p.gold += this.reward.gold;
      p.activequests.splice(p.activequests.indexOf(this), 1);
      this.done = true
    }
  }
  updatestage() {
    if (this.substagecountdown > 0) {
      this.substagecountdown--;
    }
    else {
      this.stage++;
      document.getElementById(this.parid + "footer").innerHTML = this.stages[this.stage][1];
      if (this.stage = this.stages.length-1) {
        this.curprompt = this.end[1];
      }
      this.curpromptindex = 0;
    }
  }
  nextprompt(cont,much=0) {
    if (cont) {this.curpromptindex+= much;}
    //console.log(this.curpromptindex, "next")
    return this.curprompt[Math.ceil(this.curpromptindex)];
  }
  contprompts() {
    if (this.type == "ink") {
      return 1;
    }
    else if (this.curpromptindex < this.curprompt.length-1 && !this.recentlytaken) {
      return 1;
    }
    else if (!this.recentlytaken && this.stage == -1 && this.type == "js") {
      this.take();
      var parr = this;
      setTimeout(function(){parr.recentlytaken = false; }, 10);
      return 0;
    }
    else if (!this.recentlytaken && this.stage == this.stages.length-1) {
      this.recentlytaken = true
      this.endquest()
      return 0
    }
    else {//function this gets called like 4 times for some reason during each quest dialouge option
      return 0
    }
  }
}
