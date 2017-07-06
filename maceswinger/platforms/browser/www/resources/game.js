function gameloop() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
  if (p.state == "fight") {
    if (!combatpaused) {
      //update slider position
      curen.slider.step += Math.PI/100*p.accuracy;
      if (curen.slider.step >= 100) {
        curen.slider.step = 0;
      }
      curen.slider.cur = Math.sin(curen.slider.step)*50+50;
    }
    //variables for drawing enemy screen
    var width = Math.floor(Math.min(size.w*.75,(size.h-410)*11/23));
    var height = Math.floor(Math.min(size.h-410,size.w*23/11*.75));

    //drawing enemy screen (yes this is a YUGE mess, I'm really sorry)
    ctx.drawImage(healthbar,0,0,(Math.ceil(curen.health/curen.healthmax*21)),2,Math.floor((size.w*.75-width/11*21)/2),0,Math.floor(width/11*curen.health/curen.healthmax*21),Math.floor(height/23*2));//enemy health
    ctx.drawImage(enemiesimg,curen.type[1]*11,0,11,23,Math.floor((size.w*.75-width)/2),0,width,height);//enemy sprite
    ctx.drawImage(slider,0,0,21,1,Math.floor((size.w*.75-width/11*21)/2),Math.floor(20*height/23),Math.floor(width/11*21),Math.floor(height/23));//slider green bar
    ctx.drawImage(slider,0,1,Math.round(curen.type[2]/100*21),1,Math.floor((size.w*.75-width/11*21)/2 + curen.slider.range[0]/100*21*width/11), Math.floor(20*height/23), Math.floor(width/11*curen.type[2]/100*21), Math.floor(height/23)); //slider red health bar
    if (curen.atk.atking) {
      ctx.drawImage(slider,0,7,Math.round(curen.atk.cur_slider_range/100*21),1,Math.floor((size.w*.75-width/11*21)/2 + curen.atk.rangenums[0]/100*21*width/11), Math.floor(20*height/23), Math.floor(width/11*curen.atk.cur_slider_range/100*21), Math.floor(height/23)); //slider yellow hit bar
    }
    ctx.drawImage(slider,0,2,3,6,Math.floor((size.w*.75-width/11*21)/2 + curen.slider.cur/100*21*width/11-3*width/22),Math.floor(18*height/23),Math.floor(width/11*3),Math.floor(height/23*6));//slider pointer
    //update floaty damage numbers
    for (var i = 0; i < curen.damnums.length; i++) {
      if (!curen.damnums[i].dead) {
        if (!combatpaused) {curen.damnums[i].update();} //so they don't keep floating down/despawning while combat paused
        ctx.globalAlpha = curen.damnums[i].curalpha;
        ctx.drawImage(curen.damnums[i].img,Math.floor((size.w*.75-width/11*21)/2+width/11*curen.damnums[i].coords.x),Math.floor(curen.damnums[i].coords.y*height/23),Math.floor(width/11*125),Math.floor(height/5*25));//draw floaty damage number
      }
    }
    ctx.globalAlpha = 1;
    //ctx.fillText(curen.health,size.w*.75/2,40);
    if (!combatpaused) {
      curen.update();
      //post-fight stuffz (loot, exp)
      if (!curen.alive) {
        p.expup(curen.exp);
        var items = [];
        if (gamemap.curfeature().bosslevel) {
          for (var i in gamemap.curfeature().bossloot) {
            items.push(gamemap.curfeature().bossloot[i]);
          }
        }
        items.push(new Weapon(curen.lv,"player","player"));
        prompt(items,0);
        if (gamemap.curfeature().bosslevel) {
          gamemap.curfeature().bossloot = [];
        }
      }
    }
    window.requestAnimationFrame(gameloop);
  }
  else if (p.state == "loot") {
    window.requestAnimationFrame(gameloop);
  }
  else if (p.state == "story") {
    continueStory();
  }
}
function settransition(time,par) {
  $("#" + par).css({
    "transition": (time + "s ease-in"),
    "-webkit-transition": (time + "s ease-in"),
    "-moz-transition": (time + "s ease-in"),
    "-ms-transition": (time + "s ease-in"),
    "-o-transition": (time + "s ease-in"),
  });
}
function showAfter(delay, el) {
    setTimeout(function() { el.classList.add("show") }, delay);
}
function init() {
  resize();
  ctxmapchange.imageSmoothingEnabled = false;
  ctxmapchange.mozImageSmoothingEnabled = false;
  ctxmapchange.oImageSmoothingEnabled = false;
  ctxmapchange.webkitImageSmoothingEnabled = false;
  gamemap = new Map(10,10);
  gamemap.setplayer(0,0);
  gamemap.addquests();
  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.oImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctxchange.imageSmoothingEnabled = false;
  ctxchange.mozImageSmoothingEnabled = false;
  ctxchange.oImageSmoothingEnabled = false;
  ctxchange.webkitImageSmoothingEnabled = false;
  p.equipweap(0);
  p.updatestats();
  togglescreen("story");
  window.requestAnimationFrame(gameloop);
  ctx.fillStyle = 'rgba(0, 0, 0)';
  story.BindExternalFunction("refreshlines", function() {
    var curlocation = gamemap.map[Math.round(p.coords.x)][Math.round(p.coords.y)];
    story.variablesState["curprompt1"] = curlocation.quests[0].nextprompt(false);
    story.variablesState["curprompt2"] = curlocation.quests[1].nextprompt(false);
    story.variablesState["curprompt3"] = curlocation.quests[2].nextprompt(false);
  });

  // left/right pane opening/closing event listeners, to pause/restart combat DOESN'T WORK FOR WHATEVER REASON WHYYYYYYY see here http://framework7.io/docs/side-panels.html
  Dom7("#leftpanel").on('panel:open', function () {togglecombat(false);});
  Dom7("#leftpanel").on('panel:close', function () {togglecombat(true);});
  Dom7("#rightpanel").on('panel:open', function () {togglecombat(false);});
  Dom7("#rightpanel").on('panel:close', function () {togglecombat(false);});
}
function scrollToBottom() { //default animated ink text scroller (too slow)
    var progress = 0.0;
    var start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var dist = document.body.scrollHeight - window.innerHeight - start;
    if( dist < 0 ) return;

    var duration = 0 + 300*dist/100;
    var startTime = null;
    function step(time) {
        if( startTime == null ) startTime = time;
        var t = (time-startTime) / duration;
        var lerp = 3*t*t - 2*t*t*t;
        window.scrollTo(0, start + lerp*dist);
        if( t < 1 ) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
function scrollQuickToBottom() { //super fast scroller (faster yay)
  if (p.state == "story"){
    $("#main").animate({ scrollTop: $("#story").height()}, 1);
  }
}
function scrollQuickToTop() { //same as above but hopefully to top
  $("#main").animate({ scrollTop: 0}, 1);
}

function continueStory() { //default ink function for printing story lines

    var paragraphIndex = 0;
    var delay = 0.0;

    // Generate story text - loop through available content
    while(story.canContinue) {

        // Get ink to generate the next paragraph
        var paragraphText = story.Continue();

        // Create paragraph element
        var paragraphElement = document.createElement('p');
        paragraphElement.innerHTML = paragraphText;
        storyContainer.appendChild(paragraphElement);

        // Fade in paragraph after a short delay
        showAfter(delay, paragraphElement);

        delay += 100.0;
    }

    // Create HTML choices from ink choices
    story.currentChoices.forEach(function(choice) {

        // Create paragraph with anchor element
        var choiceParagraphElement = document.createElement('p');
        choiceParagraphElement.classList.add("choice");
        choiceParagraphElement.innerHTML = `<a href='#'>${choice.text}</a>`
        storyContainer.appendChild(choiceParagraphElement);

        // Fade choice in after a short delay
        showAfter(delay, choiceParagraphElement);
        delay += 100.0;

        // Click on choice
        var choiceAnchorEl = choiceParagraphElement.querySelectorAll("a")[0];
        choiceAnchorEl.addEventListener("click", function(event) {

            // Don't follow <a> link
            event.preventDefault();

            // Remove all existing choices
            var existingChoices = storyContainer.querySelectorAll('p.choice');
            for(var i=0; i<existingChoices.length; i++) {
                var c = existingChoices[i];
                c.parentNode.removeChild(c);
            }

            // Tell the story where to go next
            story.ChooseChoiceIndex(choice.index);

            // Aaand loop
            continueStory();
        });
    });
    scrollQuickToBottom();
}
function togglecombat(way) { //supposed to pause combat, but event listeners not working for side panels
  console.log("yay")
  combatpaused = !way;
}
function randint(min, max) { //easy random integer b/t min and max, inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randlist(list) { //easy random element from list
  return list[randint(0, list.length - 1)];
}
function dodgeend() { //dodge button flips to ready state
  $("#dodge").removeClass("mashbut-reloading");
  settransition(0.01,"dodge");
  if (p.state == "fight") {
    $("#dodge").removeAttr("disabled");
  }
}
function hitend() { //swing button flips to ready state
  $("#hit").removeClass("mashbut-reloading");
  settransition(0.01,"hit");
  if (p.state == "fight") {
    $("#hit").removeAttr("disabled");
  }
}
function dodgestart() { //dodge button flip to 'reloading' state
  $("#dodge").attr("disabled","disabled");
  $("#dodge").addClass("mashbut-reloading");
  settransition(p.weap.swing,"dodge");
  setTimeout(dodgeend,1000*p.weap.swing);
}
function hitstart() { //swing button flip to 'reloading' state
  $("#hit").attr("disabled","disabled");
  $("#hit").addClass("mashbut-reloading");
  p.hit(curen);
  settransition(p.weap.swing,"hit");
  setTimeout(hitend,1000*p.weap.swing);
}
function resize() { //resize canvas (enemyscreen) dimensions
  size = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight
  }
  ctx.canvas.width = size.w*.75;
  ctx.canvas.height = size.h - 410;
  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.oImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
}
function invover(way) { //controls alert that inventory is full (flips both ways (creates and deletes button))
  var ico = document.getElementById("invicon");
  p.invfull = way;
  if (way) {
    $(ico).addClass("color-red");
    var idd = "temp";
    var iddd = "temp2";
    addelement(document.getElementById("main"),"div","card",idd,null,"width:260px;position:absolute");
    document.getElementById(idd).style.left = size.w/2-135 + "px";
    document.getElementById(idd).style.top = size.h*1/3 + "px";
    addelement(document.getElementById(idd),"div","card-header",idd + "head","Inventory Full!");
    addelement(document.getElementById(idd),"div","card-content",iddd);
    addelement(document.getElementById(iddd),"div","card-content-inner",null,"Drop an item from your inventory or<a href='#' class='button' style='height:100%' id='tempdrop'>Drop Lowest DPS Item</a>");
    $("#tempdrop").click(function() {
      p.droplowest();
    });
  }
  else {
    $(ico).removeClass("color-red");
    document.getElementById("temp").remove();
    p.setstate("story");
  }
}
function togglescreen(way) { //flips screen state - to ink story or fight screen
  if (way == "story") {
    $("#fight").hide({duration:0});
    $("#story").show({duration:0,easing:"linear"});
    document.getElementById("inkstyle").disabled = undefined;
    document.getElementById("main").style.overflow = "scroll";
  }
  else if (way == "fight") {
    $("#story").hide({duration:0})
    $("#fight").show({duration:0,easing:"linear"})
    document.getElementById("inkstyle").disabled = "disabled";
    document.getElementById("main").style.overflow = "hidden";
  }
  else {
    console.log("error in switching screen");
  }
}
function printcreationstats() {//display core player stats (str, etc.) for modification into ink text 'stream' thingie
  var bigblockotext = document.createElement('p');
  bigblockotext.classList.add("show");
  bigblockotext.id = "creationblock";
  storyContainer.appendChild(bigblockotext);
  for (var i = 0; i < p.points.length; i++) {
    bigblockotext.innerHTML += `<span style="display:table;margin:0 auto"><span> ${p.points[i][0]}:</span><br /><span style="display:table;margin:0 auto"><a href="#" id=${p.points[i][0]}sub><&nbsp&nbsp</a><span id=${p.points[i][0]}num style="font-weight:bold">${p.points[i][1]}</span><a href="#" id=${p.points[i][0]}add>&nbsp&nbsp></a></span></span>`
  }
  bigblockotext.innerHTML += `<span style="display:table;margin:0 auto"><span>Points left: </span><span id='pointsleft' style="font-weight:bold">${p.freepoints}</span></span>`
  bigblockotext.innerHTML +=  `<span style="display:table;margin:0 auto"><a href="#" id="next">Confirm point placement</a></span>`
  document.getElementById("next").onclick = function() {//to perk selection
    document.getElementById("creationblock").remove();
    printtraits();
    return false;
  }
  for (let i = 0; i < p.points.length; i++) {
    document.getElementById(p.points[i][0]+"add").onclick = function() {
      changestat("add",p.points[i]);
      return false;
    }
    document.getElementById(p.points[i][0]+"sub").onclick = function() {
      changestat("sub",p.points[i]);
      return false;
    }
  }
}
function changestat(way,which) {//change displayed stats on button presses
  if (way == "add") {
    if (which[1] < 10 && p.freepoints > 0) {
      which[1]++;
      p.freepoints--;
    }
  }
  else if (way == "sub") {
    if (which[1] > 1) {
      which[1]--;
      p.freepoints++;
    }
  }
  else {
    console.log("error during player stat change")
  }
  document.getElementById(which[0]+"num").innerHTML = which[1];
  document.getElementById("pointsleft").innerHTML = p.freepoints;
}
function printtraits() {//print trait selection stuff
  var bigblockotext = document.createElement('p');
  bigblockotext.classList.add("show");
  bigblockotext.id = "traitblock";
  storyContainer.appendChild(bigblockotext);
  bigblockotext.innerHTML += `<span>You have selected a Strength of ${p.points[0][1]}, an Intelligence of ${p.points[1][1]}, a Dexterity of ${p.points[2][1]}, and a Luck of ${p.points[3][1]}.</span><br />`
  bigblockotext.innerHTML += `<span style="display:table;margin:0 auto">Select up to two traits!  Each has a pro and a con, so choose carefully (or not all)!</span>`
  for (var i = 0; i < traits.length; i++) {
    bigblockotext.innerHTML += `<span style="display:table;margin:0 auto">${traits[i][1]}: ${traits[i][2]}</span><a href="#" id=trait${i} style="display:table;margin:0 auto">Select</a>`
  }
  bigblockotext.innerHTML += `<a href="#" style="display:table;margin:0 auto" id="next">Confirm traits</a>`
  for (let i = 0; i < traits.length; i++) {
    document.getElementById("trait"+i).onclick = function() {
      toggletraitselection(i)
      return false;
    }
  }
  document.getElementById("next").onclick = function(e) {
    e.preventDefault();
    document.getElementById("traitblock").remove();
    for (var i = 0; i < p.selectedtraits.length; i++) {
      p.applytrait(traits[p.selectedtraits[i]]);
    }
    p.refreshstats();
    story.ChoosePathString("aftercreation");
    continueStory();
  }
}
function toggletraitselection(i) { //select/deselect traits in selection screen (character creation)
  var button = document.getElementById("trait"+i);
  if (button.innerHTML == "Select" && p.selectedtraits.length < 2) {
    p.selectedtraits.push(i);
    button.innerHTML = "Selected";
  }
  else if (button.innerHTML == "Selected") {
    p.selectedtraits.splice(p.selectedtraits.indexOf(i), 1);
    button.innerHTML = "Select";
  }
  else if (!p.selectedtraits.length < 2){
    console.log("issue switching button values/selecting trait. sorry.")
  }
}
class Damnum { //floaty damage number class
  constructor(amount,damcolor = "red") {
    this.img = new Image();
    ctxmapchange.clearRect(0,0,mapchange.width,mapchange.height);
    if (amount == "Blocked!") {
      ctxmapchange.drawImage(damnums,0,5,39,5,0,0,39,5);
    }
    else if (amount == "Paralyzed!") {
      ctxmapchange.drawImage(damnums,0,15,51,5,0,0,51,5);
    }
    else {
      var color = 0;
      if (damcolor == "blue") {
        color = 10;
      }
      var stringint = amount+""
      while (stringint[stringint.length-1] == "0" || stringint[stringint.length-1] == ".") {
        stringint = stringint.substring(0, stringint.length - 1);
      }
      var offset = 0;
      for (var i = 0; i < stringint.length; i++) {
        if (stringint[i] != ".") {
          ctxmapchange.drawImage(damnums,parseInt(stringint[i])*5,color,5,5,i*5-offset,0,5,5);
        }
        else {
          offset = 2;
          ctxmapchange.drawImage(damnums,0,1+color,2,2,i*5+1,3,2,2);
        }
      }
    }
    this.img.src = mapchange.toDataURL();
    this.curalpha = 1
    this.dead = false;
    this.coords = {
      x: randint(0,12),
      y: randint(2,18)
    }
  }
  update() {
    this.curalpha -= .005; //controls how fast it fades
    this.coords.y += 0.01; //how fast it moves down
    if (this.curalpha < 0.02) { //"kills" it when alpha low
      this.dead = true;
    }
  }
}
//player traits (probably should be moved somewhere else - JSON?)
var traits = [
  ["hh","Heavy Handed","Your attacks deal more damage, but at the expense of extra swing time.","+25% damage melee, +25% swing speed melee"],
  ["sc","Scrawny","Your small build aids your dexterity; however, you are also hit less hard.","+1 Dex,-10% dam melee"],
  ["ff","Flailing Fanatic","You're adept at swinging fast - very fast.  Hitting your target, however, is a completety different story.","-25% swing speed melee, -25% accuracy"],
]
