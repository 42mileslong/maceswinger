VAR curenname = ""
VAR fightout = -> move

VAR deepest_lvl = 10
VAR current_lvl = 1

VAR ablenorth = false
VAR ablesouth = false
VAR ableeast = false
VAR ablewest = false
VAR curlocationtype = ""
VAR curlocationname = ""

EXTERNAL fight()
EXTERNAL displaymap()
EXTERNAL travel(direction)

-> init
=== init ===
{~Hello there!|Hey, you! Yeah, you. The one sitting that the computer!|Greetings!} Welcome to the magical land of Magicland, a land of magic and land! You are an adventurer {~primed|ready} for adventure, armed only with your {~wits|arms} and your bare handz (in that order). You can barely make out the entrance to the dungeon behind you, but that doesn't matter as you prepare to embark on adventure!
    *   Yes!
    *   [Yes.]Yes!!!!
    -   Great!  You just woke up in a dungeon.  Oh no.
    -> move

=== move ===
{~You continue {~walking|trudging|ambling|sauntering|strolling} through the dungeon|As you {~walk|trudge|amble|saunter|stroll} you {~jump|twitch|shriek|squeal} {~at each {~spooky|scary} noise|as additional cobwebs accumulate on your {~face|arms|legs}}}.
{current_lvl == 0:
    <> Suddenly, you find yourself at the exit! Through the doorway you see a {~forest|marsh|prairie|grassland}{& far below| very far below|}. You appear to be on the side of a {&vast mountain|yuge mountain|small hill}.
}
    +   {current_lvl == 0} Leave {curlocationname}.
        -> exitdungeon
    +   {current_lvl != 0} Walk towards the light.
        ~ current_lvl--
        { current_lvl < 10:
            ~ fight()
            -> DONE
        }
        -> move
    +   {current_lvl < 10} Walk deeper.
        ~ current_lvl++
        { current_lvl > deepest_lvl:
            ~ deepest_lvl++

            { RANDOM(0, 20) > 10:
                ~ fight()
                -> DONE
            }
        }
        -> move
    +   {current_lvl == 10} What's that?
        -> boss

=== after ===
Wow!  You really showed that {curenname}!  Good for you!
-> move

=== boss ===
<> Through the darkness you can barely make out a door conspicuously labeled 'boss fight here!'.  Employing the full might of your superior intellect, you deduce that an enemy substantially stronger than the ones you have previously disposed of within this particular dungeon resides behind the aforementioned door, along with some potentially awesome loot.  Do you proceed?
    +   Yes!
        ~fight()
        -> DONE
    +   [No! (Go back)]No!
        ~ current_lvl++
        -> move

=== exitdungeon ===
You make you way out of the dungeon in the light! The waving fields of grain appeal to you, and you decide where to make your next move.
    + [Whip out your trusty map.] You whip out your trusty map.
        ~displaymap()
        -> map

=== city ===
placeholder!
-> DONE

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
=== map ===
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
