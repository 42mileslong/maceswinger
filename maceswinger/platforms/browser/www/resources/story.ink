VAR curenname = ""
VAR fightout = -> move

VAR deepest_lvl = 10
VAR current_lvl = 1
VAR down_chance = 15
VAR up_chance = 5

VAR ablenorth = false
VAR ablesouth = false
VAR ableeast = false
VAR ablewest = false
VAR curlocationname = ""
VAR curlocationtype = ""
VAR curprompt1 = ""
VAR curprompt2 = ""
VAR curprompt3 = ""
VAR questtype1 = ""
VAR questtype2 = ""
VAR questtype3 = ""
VAR curquest = ""
VAR curqueststart = ""

EXTERNAL fight(type)
EXTERNAL displaymap()
EXTERNAL travel(direction)
EXTERNAL bossfight(way)
EXTERNAL nextprompt(quest,howmuch)
EXTERNAL contprompts(quest)
EXTERNAL refreshlines()
EXTERNAL getinkquest(which)
EXTERNAL takeinkquest(which)
EXTERNAL endquest(which)

-> init
=== init ===
{~Hello there!|Hey, you! Yeah, you. The one sitting that the computer!|Greetings!} Welcome to the magical land of Magicland, a land of magic and land! You are an adventurer {~primed|ready} for adventure, armed only with your {~wits|arms} and your bare handz (in that order). You can barely make out the entrance to the dungeon behind you, but that doesn't matter as you prepare to embark on adventure!
    *   Yes!
    *   [Yes.]Yes!!!!
    -   Great!  You just woke up in a dungeon.  Oh no.
    -> move

=== move ===
{~You continue {~walking|trudging|ambling|sauntering|strolling} through {curlocationname}|As you {~walk|trudge|amble|saunter|stroll} through {curlocationname} you {~jump|twitch|shriek|squeal} {~at each {~spooky|scary} noise|as additional cobwebs accumulate on your {~face|arms|legs}}|{~The dungeon echoes|Bats fly out of hidden crevices in the ceiling|The {~walls|floor|ceiling} seem to grow more and more {~damp|slimy}} with each step you take}.
{current_lvl == 0:
    <> Suddenly, you find yourself at the exit! Through the doorway you see a {~forest|marsh|prairie|grassland}{& far below| very far below|}. You appear to be on the side of a {&vast mountain|yuge mountain|small hill}.
}
    +   {current_lvl == 0} [Leave {curlocationname}.]
        -> exitdungeon
    +   {current_lvl != 0} [Walk towards the light.]
        ~ current_lvl--
        { RANDOM(0, 20) > down_chance:
            ~ fight("easy")
            -> DONE
        }
        -> move
    +   {current_lvl < 10} [Walk deeper.]
        ~ current_lvl++
        { RANDOM(0, 20) > up_chance:
            ~ fight("normal")
            -> DONE
        }
        -> move
        -> move
    +   {current_lvl == deepest_lvl} What's that?
        -> boss

=== after ===
Wow!  You really showed that {curenname}!  Good for you!
-> move

=== boss ===
<> Through the darkness you can barely make out a door conspicuously labeled 'boss fight here!'.  Employing the full might of your superior intellect, you deduce that an enemy substantially stronger than the ones you have previously disposed of within this particular dungeon resides behind the aforementioned door, along with some potentially awesome loot.  Do you proceed?
    +   Yes!
        ~bossfight(true)
        ~fight("boss")
        -> DONE
    +   [No! (Go back)]No!
        ~bossfight(false)
        ~ current_lvl++
        -> move

=== exitdungeon ===
You make you way out of {curlocationname} in the light! The waving fields of grain appeal to you, and you decide where to make your next move.
    +   [Whip out your trusty map.] You whip out your trusty map.
        ~displaymap()
        -> map

