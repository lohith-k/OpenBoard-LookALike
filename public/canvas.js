let canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let downloadel=document.querySelector(".download");
let redoel=document.querySelector(".redo");
let undoel=document.querySelector(".undo");

let pencolorsel=document.querySelectorAll(".pencil-color");
let penwidthel=document.querySelector(".pencil-tool-cont input");
let eraserwidthel=document.querySelector(".eraser-tool-cont input");

let undoredotracker=[];
let track=0;
let mouseDown=false;
let erasercolor="white";
let pencolor="black";
let penwidth=penwidthel.value;
let eraserwidth=eraserwidthel.value;

const tool = canvas.getContext("2d");
tool.strokeStyle=pencolor;
tool.lineWidth=penwidth;


canvas.addEventListener("mousedown",(e)=>
{
    mouseDown=true;
    let data={
        xvalue:e.clientX,
        yvalue:e.clientY
    }
    socket.emit("beginpath",data);
})

function beginpath(data)
{
    tool.beginPath();
    tool.moveTo(data.xvalue, data.yvalue);
}

canvas.addEventListener("mousemove",(e)=>
{
    if(mouseDown)
    {
        let data={
            xvalue:e.clientX,
            yvalue:e.clientY,
            width:eraserflag ? eraserwidth : penwidth,
            color:eraserflag ?erasercolor:pencolor
        }
        socket.emit("drawpath",data);
    }
})

function drawpath(data)
{
    tool.strokeStyle = data.color;
    tool.lineWidth = data.width;
    tool.lineTo(data.xvalue, data.yvalue);
    tool.stroke();
}

canvas.addEventListener("mouseup",()=>
{
    mouseDown=false;
    let url=canvas.toDataURL();
    undoredotracker.push(url);
    track=undoredotracker.length-1;
})

undoel.addEventListener("click",()=>
{
    if(track>0)track--;

    let data={
        trackValue:track,
        undoredotracker
    }
    socket.emit("trackobj",data);
})

redoel.addEventListener("click",()=>
{
    if(track<undoredotracker.length-1) track++;
    let data={
        trackValue:track,
        undoredotracker
    }
    socket.emit("trackobj",data);
})

function undoRedoCanvas(trackobj)
{
    track=trackobj.trackValue;
    undoredotracker=trackobj.undoredotracker;
    console.log(trackobj)
    let url = undoredotracker[track];
    console.log(url);
    let img = new Image();
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height); // new image reference element
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

pencolorsel.forEach((eachpenel)=>
{
    eachpenel.addEventListener("click",(e)=>
    {
        pencolor=eachpenel.classList[0];
        tool.strokeStyle=pencolor;
    })
})

penwidthel.addEventListener("change",()=>
{
    penwidth=penwidthel.value;
    tool.lineWidth=penwidth;
})

eraserwidthel.addEventListener("change",()=>
{
    eraserwidth=eraserwidthel.value;
    tool.lineWidth=eraserwidth;
})

erasertoolel.addEventListener("click",()=>
{
    if(eraserflag)
    {
        tool.strokeStyle=erasercolor;
        tool.lineWidth=eraserwidth;
    }
    else
    {
        tool.strokeStyle=pencolor;
        tool.lineWidth=penwidth;
    }
})

downloadel.addEventListener("click",()=>
{
    let url=canvas.toDataURL();  

    let a=document.createElement("a");
    a.href=url;
    a.download="board.jpg";
    a.click();
})

socket.on("beginpath",(data)=>
	{
		beginpath(data);
	})

socket.on("drawpath",(data)=>
	{
		drawpath(data);
	})
socket.on("trackobj",(data)=>
	{
		undoRedoCanvas(data);
	})