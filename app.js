const xcoordtag = document.getElementById('xcoord-val')
const ycoordtag = document.getElementById('ycoord-val')
const whitestag = document.getElementById('num-whites-val')
const probtag = document.getElementById('prob-val')
const xcoordval = document.getElementById('xcoord')
const ycoordval = document.getElementById('ycoord')
const whitesval = document.getElementById('numwhites')
const probval = document.getElementById('probability')
const game = document.getElementById('game')
const modal = document.getElementById("modal")
const options = document.getElementById("options")
const openoptions = document.getElementById("openoptions")
const closeButtonModal = document.getElementById("close-button")
const closeButtonOptions = document.getElementById("optionsCloseButton")
const resetButton = document.getElementById('resetbutton')
const solveButton = document.getElementById('solvebutton')
const clearBoard = document.getElementById('clearboard')
const accessibility = document.getElementsByName("accessibility")
const toggling = document.getElementsByName("clicktotoggle")
const remaining = document.getElementById("remaining")
let showsol = false
function toggleModal() {
    modal.classList.toggle("show-modal");
}
function toggleOptions() {
    options.classList.toggle("show-modal");
}
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
    if (event.target === options) {
        toggleOptions();
    }
}
function toggletoggling(){
    clear()
    for (let colindex = 0; colindex<xcoordval.value; colindex++){
        for (let rowindex = 0; rowindex<ycoordval.value; rowindex++){
            if(document.getElementById("clicktoggleon").checked){
                document.getElementById("containercolumn"+colindex+"row"+rowindex).onmouseout=""
                document.getElementById("containercolumn"+colindex+"row"+rowindex).onmouseover=""
                document.getElementById("containercolumn"+colindex+"row"+rowindex).onclick=function(){switched(colindex,rowindex)}
                document.getElementById("colcontainer"+colindex).onmouseout=""
                document.getElementById("colcontainer"+colindex).onmouseover=""
                document.getElementById("colcontainer"+colindex).onclick=""
                document.getElementById("rowcontainer"+rowindex).onmouseout=""
                document.getElementById("rowcontainer"+rowindex).onmouseover=""
                document.getElementById("rowcontainer"+rowindex).onclick=""
            } else {
                document.getElementById("colcontainer"+colindex).onmouseover = function() {columnblue(colindex)}
                document.getElementById("colcontainer"+colindex).onmouseout = function() {columnwhite(colindex)}
                document.getElementById("colcontainer"+colindex).onclick = function() {columnstayblue(colindex)}
                document.getElementById("rowcontainer"+rowindex).onmouseover = function() {rowblue(rowindex)}
                document.getElementById("rowcontainer"+rowindex).onmouseout = function() {rowwhite(rowindex)}
                document.getElementById("rowcontainer"+rowindex).onclick = function() {rowstayblue(rowindex)}
                if(document.getElementById("column"+colindex+"row"+rowindex).coloring == "white"){
                    document.getElementById("containercolumn"+colindex+"row"+rowindex).onmouseout=function(){turnwhite(colindex,rowindex)}
                    document.getElementById("containercolumn"+colindex+"row"+rowindex).onmouseover=function(){turngreen(colindex,rowindex)}
                    document.getElementById("containercolumn"+colindex+"row"+rowindex).onclick=function(){staygreen(colindex,rowindex)}
                } else {
                    document.getElementById("containercolumn"+colindex+"row"+rowindex).onclick=""
                }
            }
        }
    }
}

