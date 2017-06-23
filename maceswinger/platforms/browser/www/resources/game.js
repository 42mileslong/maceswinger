function gameloop() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
  if (p.state == "fight") {
    curen.slider.step += Math.PI/100*p.accuracy;
    if (curen.slider.step >= 100) {
      curen.slider.step = 0;
    }
    curen.slider.cur = Math.sin(curen.slider.step)*50+50
    var width = Math.floor(Math.min(size.w*.75,(size.h-410)*11/23));
    var height = Math.floor(Math.min(size.h-410,size.w*23/11*.75));
    ctx.drawImage(healthbar,0,0,(Math.ceil(curen.health/curen.healthmax*21)),2,Math.floor((size.w*.75-width/11*21)/2),0,Math.floor(width/11*curen.health/curen.healthmax*21),Math.floor(height/23*2));
    ctx.drawImage(enemiesimg,curen.type[1]*11,0,11,23,Math.floor((size.w*.75-width)/2),0,width,height);
    ctx.drawImage(slider,0,0,21,1,Math.floor((size.w*.75-width/11*21)/2),Math.floor(20*height/23),Math.floor(width/11*21),Math.floor(height/23));
    ctx.drawImage(slider,0,1,Math.round(curen.type[2]/100*21),1,Math.floor((size.w*.75-width/11*21)/2 + curen.slider.range[0]/100*21*width/11), Math.floor(20*height/23), Math.floor(width/11*curen.type[2]/100*21), Math.floor(height/23));
    ctx.drawImage(slider,0,2,3,6,Math.floor((size.w*.75-width/11*21)/2 + curen.slider.cur/100*21*width/11-3*width/22),Math.floor(18*height/23),Math.floor(width/11*3),Math.floor(height/23*6));
    for (var i = 0; i < curen.damnums.length; i++) {
      if (!curen.damnums[i].dead) {
        curen.damnums[i].update();
        ctx.globalAlpha = curen.damnums[i].curalpha;
        ctx.drawImage(curen.damnums[i].img,Math.floor((size.w*.75-width/11*21)/2+width/11*curen.damnums[i].coords.x),Math.floor(curen.damnums[i].coords.y*height/23),Math.floor(width/11*125),Math.floor(height/5*25));
      }
    }
    ctx.globalAlpha = 1;
    //ctx.fillText(curen.health,size.w*.75/2,40);
    curen.update();
    if (!curen.alive) {
      p.expup(curen.exp);
      var items = [new Weapon(curen.lv)];
      if (gamemap.curfeature().bosslevel) {
        for (var i in gamemap.curfeature().bossloot) {
          items.push(gamemap.curfeature().bossloot[i]);
        }
      }
      prompt(items,0);
      if (gamemap.curfeature().bosslevel) {
        gamemap.curfeature().bossloot = [];
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
  //(new Quest(0)).take()
}
function scrollToBottom() {
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
function scrollQuickToBottom() {
  //if (p.state == "fight" || p.state == "loot") {
    //$("#main").animate({ scrollTop: 0}, "slow");
  //}
  if (p.state == "story"){
    $("#main").animate({ scrollTop: $("#story").height()}, 1);
    //$("#main").scrollTop($("#story").height());
  }
}

function continueStory() {

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
function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randlist(list) {
  return list[randint(0, list.length - 1)];
}
function dodgeend() {
  $("#dodge").removeClass("mashbut-reloading");
  settransition(0.01,"dodge");
  if (p.state == "fight") {
    $("#dodge").removeAttr("disabled");
  }
  //document.getElementById("dodge").innerHTML += "1";
}
function hitend() {
  $("#hit").removeClass("mashbut-reloading");
  settransition(0.01,"hit");
  if (p.state == "fight") {
    $("#hit").removeAttr("disabled");
  }
}
function dodgestart() {
  $("#dodge").attr("disabled","disabled");
  $("#dodge").addClass("mashbut-reloading");
  settransition(p.weap.swing,"dodge");
  setTimeout(dodgeend,1000*p.weap.swing);
}
function hitstart() {
  $("#hit").attr("disabled","disabled");
  $("#hit").addClass("mashbut-reloading");
  p.hit(curen);
  settransition(p.weap.swing,"hit");
  setTimeout(hitend,1000*p.weap.swing);
}
function resize() {
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
function invover(way) {
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
function togglescreen(way) {
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
class Damnum {
  constructor(amount) {
    var stringint = amount+""
    while (stringint[stringint.length-1] == "0" || stringint[stringint.length-1] == ".") {
      stringint = stringint.substring(0, stringint.length - 1);
    }
    ctxmapchange.clearRect(0,0,mapchange.width,mapchange.height)
    var offset = 0;
    for (var i = 0; i < stringint.length; i++) {
      if (stringint[i] != ".") {
        ctxmapchange.drawImage(damnums,parseInt(stringint[i])*5,0,5,5,i*5-offset,0,5,5);
      }
      else {
        offset = 2
        ctxmapchange.drawImage(damnums,0,1,2,2,i*5+1,3,2,2)
      }
    }
    this.img = new Image();
    this.img.src = mapchange.toDataURL();
    this.curalpha = 1
    this.dead = false;
    this.coords = {
      x: randint(0,6),
      y: randint(2,18)
    }
  }
  update() {
    this.curalpha -= .005;
    this.coords.y += 0.01;
    if (this.curalpha < 0.02) {
      this.dead = true;
    }
  }
}
