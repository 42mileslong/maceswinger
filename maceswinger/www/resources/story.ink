VAR curenname = ""
VAR fightout = -> combat_loop
EXTERNAL fight()
-> init
==init==
-    {~Hello there!|Hey, you! Yeah, you. The one sitting that the computer!|Greetings!} Welcome to the magical land of Magicland, a land of magic and land! You are an adventurer {~primed|ready} for adventure, armed only with your {~wits|arms} and your bare handz (in that order).  Are you ready to embark on adventure?
    *   Yes!
    *   [Yes.]Yes!!!!
    -   Great!  You just woke up in a dungeon.  Oh no.
    -> combat_loop
    
==combat_loop==
You continue walking through the dungeon.
    +   Walk left. -> combat_loop
    +   Walk right.
        ~ fight()
        -> DONE

==after==
Wow!  You really showed that {curenname}!  Good for you!
-> combat_loop