function switched(col,row){
    if(document.getElementById("column"+col+"row"+row).coloring=="white"){
        document.getElementById("column"+col+"row"+row).coloring="black"
        document.getElementById("column"+col+"row"+row).className="blacksquare"
        if(document.getElementById("accesson").checked){
            document.getElementById("greenboxcolumn"+col+"row"+row).className = "blackgreensquare"
        } else {
            document.getElementById("greenboxcolumn"+col+"row"+row).className = "greensquare"
        }
    } else {
        document.getElementById("column"+col+"row"+row).coloring="white"
        document.getElementById("column"+col+"row"+row).className="whitesquare"
        if(document.getElementById("accesson").checked){
            document.getElementById("greenboxcolumn"+col+"row"+row).className = "whitegreensquare"
        } else {
            document.getElementById("greenboxcolumn"+col+"row"+row).className = "greensquare"
        }
    }
}
function toggleAccessibility(){
    for (let colindex = 0; colindex<xcoordval.value; colindex++){
        for (let rowindex = 0; rowindex<ycoordval.value; rowindex++){
            if(document.getElementById("accesson").checked){
                    document.getElementById("colarrow"+colindex).style.backgroundColor = "rgb(0,0,0)"
                    document.getElementById("rowarrow"+rowindex).style.backgroundColor = "rgb(0,0,0)"
                if(document.getElementById("column"+colindex+"row"+rowindex).coloring=="black"){
                    document.getElementById("greenboxcolumn"+colindex+"row"+rowindex).className = "blackgreensquare"
                } else {
                    document.getElementById("greenboxcolumn"+colindex+"row"+rowindex).className = "whitegreensquare"
                    document.getElementById("greenboxcolumn"+colindex+"row"+rowindex).style.backgroundColor = ""
                }
            } else {
                document.getElementById("colarrow"+colindex).style.backgroundColor = "rgb(0,0,255)"
                document.getElementById("rowarrow"+rowindex).style.backgroundColor = "rgb(0,0,255)"
                document.getElementById("greenboxcolumn"+colindex+"row"+rowindex).className = "greensquare"
            }
        }
    }
}
closeButtonModal.addEventListener("click", toggleModal);
closeButtonOptions.addEventListener("click", toggleOptions);
for (var i=0; i<accessibility.length; i++){
    accessibility[i].addEventListener("change",toggleAccessibility);
}
solveButton.addEventListener("click", showsolution);
openoptions.addEventListener("click", toggleOptions);
window.addEventListener("click", windowOnClick);
for(var i=0; i<toggling.length; i++){
    toggling[i].addEventListener("change",toggletoggling)
}
let won = false
game.classList.add('game')
let whitecols = new Map()
let whiterows = new Map()
let blackcols = new Set()
let blackrows = new Set()
let blackcount = Number(xcoordval.value)+Number(ycoordval.value)-Number(whitesval.value)+1
resetButton.addEventListener('click', function(){reload(xcoordval.value,ycoordval.value,probval.value)})
clearBoard.addEventListener('click', function(){clear()})
reload(xcoordval.value,ycoordval.value,probval.value)
if (whitesval.value>1){
whitestag.innerHTML = whitesval.value+" whites, or "+blackcount+" columns/rows"
} else {
whitestag.innerHTML = whitesval.value+" white, or "+blackcount+" columns/rows"
}
xcoordval.oninput = function() {
xcoordtag.innerHTML = xcoordval.value
whitesval.setAttribute('max',Math.min(ycoordval.value,xcoordval.value))
blackcount = Number(xcoordval.value)+Number(ycoordval.value)-Number(whitesval.value)+1
if (whitesval.value>1){
whitestag.innerHTML = whitesval.value+" whites, or "+blackcount+" columns/rows"
} else {
whitestag.innerHTML = whitesval.value+" white, or "+blackcount+" columns/rows"
}
reload(xcoordval.value,ycoordval.value,probval.value)
}
ycoordval.oninput = function() {
reload(xcoordval.value,ycoordval.value,probval.value)
}
whitesval.oninput = function() {
blackcount = Number(xcoordval.value)+Number(ycoordval.value)-Number(whitesval.value)+1
if (whitesval.value>1){
whitestag.innerHTML = whitesval.value+" whites, or "+blackcount+" columns/rows"
} else {
whitestag.innerHTML = whitesval.value+" white, or "+blackcount+" columns/rows"
}
if((whitecols.size < whitesval.value)&((blackcols.size+blackrows.size) < blackcount)){
justlost()
} else {
justwon()
}
}
probval.oninput = function() {
reload(xcoordval.value,ycoordval.value,probval.value)
}
function reload(x,y,prob) {
remaining.innerHTML="You have either "+numwhites.value+" white square"+((numwhites.value>1)?"s":"")+" or "+(Number(x)-Number(numwhites.value)+Number(y)+1)+" columns and/or rows remaining."
document.getElementById("clicktoggleoff").checked=true
document.getElementById("clicktoggleon").checked=false
whitecols.clear()
whiterows.clear()
blackcols.clear()
blackrows.clear()
won = false
game.innerHTML = ""
firstrow = document.createElement('div')
firstrow.classList.add('row')
for (let firstcols = 0; firstcols<x; firstcols++){
    bluecolcontainer = document.createElement('div')
    bluecolcontainer.classList.add('arrowcontainer')
    bluecolcontainer.id = "colcontainer"+firstcols
    bluecolcontainer.onmouseover = function() {columnblue(firstcols)}
    bluecolcontainer.onmouseout = function() {columnwhite(firstcols)}
    bluecolcontainer.onclick = function() {columnstayblue(firstcols)}
    bluearrow = document.createElement('div')
    bluearrow.classList.add('bluedownarrow')
    if(document.getElementById("accesson").checked){
        bluearrow.style.backgroundColor = "rgb(0,0,0)"
    }
    bluearrow.id = "colarrow"+firstcols
    bluecolcontainer.append(bluearrow)
    firstrow.append(bluecolcontainer)
}
cornersquare = document.createElement('div')
cornersquare.classList.add('squarecontainer')
cornersquare.style.borderColor = "rgb(255,255,255)"
firstrow.append(cornersquare)
game.append(firstrow)
for (let currrow = 0; currrow < y; currrow++){
    const newrow = document.createElement('div')
    newrow.id = "row"+currrow
    newrow.row = currrow
    newrow.classList.add('row')
    for (let currcol = 0; currcol < x; currcol++){
        newcontainer = document.createElement('div')
        newcontainer.classList.add('squarecontainer')
        newcontainer.id = "containercolumn"+currcol+"row"+currrow
        newrow.append(newcontainer)
        newbox = document.createElement('div')
        newbox.id = "column"+currcol+"row"+currrow
        newgreenbox = document.createElement('div')
        newgreenbox.id = "greenboxcolumn"+currcol+"row"+currrow
        newgreenbox.classList.add('greensquare')
        newbox.row = currrow
        randnum = Math.random()
        newcontainer.append(newbox)
        newcontainer.append(newgreenbox)
        if (randnum > prob){
            newbox.classList.add('whitesquare')
            newcontainer.onmouseover = function(){turngreen(currcol,currrow)}
            newcontainer.onmouseout = function(){turnwhite(currcol,currrow)}
            newcontainer.onclick = function(){staygreen(currcol,currrow)}
            newbox.coloring = "white"
        } else {
            newbox.classList.add('blacksquare')
            newbox.coloring = "black"
        }
    }
    rowarrowcontainer = document.createElement('div')
    rowarrowcontainer.id = "rowcontainer"+currrow
    rowarrowcontainer.classList.add('arrowcontainer')
    newrow.append(rowarrowcontainer)
    rowarrow = document.createElement('div')
    rowarrow.id = "rowarrow"+currrow
    rowarrow.classList.add('blueleftarrow')
    if(document.getElementById("accesson").checked){
        rowarrow.style.backgroundColor = "rgb(0,0,0)"
    }
    rowarrowcontainer.append(rowarrow)
    rowarrowcontainer.onmouseover = function() { rowblue(currrow)}
    rowarrowcontainer.onmouseout = function() { rowwhite(currrow)}
    rowarrowcontainer.onclick = function() { rowstayblue(currrow)}
    game.append(newrow)
}
game.style.width = Math.min(1000,400*(1+Number(xcoordval.value))/(1+Number(ycoordval.value)))+"px"
xcoordtag.innerHTML = xcoordval.value
ycoordtag.innerHTML = ycoordval.value
whitesval.setAttribute('max',Math.min(ycoordval.value,xcoordval.value))
blackcount = Number(xcoordval.value)+Number(ycoordval.value)-Number(whitesval.value)+1
if (whitesval.value>1){
whitestag.innerHTML = whitesval.value+" whites, or "+blackcount+" columns/rows"
} else {
whitestag.innerHTML = whitesval.value+" white, or "+blackcount+" columns/rows"
}probtag.innerHTML = Number(probval.value).toFixed(3)
toggleAccessibility()
remaining.innerHTML="You have either "+numwhites.value+" white square"+((numwhites.value>1)?"s":"")+" or "+(Number(x)-Number(numwhites.value)+Number(y)+1)+" columns and/or rows remaining."
}

