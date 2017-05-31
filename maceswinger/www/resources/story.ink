VAR curenname = ""
VAR fightout = -> move

VAR deepest_lvl = 10
VAR current_lvl = 1

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
You continue walking through the dungeon.
{current_lvl < 0:
    <> Suddenly, you find yourself at the exit! Through the doorway you see a forest far below. You appear to be on the side of a vast mountain.
}
    +   {current_lvl == 0} Leave the door 
        -> exitdungeon
    +   {current_lvl != 0} Walk towards the light.
        ~ current_lvl--
        { current_lvl < 10:
            ~ fight()
            -> DONE
        }
        -> move
    +   Walk deeper.
        ~ current_lvl++
        { current_lvl > deepest_lvl:
            ~ deepest_lvl++
            
            { RANDOM(0, 20) > 10:
                ~ fight()
                -> DONE
            }
        }
        
        -> move

=== after ===
Wow!  You really showed that {curenname}!  Good for you!
-> move

=== exitdungeon ===
You make you way out of the dungeon in the light! The waving fields of grain appeal to you, and you decide where to make your next move.
    * [Whip out your trusty map] You whip out your trusty map.
        ~displaymap()
        -> map
=== map ===
{~You can almost see your house from here!|The map crinkles as you contemplate your next move.|'Where should I go venture next?' You think to yourself.|Squinting furiously (to no avail), you once again berate yourself for not springing for a larger map.}  You decide to travel...
    ~temp able = true
    +   ...East.
        ~able = travel("east")
    +   ...West.
        ~able = travel("west")
    +   ...North.
        ~able = travel("north")
    +   ...South.
        ~able = travel("south")
    -{
    - able == true:
        Ok, sounds good.
        -> map
    - else:
        Look a bit closer at the map - you'll see that {~you cannot go that way.|you're going down a path you cannot follow!|takes you off the map, silly!}
        -> map
    }
    
-> END