=== city ===
~refreshlines()
You enter the city of {curlocationname}, and are blown away by how big it is.  Wow.
    +   {contprompts(1) == 1} &nbsp;{curprompt1}
        ~curquest = 1
        {questtype1 == "js":
            -> questjs
        -else:
            -> questink
        }
    +   {contprompts(2) == 1} &nbsp;{curprompt2}
        ~curquest = 2
        {questtype2 == "js":
            -> questjs
        -else:
            -> questink
        }
    +   {contprompts(3) == 1} &nbsp;{curprompt3}
        ~curquest = 3
        {questtype3 == "js":
            -> questjs
        -else:
            -> questink
        }
    +   [Leave.]{~You've had enough of {curlocationname}, for the time being.|Time to get going - you've got something better to do (hopefully).|{curlocationname}'s boring - time to go!}
        -> map
-> DONE

=== questink ===
~ temp questname = getinkquest(curquest)
{questname == "dmerchant":
    -> quest_dmerchant
- else:
    -> DONE
}
=== questjs ===
&nbsp;{nextprompt(curquest,1)}
    + &nbsp;{nextprompt(curquest,0.5)}&nbsp;
        {contprompts(curquest) == 1:
            -> questjs
        }
        -> city

=== village ===
placeholder!
-> DONE

=== dungeon ===
Before you lies the dungeon called {curlocationname}.  Do you wish to enter?
    +   [Yes!] You enter the dungeon.  It's {~kinda|really|surprisingly|extremely} {~spooky|dark|damp}.
        ~current_lvl = 1
        -> move
    +   No![] I'm boring, lazy, and a coward - I'm outta here!
        -> map

=== dead ===
You have been vanquised by a mighty {curenname}.  RIP.
    ->END

=== map ===
~displaymap()
{~You can almost see your house from here!|The map crinkles as you contemplate your next move.|'Where should I go venture next?' You think to yourself.|Squinting furiously (to no avail), you once again berate yourself for not springing for a larger map.}  You decide to travel...
    +   {ablenorth == true} ...North.
        ~travel("north")
        ~displaymap()
        -> map
    +   {ablesouth == true} ...South.
        ~travel("south")
        ~displaymap()
        -> map
    +   {ableeast == true} ...East.
        ~travel("east")
        ~displaymap()
        -> map
    +   {ablewest == true} ...West.
        ~travel("west")
        ~displaymap()
        -> map
    +   {curlocationtype == "city"} Or, explore the city of {curlocationname}.
        -> city
    +   {curlocationtype == "dungeon"} Or, delve into the dungeon some call {curlocationname}.
        -> dungeon
    +   {curlocationtype == "village"} Or, drop by the village of {curlocationname}.
        -> village

-> END

=== quest_dmerchant ===
{curqueststart == "start":
    ->quest_dmerchant_start
}
{curqueststart == "middle":
    ->quest_dmerchant_middle
}
{curqueststart == "end":
    ~temp curname = "gold"
    ->quest_dmerchant_end
}
= quest_dmerchant_start
-   'Damned devious demons! Discamping with my dear Dazzeling Diamond Decanter!' he shouts, to noone in particular.
    +   Your what?
-   You sense something's off about merchant.  He turns to you, eyes bulging. 'And my Downscaled Dogwood Doorjamb! Drat!'
    +   Are you...feeling alright?
-   'And even my Durable Duralumin Dumbell!  Displaced!  Disappeared!' Yep, something's definitely off.
    +   Let me guess - I'm supposed to help?
    +   Uh, good luck finding your...Downmailed, uh, Diawood Doorcanter.  I'll just leave you be.
        As you cautiously back away, the merchant begins assailing other passerby.  Whew.
        -> city
-   A grin spreads across the merchant's face. 'Definitely!  I'd be decidedly delighted!'
    +   Great.
        ~takeinkquest(curquest)
        -> city
        
= quest_dmerchant_middle
-   'Did you discover my Durable Duralumin Dumbell, Downscaled Dogwood Doorjamb, and Dazzeling Diamond Decanter?'
    +   No, sorry, not yet.
-   'Darn!' The merchant throws his arms into the air and stalks away in a huff.
    -> city
    
= quest_dmerchant_end
The merchant's eyes widen in disbelief.  'You've disinterred my Durable Duralumin Dumbell, my Downscaled Dogwood Doorjamb, AND my Dazzeling Diamond Decanter?! Delightful!'
    +   Yup.
-   'Your due dividend...doubloons!' The merchant hands you a bag brimming with coins (and you somehow feel a bit more experienced).
    +   Thanks for the gold.
        -> quest_dmerchant_goldloop
    +   Thanks for the...doubloons.
        -> quest_dmerchant_endquest
        
= quest_dmerchant_goldloop
The merchant angerly glares at you. 'Not {curname}, DOUBLOONS!!!'
    *   Actually, these are gold coins.
        ~curname = "coins"
        -> quest_dmerchant_goldloop
    *   {curname == "coins"}Look, you can't just call currency whatever you what.  What if I decided to call them, say, Canadian Pesos?
        ~curname = "Canadian Pesos"
        -> quest_dmerchant_goldloop
    +   Ok, ok. Doubloons.
        -> quest_dmerchant_endquest

= quest_dmerchant_endquest
The merchant nods silently (thankfully), then wanders off.  You've had enough alliteration for one day.
    ~endquest(curquest)
    ->city