function turngreen(col,row){
if (whitecols.has(col)&&whitecols.get(col)!=row){
if(document.getElementById("accessoff").checked){
document.getElementById("greenboxcolumn"+col+"row"+whitecols.get(col)).style.backgroundColor = "rgb(255, 0, 0)"
document.getElementById("greenboxcolumn"+col+"row"+row).style.backgroundColor = "rgb(255, 0, 0)"
} else {
document.getElementById("greenboxcolumn"+col+"row"+whitecols.get(col)).className = "whiteredsquare"
document.getElementById("greenboxcolumn"+col+"row"+row).className = "whiteredsquare"
}
}
else if (whiterows.has(row)){
if(document.getElementById("accessoff").checked){
document.getElementById("greenboxcolumn"+whiterows.get(row)+"row"+row).style.backgroundColor = "rgb(255, 0, 0)"
document.getElementById("greenboxcolumn"+col+"row"+row).style.backgroundColor = "rgb(255, 0, 0)"
} else {
document.getElementById("greenboxcolumn"+whiterows.get(row)+"row"+row).className = "whiteredsquare"
document.getElementById("greenboxcolumn"+col+"row"+row).className = "whiteredsquare"
}
}
document.getElementById("greenboxcolumn"+col+"row"+row).style.visibility = "visible"
document.getElementById("column"+col+"row"+row).style.visibility = "hidden"
}

