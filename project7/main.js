const container = document.querySelector(".image-container");
const start = document.querySelector(".start");
const gametest = document.querySelector(".game-test");
const playtime = document.querySelector(".play-time");

let flag  = false;
const tilecount =16;
let score=0;
let tiles =[];
const draged = {el:null,class:null,index:null};//드래그 객체
setgame();





function setgame(params) {
   
tiles = createimagetiles();


setTimeout(()=>{
   
container.innerHTML = "";
shuffle(tiles).forEach(e=>{container.appendChild(e);});
},2000);
}


function createimagetiles(params) {
   const tempArray =[];
   const img =changeimg();
   Array(tilecount).fill().forEach((e,i)=>{
   const li = document.createElement("li");
   li.style.backgroundImage = img;
   li.setAttribute("draggable",true);
   li.setAttribute("data-index",i);
   li.classList.add(`list${i}`);
   
   container.appendChild(li);
   
   tempArray.push(li);
   
     
   });
     
   return tempArray;
}

 function shuffle(array) {
   let index = array.length -1;
   while (index > 0) {
      const randindex = Math.floor(Math.random()* index);
      [array[index],array[randindex]] = [array[randindex],array[index]];
      index--;
   }
   return array;
 }
 function checkstatus(params) {
   const currentList =  [...container.children];
   let checking;
   checking  = currentList.filter((child,index)=>{
     return Number(child.getAttribute("data-index")) != index;// 이런방식으로 리턴값을 사용하면 조건문을 skip을 할 수가 있다.
   });
   if (checking === 0) {
      ++score;
      playtime.innerText = `${score}`;
      changeimg();
      
   }
   else if(score === 7){
      gametest.style.display ="block";
   }
 }
 function changeimg(){
  
  
   let arr = new Array();
   arr[0] = "a.jpg";
   arr[1] = "b.jpg";
   arr[2] = "c.jpg";
   arr[3] = "d.jpg";
   arr[4] = "e.jpg";
   arr[5] = "f.jpg";
   arr[6] = "g.JPG";
   let rannum = Math.floor(Math.random()*7);
   
   
  const bg = "url(img/" +`${arr[rannum]}`;
return bg;

}


 
 //events
 container.addEventListener("dragstart",e=>{
   if (flag === false) {
      e.preventDefault();
      
   }
   else if (score === 7) {
      e.preventDefault();
   }

   const obj = e.target; 
   draged.el = obj;
   draged.class = obj.className;
   draged.index= [...obj.parentNode.children].indexOf(obj);

   
   //draged.index = e.target.parentNode.children;
   
});
container.addEventListener("dragover",e =>{
   e.preventDefault();
   
});
container.addEventListener("drop",e=>{
  const obj = e.target;// 참조형
  

  if (obj.className != draged.class) {

   // 드래그한거랑 놓은 클래스가 다를때
   let originalplace ;//
   let islast = false;//
   if (draged.el.nextsibling) {
      originalplace = draged.el.nextSibling;
   }
   else {
      originalplace = draged.el.previousSibling;
      islast =  true;
   }
   const dragedindex= [...obj.parentNode.children].indexOf(obj);//놓은 인덱스와 동일한 부모노드의자식노드의 배열의 인덱스
   draged.index > dragedindex ? obj.before(draged.el) : obj.after(draged.el);//obj에 앞에 넣는다.or obj 뒤에 넣는다
   islast ? originalplace.after(obj): originalplace.before(obj);
      }
   checkstatus();
   }
);

start.addEventListener("click",e=>{
   if (flag === true) {
      flag  = false;
     start.innerText = "start";
   }
   else{
      flag = true;
      start.innerText ="stop";
      console.log(flag);
   }


});