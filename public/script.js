//Each tool toggle
penciltoolel=document.querySelector(".pencil");
erasertoolel=document.querySelector(".eraser");
penciltoolcontel=document.querySelector(".pencil-tool-cont");
erasertoolcontel=document.querySelector(".eraser-tool-cont");
pencilflag=false;
eraserflag=false;

penciltoolel.addEventListener("click",()=>
{
    if(pencilflag)
    closePencilToolCont();
    else
    openPencilToolCont();
})

function openPencilToolCont()
{
    pencilflag=true;
    penciltoolcontel.style.display="block";
}

function closePencilToolCont()
{
    pencilflag=false;
    penciltoolcontel.style.display="none";
}

erasertoolel.addEventListener("click",()=>
{
    if(eraserflag)
    closeEraserToolCont();
    else
    openEraserToolCont();
})

function openEraserToolCont()
{
    eraserflag=true;
    erasertoolcontel.style.display="block";
}

function closeEraserToolCont()
{
    eraserflag=false;
    erasertoolcontel.style.display="none";
}

// Menu all tools toggle

let toolscontel=document.querySelector(".tools-cont");
let menuel=document.querySelector(".menu-cont");
let toolsflag=true;

menuel.addEventListener("click",()=>
{
    if(toolsflag)
    closeToolsCont();
    else
    openToolsCont();
})

function closeToolsCont()
{
    toolsflag=false;
    toolscontel.style.display="none";
    menuel.children[0].classList.remove("fa-close");
    menuel.children[0].classList.add("fa-bars");
    closeEraserToolCont();
    closePencilToolCont();
}

function openToolsCont()
{
    toolsflag=true;
    toolscontel.style.display="flex";
    menuel.children[0].classList.add("fa-close");
    menuel.children[0].classList.remove("fa-bars");
    closeEraserToolCont();
    closePencilToolCont();
}

//Sticky tool

let stickytoolel=document.querySelector(".notepad");

stickytoolel.addEventListener("click",()=>
{
    createStickyCont();
})

function createStickyCont()
{
    let newstickycont=document.createElement("div");
    newstickycont.classList.add("sticky-cont");
    newstickycont.innerHTML=`<div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea></textarea> 
    </div>`

    document.body.appendChild(newstickycont);

    let minimizeel=newstickycont.querySelector(".minimize");
    let removeel=newstickycont.querySelector(".remove");
    noteActions(minimizeel,removeel,newstickycont);
    newstickycont.onmousedown = function(event) {
        dragAndDrop(newstickycont,event);
      };
      
      newstickycont.ondragstart = function() {
        return false;
      };
    
}

function noteActions(minimizeel,removeel,newstickycont)
{
 
    removeel.addEventListener("click",(e)=>
    {
        newstickycont.remove();
    })
    minimizeel.addEventListener("click",()=>
    {
        
        let noteel=newstickycont.querySelector(".note-cont");
        let notedisplay=getComputedStyle(noteel).getPropertyValue("display");
        if(notedisplay==="none") noteel.style.display="block";
        else noteel.style.display="none";
    })
}

function dragAndDrop(element,event)
{
    
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
  
    moveAt(event.pageX, event.pageY);
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    document.addEventListener('mousemove', onMouseMove);
  
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
}
// upload

uploadel=document.querySelector(".upload");

uploadel.addEventListener("click",()=>
{
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",()=>
    {
        let fileuploaded=input.files[0];
        let urlimg=URL.createObjectURL(fileuploaded);
        let newstickycont=document.createElement("div");
        newstickycont.classList.add("sticky-cont");
        newstickycont.innerHTML=`<div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="note-cont">
           <img src="${urlimg}"/>
        </div>`
    
        document.body.appendChild(newstickycont);
    
        let minimizeel=newstickycont.querySelector(".minimize");
        let removeel=newstickycont.querySelector(".remove");
        noteActions(minimizeel,removeel,newstickycont);
        newstickycont.onmousedown = function(event) {
            dragAndDrop(newstickycont,event);
          };
          
          newstickycont.ondragstart = function() {
            return false;
          };
    })
})