function turnwhite(col,row){
if (whitecols.has(col)||whiterows.has(row)){

if (whitecols.has(col)){
if(document.getElementById("accessoff").checked){
document.getElementById("greenboxcolumn"+col+"row"+whitecols.get(col)).style.backgroundColor = "rgb(0, 255, 0)"
document.getElementById("greenboxcolumn"+col+"row"+row).style.backgroundColor = "rgb(0, 255, 0)"
} else {
document.getElementById("greenboxcolumn"+col+"row"+whitecols.get(col)).className = "whitegreensquare"
document.getElementById("greenboxcolumn"+col+"row"+row).className = "whitegreensquare"
}
}
else if (whiterows.has(row)){
if(document.getElementById("accessoff").checked){
document.getElementById("greenboxcolumn"+whiterows.get(row)+"row"+row).style.backgroundColor = "rgb(0, 255, 0)"
document.getElementById("greenboxcolumn"+col+"row"+row).style.backgroundColor = "rgb(0, 255, 0)"
} else {
document.getElementById("greenboxcolumn"+whiterows.get(row)+"row"+row).className = "whitegreensquare"
document.getElementById("greenboxcolumn"+col+"row"+row).className = "whitegreensquare"
}
}
document.getElementById("containercolumn"+col+"row"+row).onmouseout=function(){turnwhite(col,row)}
document.getElementById("containercolumn"+col+"row"+row).onmouseover=function(){turngreen(col,row)}
document.getElementById("containercolumn"+col+"row"+row).onclick=function(){
staygreen(col,row)}
}

document.getElementById("greenboxcolumn"+col+"row"+row).style.visibility = "hidden"
document.getElementById("column"+col+"row"+row).style.visibility = "visible"
}

