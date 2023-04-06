let target = document.querySelector("#dynamic");


function randomString(){
    let stringArr = ["Learn to HTML","Learn to CSS","Learn to Javascript","Learn to JAVA"];
    let selectString = stringArr[Math.floor(Math.random()*stringArr.length)];
    let selectStringArr = selectString.split("");
    return selectStringArr;
}

//타이핑 리셋
function resetTyping(){
    target.textContent="";
    dynamic(randomString());
}
//한글자씩 텍스트 출력 함수
function dynamic(randomarr) {
    
  if (randomarr.length > 0) {
    target.textContent += randomarr.shift();
    setTimeout(function (params) {
        
    dynamic(randomarr);},80);
    
  }
  else{
    setTimeout(resetTyping,3000);
  }  
}
dynamic(randomString());

//커서 깜빡임 효과
function blink(){
    target.classList.toggle("active");
}
setInterval(blink,500);
