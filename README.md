# WA_Minecraft
<!-- functions:
1. renders the game map based on the updated array
2. switch between tools (index)
3. renders the updated inventory 
4. breaking blocks (index)
5. reset the game
6. gameInit - set map and inventory arrays, calls renderMap, and renderInventory. -->
   functions:
   1.function taht start the game when we click start. 
   2.function that build the game map.
   3.gameInit.
   4.function that selected tool that we click.
   5.function that break block according to break rules array(according to  current tool ).
   6.function that push to inventory the block that was break.
   7.function tnat put block in the null block.
   8.function that reset game.
arrays:
1. initialMap
2. initialInventory
3. getItemById
4. breakRules
blocks:
rendered as grid items, from the js code.
onclick calls the break block function.
    block types:
    1. dirt
    2. grass
    3. wood
    4. leaves
    5. cobblestone
    6. sky
    7. cloud
    item types: 
    1. axe
    2. shovel
    3.  pickaxe