function staygreen(col,row){
if (!(whitecols.has(col))&&(!(whiterows.has(row)))){
won=false
blackrows.forEach(row =>{
document.getElementById("rowarrow"+row).style.visibility = "hidden"
document.getElementById("rowcontainer"+row).onmouseover = function(){rowblue(row)}
document.getElementById("rowcontainer"+row).onmouseout = function(){rowwhite(row)}
document.getElementById("rowcontainer"+row).onclick = function(){rowstayblue(row)}
blackcols.forEach(col =>{
document.getElementById("greenboxcolumn"+col+"row"+row).style.visibility = "hidden"
document.getElementById("colcontainer"+col).onmouseover = function(){columnblue(col)}
document.getElementById("colcontainer"+col).onmouseout = function(){columnwhite(col)}
document.getElementById("colcontainer"+col).onclick = function(){columnstayblue(col)}
})
})
blackcols.forEach(col =>{
document.getElementById("colarrow"+col).style.visibility = "hidden"
})
blackrows.clear();
blackcols.clear();
whitecols.set(col,row)
whiterows.set(row,col)
if(whitecols.size<whitesval.value){
remaining.innerHTML="You have either "+(Number(numwhites.value)-whitecols.size)+" more white square"+(((Number(numwhites.value)-whitecols.size)>1)?"s":"")+" or "+(Number(xcoordval.value)-Number(numwhites.value)+Number(ycoordval.value)+1)+" columns and/or rows remaining."}
if(whitecols.size == whitesval.value){
justwon()
}
document.getElementById("containercolumn"+col+"row"+row).onmouseover=""
document.getElementById("containercolumn"+col+"row"+row).onmouseout=""
document.getElementById("containercolumn"+col+"row"+row).onclick=function(){
whitecols.delete(col)
whiterows.delete(row)
if(whitecols.size < whitesval.value){
justlost()
}
document.getElementById("containercolumn"+col+"row"+row).onmouseout=function(){turnwhite(col,row)}
document.getElementById("containercolumn"+col+"row"+row).onmouseover=function(){turngreen(col,row)}
document.getElementById("containercolumn"+col+"row"+row).onclick=function(){
staygreen(col,row)}
}
}
}

function columnblue(col){
    let failure = false
    for (let row of blackrows){
        if(document.getElementById("column"+col+"row"+row).coloring == "white"){
            failure = true;
            break;
        }
    }
    if(!failure){
        for (let row of blackrows){
            document.getElementById("greenboxcolumn"+col+"row"+row).style.visibility = "visible"
        }
        document.getElementById("colarrow"+col).style.visibility = "visible";
        document.getElementById("colarrow"+col).works = true;
    } else {
        for (let row of blackrows){
            if(document.getElementById("column"+col+"row"+row).coloring == "white"){
                document.getElementById("greenboxcolumn"+col+"row"+row).style.visibility = "visible";
                if(document.getElementById("accessoff").checked){
                    document.getElementById("greenboxcolumn"+col+"row"+row).style.backgroundColor = "rgb(255,0,0)";
                } else {
                    document.getElementById("greenboxcolumn"+col+"row"+row).className = "whiteredsquare"
                }
                document.getElementById("colarrow"+col).works = false;
                document.getElementById("colarrow"+col).why = row;
                break;
            }
        }
        document.getElementById("colarrow"+col).style.visibility = "visible";
        if(document.getElementById("accessoff").checked){
            document.getElementById("colarrow"+col).style.backgroundColor = "rgb(255,0,0)";
        }
    }
}

