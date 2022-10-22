//*function taht start the game when we click start 
document.getElementById("startGame").onclick = function () {
document.getElementById("intro").style.display = "none";
document.getElementById("container").style.display = "flex";
};

document.getElementById("reset-btn").onclick = () => {//* function that call the  resetGame function 
    resetGame()
}

const mapSelector = document.getElementById("gameBoard")
const inventorySelector = document.getElementById("inventory")

//*Arrays:

//* block types:
//*    1. dirt
//*     2. grass
//*     3. wood
//*   4.leaves
//*    5. cobblestone
//*    7. cloud
//*    item types: 
//*    8. axe
//*    9. shovel
//*    10. pickaxe



//* initialMap array that contain where each block is located 
const initialMap=[
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,7,0,0,
    0,7,7,7,7,0,0,0,0,0,0,7,7,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,
    0,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,
    0,5,3,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,
    0,5,3,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,
    0,5,3,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,
    2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,5,1,1,5,5,1,1,1,1,5,5,5,5,5,5,1,5,1,5,5,5,
    5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5
]
//* initialInventory array that contain the places of tools 
const initialInventory = [
    8,0,
    9,0,
    10,0,
    0,0,
    0,0
]
//* getItemById array that contain the ids of the blocks 
const getItemById = [
    "block-air",
    "block-dirt",
    "block-grass",
    "block-wood",
    "block-leaves",
    "block-cobblestone",
    "block-sky",
    "block-cloud",
    "item-axe",
    "item-shovel",
    "item-pickaxe",
]
//*break tool array that say which block  each tool break 
const breakRules = {
    8: [3], //*axe can break wood
    9: [1, 2], //* shovel can break dirt and grass
    10: [5] //*pickaxe can break cobblestone
}
//*Functions
let map = [...initialMap]
let inventory = [...initialInventory]
let selectedTool = 0
let blocksCounter = [0,0,0,0,0,0,0,0,1,1,1]
//*function that build the game map 
const updateGame = () => {
    console.log("updateGame")   
    inventorySelector.innerHTML = ''
    mapSelector.innerHTML = ''
    //*map function  that put the blocks acording to index of initialMap arry 
    map.map((block, index) => {
        const newBlock = document.createElement('div')     
        newBlock.onclick = () => {
            if([8,9,10].includes(inventory[selectedTool])) breakBlock(index)
            else putBlock(block, index)
        }
        newBlock.classList.add("slot", getItemById[block])
        mapSelector.appendChild(newBlock)
    })
    //*map function  that put the tools in the inventory acording to index of initialInventory
    inventory.map((item, index) => {
        let classes = ["item", getItemById[item]]
        if(index === selectedTool) {
            console.log("selected")
            classes.push("item-selected")
        } 
        const newItem = document.createElement('div')
        newItem.classList.add(...classes)
        const newSmall = document.createElement('small')
        newSmall.innerHTML = blocksCounter[item] || ""
        newItem.appendChild(newSmall)
        if(item !== 0)newItem.onclick = () => {
            selectItem(index)
        }
        if(blocksCounter[item] !== 0) inventorySelector.appendChild(newItem)
    })
}

const gameInit = () => {
    updateGame()
}
//* function that selected tool that we click
const selectItem = (index) => {
    selectedTool = index;
    updateGame()
}
//*function that break block according to break rules array(according to  current tool )
const breakBlock = (index) => {
    //if premitted
    if(breakRules[inventory[selectedTool]] && breakRules[inventory[selectedTool]].includes(map[index])) {
        //push to inventory
        pushToInventory(map[index])
        //update counter
        blocksCounter[map[index]] = blocksCounter[map[index]] + 1
        //break
        map[index] = 0;
        
        //update game
        updateGame()
    }
    
}
//*function that push to inventory the block that was break 
const pushToInventory = (item) => {
    for(let i = 0; i<inventory.length; i++) {
        if(inventory[i] === 0 || inventory[i] === item) {
            inventory[i] = item
            break
        } 
    }
}
//*function tnat put block in the null block 
const putBlock = (item, index) => {
    if(map[index] === 0) {
        map[index] = inventory[selectedTool]
        blocksCounter[inventory[selectedTool]] = blocksCounter[inventory[selectedTool]] - 1
        updateGame()
    }
}
//*function that reset game
const resetGame = () => {
    map = initialMap
    inventory = initialInventory
    selectedTool = 0
    let blocksCounter = [0,0,0,0,0,0,0,0,1,1,1]
    updateGame()
}

updateGame()
