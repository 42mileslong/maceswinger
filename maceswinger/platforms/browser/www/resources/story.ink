VAR curenname = ""
VAR fightout = -> move

VAR deepest_lvl = 10
VAR current_lvl = 10

EXTERNAL fight()

-> init
=== init ===
{~Hello there!|Hey, you! Yeah, you. The one sitting that the computer!|Greetings!} Welcome to the magical land of Magicland, a land of magic and land! You are an adventurer {~primed|ready} for adventure, armed only with your {~wits|arms} and your bare handz (in that order). You can barely make out the entrance to the dungeon behind you, but that doesn't matter as you prepare to embark on adventure?
    *   Yes!
    *   [Yes.]Yes!!!!
    -   Great!  You just woke up in a dungeon.  Oh no.
    -> move
    
=== move ===
You continue walking through the dungeon.
{current_lvl < 0:
    <> Suddenly, you find yourself at the exit! Through the doorway you see a forest far below. You appear to be on the side of a vast mountain.
}
    +   {current_lvl< 0} Leave the door 
        -> exit
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

=== exit ===
You make you way out of the dungeon in the light! The waving fields of grain appeal to you, and you decide where to make your next move.
    * [Walk towards the town in the distance.] You begin your trek down the cliff.
        - Suddenly, you are shoved from the side! As you fall off the cliff, you hear the man's words. "You wimp!"
        - You die.
-> END