function columnwhite(col){
    document.getElementById("colarrow"+col).style.visibility = "hidden";
    if(document.getElementById("accessoff").checked){
        document.getElementById("colarrow"+col).style.backgroundColor = "rgb(0,0,255)";
    } else {
        document.getElementById("colarrow"+col).style.backgroundColor = "rgb(0,0,0)";
    }
    if(!document.getElementById("colarrow"+col).works){
        document.getElementById("greenboxcolumn"+col+"row"+document.getElementById("colarrow"+col).why).style.visibility = "hidden";
        if(document.getElementById("accessoff").checked){
            document.getElementById("greenboxcolumn"+col+"row"+document.getElementById("colarrow"+col).why).style.backgroundColor = "rgb(0,255,0)"
        } else {
            document.getElementById("greenboxcolumn"+col+"row"+document.getElementById("colarrow"+col).why).className = "whitegreensquare"
        }
    } else {
        for (let row of blackrows){
            document.getElementById("greenboxcolumn"+col+"row"+row).style.visibility = "hidden"
        }
    }
    document.getElementById("colcontainer"+col).onmouseover = function(){columnblue(col)}
    document.getElementById("colcontainer"+col).onmouseout = function(){columnwhite(col)}
    document.getElementById("colcontainer"+col).onclick = function(){columnstayblue(col)}
}

function columnstayblue(col){
    if(document.getElementById("colarrow"+col).works){
        won=false
        whiterows.forEach((value,key) => {
            document.getElementById("greenboxcolumn"+value+"row"+key).style.visibility = "hidden"
            document.getElementById("containercolumn"+value+"row"+key).onmouseout=function(){turnwhite(value,key)}
            document.getElementById("containercolumn"+value+"row"+key).onmouseover=function(){turngreen(value,key)}
            document.getElementById("containercolumn"+value+"row"+key).onclick=function(){
staygreen(value,key)}
        })
        whiterows.clear();
        whitecols.clear();
        blackcols.add(col);
        if(blackcols.size+blackrows.size<blackcount){remaining.innerHTML="You have either "+numwhites.value+" white square"+((numwhites.value>1)?"s":"")+" or "+(Number(xcoordval.value)-Number(numwhites.value)+Number(ycoordval.value)+1-Number(blackcols.size)-Number(blackrows.size))+(Number(xcoordval.value)-Number(numwhites.value)+Number(ycoordval.value)+1-Number(blackcols.size)-Number(blackrows.size)==1?" more column or row ":" more columns and/or rows ")+"remaining."}
        if(blackcols.size+blackrows.size==blackcount){
            justwon()
        }
        document.getElementById("colcontainer"+col).onmouseover = "";
        document.getElementById("colcontainer"+col).onmouseout = "";
        document.getElementById("colcontainer"+col).onclick = function() {
            blackcols.delete(col);
            if(blackcols.size+blackrows.size < blackcount){
                justlost()
            }
            document.getElementById("colcontainer"+col).onmouseover = function(){columnblue(col)}
            document.getElementById("colcontainer"+col).onmouseout = function(){columnwhite(col)}
            document.getElementById("colcontainer"+col).onclick = function(){columnstayblue(col)}
        }
    }
}

function rowblue(row){
    let failure = false
    for (let col of blackcols){
        if(document.getElementById("column"+col+"row"+row).coloring == "white"){
            failure = true;
            break;
        }
    }
    if(!failure){
        for (let col of blackcols){
            document.getElementById("greenboxcolumn"+col+"row"+row).style.visibility = "visible"
        }
        document.getElementById("rowarrow"+row).style.visibility = "visible";
        document.getElementById("rowarrow"+row).works = true;
    } else {
        for (let col of blackcols){
            if(document.getElementById("column"+col+"row"+row).coloring == "white"){
                document.getElementById("greenboxcolumn"+col+"row"+row).style.visibility = "visible";
                if(document.getElementById("accessoff").checked){
                    document.getElementById("greenboxcolumn"+col+"row"+row).style.backgroundColor = "rgb(255,0,0)";
                } else {
                    document.getElementById("greenboxcolumn"+col+"row"+row).className = "whiteredsquare"
                }
                document.getElementById("rowarrow"+row).works = false;
                document.getElementById("rowarrow"+row).why = col;
                break;
            }
        }
        document.getElementById("rowarrow"+row).style.visibility = "visible";
        if(document.getElementById("accessoff").checked){
            document.getElementById("rowarrow"+row).style.backgroundColor = "rgb(255,0,0)";
        }
    }
}

