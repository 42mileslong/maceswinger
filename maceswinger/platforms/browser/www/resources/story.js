var storyContent = ﻿{"inkVersion":16,"root":[{"->":"init"},"done",{"init":[[["G>",["ev","visit",3,"seq","/ev","ev","du",0,"==","/ev",{"->":".^.s0","c":true},"ev","du",1,"==","/ev",{"->":".^.s1","c":true},"ev","du",2,"==","/ev",{"->":".^.s2","c":true},"nop",{"s0":["pop","^Hello there!",{"->":".^.^.23"},null],"s1":["pop","^Hey, you! Yeah, you. The one sitting that the computer!",{"->":".^.^.23"},null],"s2":["pop","^Greetings!",{"->":".^.^.23"},null],"#f":5}],"G<",null],"^ Welcome to the magical land of Magicland, a land of magic and land! You are an adventurer ",["G>",["ev","visit",2,"seq","/ev","ev","du",0,"==","/ev",{"->":".^.s0","c":true},"ev","du",1,"==","/ev",{"->":".^.s1","c":true},"nop",{"s0":["pop","^primed",{"->":".^.^.17"},null],"s1":["pop","^ready",{"->":".^.^.17"},null],"#f":5}],"G<",null],"^ for adventure, armed only with your ",["G>",["ev","visit",2,"seq","/ev","ev","du",0,"==","/ev",{"->":".^.s0","c":true},"ev","du",1,"==","/ev",{"->":".^.s1","c":true},"nop",{"s0":["pop","^wits",{"->":".^.^.17"},null],"s1":["pop","^arms",{"->":".^.^.17"},null],"#f":5}],"G<",null],"^ and your bare handz (in that order). You can barely make out the entrance to the dungeon behind you, but that doesn't matter as you prepare to embark on adventure?","\n",["ev",{"^->":"init.0.7.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.c","flg":18},{"s":["^Yes!",{"->":"$r","var":true},null],"c":["ev",{"^->":"init.0.7.c.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.s"},[{"#n":"$r2"}],"\n",{"->":"init.0.g-0"},{"#f":7}]}],["ev","str","^Yes.","/str","/ev",{"*":".^.c","flg":20},{"c":["^Yes!!!!","\n","\n",{"->":"init.0.g-0"},{"#f":7}]}],{"g-0":["^Great!  You just woke up in a dungeon.  Oh no.","\n",{"->":"move"},{"#f":7}]}],{"#f":3}],"move":["^You continue walking through the dungeon.","\n",["G>","ev",{"VAR?":"current_lvl"},0,"<","/ev",[{"->":".^.b","c":true},{"b":["<>","^ Suddenly, you find yourself at the exit! Through the doorway you see a forest far below. You appear to be on the side of a vast mountain.","\n",{"->":"move.2.7"},null]}],"nop","G<",null],"\n",["ev",{"^->":"move.4.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"VAR?":"current_lvl"},0,"==","/ev",{"*":".^.c","flg":3},{"s":["^Leave the door",{"->":"$r","var":true},null],"c":["ev",{"^->":"move.4.c.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.s"},[{"#n":"$r2"}],"\n",{"->":"exit"},{"#f":7}]}],["ev",{"^->":"move.5.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"VAR?":"current_lvl"},0,"!=","/ev",{"*":".^.c","flg":3},{"s":["^Walk towards the light.",{"->":"$r","var":true},null],"c":["ev",{"^->":"move.5.c.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.s"},[{"#n":"$r2"}],"\n","ev",{"VAR?":"current_lvl"},1,"-",{"temp=":"current_lvl","re":true},{"VAR?":"current_lvl"},"/ev",["G>","ev",{"VAR?":"current_lvl"},10,"<","/ev",[{"->":".^.b","c":true},{"b":["ev",{"x()":"fight"},"pop","/ev","\n","done",{"->":".^.^.^.7"},null]}],"nop","G<",null],"\n",{"->":"move"},{"#f":7}]}],["ev",{"^->":"move.6.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.c","flg":2},{"s":["^Walk deeper.",{"->":"$r","var":true},null],"c":["ev",{"^->":"move.6.c.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.s"},[{"#n":"$r2"}],"\n","ev",{"VAR?":"current_lvl"},1,"+",{"temp=":"current_lvl","re":true},{"VAR?":"current_lvl"},"/ev",["G>","ev",{"VAR?":"current_lvl"},{"VAR?":"deepest_lvl"},">","/ev",[{"->":".^.b","c":true},{"b":["ev",{"VAR?":"deepest_lvl"},1,"+",{"temp=":"deepest_lvl","re":true},{"VAR?":"deepest_lvl"},"/ev",["G>","ev",0,20,"rnd",10,">","/ev",[{"->":".^.b","c":true},{"b":["ev",{"x()":"fight"},"pop","/ev","\n","done",{"->":".^.^.^.9"},null]}],"nop","G<",null],"\n",{"->":".^.^.^.7"},null]}],"nop","G<",null],"\n",{"->":"move"},{"#f":7}]}],{"#f":3}],"after":["^Wow!  You really showed that ",["G>","ev",{"VAR?":"curenname"},"out","/ev","G<",null],"^!  Good for you!","\n",{"->":"move"},{"#f":3}],"exit":[["^You make you way out of the dungeon in the light! The waving fields of grain appeal to you, and you decide where to make your next move.","\n",["ev","str","^Walk towards the town in the distance.","/str","/ev",{"*":".^.c","flg":20},{"c":["^ You begin your trek down the cliff.","\n","\n",{"->":"exit.0.g-0"},{"#f":7}]}],{"g-0":["^Suddenly, you are shoved from the side! As you fall off the cliff, you hear the man's words. \"You wimp!\"","\n",["^You die.","\n","end",{"#f":7,"#n":"g-1"}],{"#f":7}]}],{"#f":3}],"global decl":["ev","str","^","/str",{"VAR=":"curenname"},{"^->":"move"},{"VAR=":"fightout"},10,{"VAR=":"deepest_lvl"},10,{"VAR=":"current_lvl"},"/ev","end",null],"#f":3}],"listDefs":{}};