function rowwhite(row){
    document.getElementById("rowarrow"+row).style.visibility = "hidden";
    if(document.getElementById("accessoff").checked){
        document.getElementById("rowarrow"+row).style.backgroundColor = "rgb(0,0,255)";
    } else {
        document.getElementById("rowarrow"+row).style.backgroundColor = "rgb(0,0,0)";
    }
    if(!document.getElementById("rowarrow"+row).works){
        document.getElementById("greenboxcolumn"+document.getElementById("rowarrow"+row).why+"row"+row).style.visibility = "hidden";
        if(document.getElementById("accessoff").checked){
            document.getElementById("greenboxcolumn"+document.getElementById("rowarrow"+row).why+"row"+row).style.backgroundColor = "rgb(0,255,0)"
        } else {
            document.getElementById("greenboxcolumn"+document.getElementById("rowarrow"+row).why+"row"+row).className = "whitegreensquare"
        }
    } else {
        for (let col of blackcols){
            document.getElementById("greenboxcolumn"+col+"row"+row).style.visibility = "hidden"
        }
    }
    document.getElementById("rowcontainer"+row).onmouseover = function(){rowblue(row)}
    document.getElementById("rowcontainer"+row).onmouseout = function(){rowwhite(row)}
    document.getElementById("rowcontainer"+row).onclick = function(){rowstayblue(row)}
}

function rowstayblue(row){
    if(document.getElementById("rowarrow"+row).works){
        won=false
        whiterows.forEach((value,key) => {
            document.getElementById("greenboxcolumn"+value+"row"+key).style.visibility = "hidden"
            document.getElementById("containercolumn"+value+"row"+key).onmouseout=function(){turnwhite(value,key)}
            document.getElementById("containercolumn"+value+"row"+key).onmouseover=function(){turngreen(value,key)}
            document.getElementById("containercolumn"+value+"row"+key).onclick=function(){
staygreen(value,key)}
        })
        whiterows.clear();
        whitecols.clear();
        blackrows.add(row);
        if(blackcols.size+blackrows.size<blackcount){
        remaining.innerHTML="You have either "+numwhites.value+" white square"+((numwhites.value>1)?"s":"")+" or "+(Number(xcoordval.value)-Number(numwhites.value)+Number(ycoordval.value)+1-Number(blackcols.size)-Number(blackrows.size))+(Number(xcoordval.value)-Number(numwhites.value)+Number(ycoordval.value)+1-Number(blackcols.size)-Number(blackrows.size)==1?" more column or row ":" more columns and/or rows ")+"remaining."}
        if(blackcols.size+blackrows.size==blackcount){
            justwon()
        }
        document.getElementById("rowcontainer"+row).onmouseover = "";
        document.getElementById("rowcontainer"+row).onmouseout = "";
        document.getElementById("rowcontainer"+row).onclick = function() {
            blackrows.delete(row);
            if(blackcols.size+blackrows.size < blackcount){
                justlost()
            }
            document.getElementById("rowcontainer"+row).onmouseover = function(){rowblue(row)}
            document.getElementById("rowcontainer"+row).onmouseout = function(){rowwhite(row)}
            document.getElementById("rowcontainer"+row).onclick = function(){rowstayblue(row)}
        }
    }
}

function justwon() {
remaining.innerHTML="You have nothing left!"
if(!won){
if(!showsol){
won=true
toggleModal()
}
else
{won=true
showsol=false
}
}
}

function justlost() {
if(won){
won=false
}
if(Number(blackcols.size)+Number(blackrows.size)==0){
    if(Number(whitecols.size)==0){
        remaining.innerHTML="You have either "+numwhites.value+" white square"+((numwhites.value>1)?"s":"")+" or "+(Number(xcoordval.value)-Number(numwhites.value)+Number(ycoordval.value)+1)+" columns and/or rows remaining."
    } else {
        remaining.innerHTML="You have either "+(Number(numwhites.value)-whitecols.size)+" more white square"+(((Number(numwhites.value)-whitecols.size)>1)?"s":"")+" or "+(Number(xcoordval.value)-Number(numwhites.value)+Number(ycoordval.value)+1)+" columns and/or rows remaining."
    }
} else {
remaining.innerHTML="You have either "+numwhites.value+" white square"+((numwhites.value>1)?"s":"")+" or "+(Number(xcoordval.value)-Number(numwhites.value)+Number(ycoordval.value)+1-Number(blackcols.size)-Number(blackrows.size))+(Number(xcoordval.value)-Number(numwhites.value)+Number(ycoordval.value)+1-Number(blackcols.size)-Number(blackrows.size)==1?" more column or row ":" more columns and/or rows ")+"remaining."
}
}

function showsolution(){
showsol = true
let colstocheck=[...Array(Number(xcoordval.value)).keys()]
let rowstocheck=[...Array(Number(ycoordval.value)).keys()]
clear()
let answer=solve(colstocheck,rowstocheck,whitesval.value)
if(answer[0]=="black"){
answer[1].forEach(columnblue)
answer[1].forEach(columnstayblue)
answer[2].forEach(rowblue)
answer[2].forEach(rowstayblue)
} else {
answer[1].forEach(element => {turngreen(element[0],element[1]);
staygreen(element[0],element[1])})
}
}

function solve(colset,rowset,whitecount){
    if((rowset.length==0)||(colset.length==0)||(whitecount==0)){
        return ["white", []]
    }
    tobreak=false
    for(let row of rowset){
        for(let col of colset){
            if (document.getElementById("column"+col+"row"+row).coloring=="white"){
                var winpair=[col,row]
                tobreak=true
                break
            }
        }
        if(tobreak){
            break
        }
    }
    if(tobreak){
        let newcolpass=new Set(colset)
        let newrowpass=new Set(rowset)
        newcolpass.delete(winpair[0])
        newrowpass.delete(winpair[1])
        let soln=solve([...newcolpass],[...newrowpass],whitecount-1)
        if(soln[0]=="white"){
            return ["white",soln[1].concat([winpair])]
        } else {
            let solblackcols=soln[1]
            let solblackrows=soln[2]
            let solwhitecols=colset.filter(x => !solblackcols.includes(x))
            let solwhiterows=rowset.filter(x => !solblackrows.includes(x))
            let solnpart1=solve(solblackcols,solwhiterows,solwhiterows.length)
            if(solnpart1[0]=="black"){
                return ["black",solnpart1[1],solnpart1[2].concat(solblackrows)]
            } else {
               let solnpart2=solve(solwhitecols,solblackrows,solwhitecols.length)
               if(solnpart2[0]=="black"){
                   return ["black",solnpart2[1].concat(solblackcols),solnpart2[2]]
               } else {
                   return ["white",solnpart1[1].concat(solnpart2[1])]
               }
            }
        }
    } else {
        if(rowset.length > colset.length){
            return ["black",colset,rowset.slice(0,(rowset.length-whitecount+1))]
        } else {
            return ["black",colset.slice(0,colset.length-whitecount+1),rowset]
        }
    }
}

function clear(){
remaining.innerHTML="You have either "+numwhites.value+" white square"+((numwhites.value>1)?"s":"")+" or "+(Number(xcoordval.value)-Number(numwhites.value)+Number(ycoordval.value)+1)+" columns and/or rows remaining."
won=false
for(let [key, value] of whitecols)
{turnwhite(key,value)}
for(let col of blackcols){
columnwhite(col)}
for(let row of blackrows){
rowwhite(row)}
whitecols.clear()
whiterows.clear()
blackcols.clear()
blackrows.clear()
}