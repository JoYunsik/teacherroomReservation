const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span"),
addEventTitle = document.querySelector(".add-event-header .title");
const boxes = document.querySelectorAll(".booking");
const addEventWrapper = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".add-event-header .material-symbols-outlined");
const wrapper = document.querySelector(".wrapper");
const eventDeleteBtn =document.querySelector(".event .material-symbols-outlined");
const dayWrappers = document.querySelectorAll(".day-wrapper");
const gradeInput = document.querySelector(".grade");
const classInput = document.querySelector(".class");
const exclusiveInput = document.querySelector(".exclusive");
const kindergardenInput = document.querySelector(".kindergarden");
const addEventBtn = document.querySelector(".add-event-btn");

let date = new Date(),
currDate = date.getDate(),
currYear = date.getFullYear(),
currMonth =date.getMonth(),
currDay=date.getDay(),
bookingDate="",
bookingYear="",
bookingMonth="",
bookingIndex="",
bookingRoom="",
room=0,
roomNames=["한마음관","4층강당","컴퓨터실","과학실","실과실","미술실","음악실"];

let eventsArr = [];

ajaxBH("POST", "eventdata.txt", null)
.then(processList)
.catch(function(error) {
  console.error("An error occurred while loading data:", error);
});

let weekData=[];

function roomchange(option) {
    room=option;
    renderCalendar();
    updateEvents();
}

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    currDay = new Date(currYear, currMonth, currDate).getDay();
    let liTag = "";
    weekData=[];
    for(let i= currDate-currDay; i<currDate;i+=1){
        let renderdate = i>0 ? i : i+lastDateofLastMonth;
        if(renderdate==1){
            liTag += `<li class="">${currMonth+1}/${renderdate}</li>`;
        }
        else{
            liTag += `<li class="">${renderdate}</li>`;
        }
        weekData.push({
            date: new Date(currYear,currMonth, i).getDate(),
            year: new Date(currYear,currMonth, i).getFullYear(),
            month: new Date(currYear,currMonth, i).getMonth(),
            room: room
        });
        
    }
    for (let i = currDate; i<currDate+(7-currDay); i+=1){
        let isToday = i == new Date().getDate() && currMonth == new Date().getMonth() 
                        && currYear == new Date().getFullYear() ? "active" : "";
        
        let renderdate = i>lastDateofMonth ? i-lastDateofMonth : i;
        if(i==1&& currDate==1){
            liTag += `<li class="${isToday}">${currMonth+1}/${renderdate}</li>`;
        }
        else if(isToday){
            liTag += `<li class="${isToday}">${currMonth+1}/${renderdate}</li>`;
        }
        
        else if(renderdate==1){
            liTag += `<li class="${isToday}">${currMonth+2<=12? currMonth+2:1}/${renderdate}</li>`;
        }
        else{
            liTag += `<li class="${isToday}">${renderdate}</li>`;
        }
        weekData.push({
            date: new Date(currYear,currMonth, i).getDate(),
            year: new Date(currYear,currMonth, i).getFullYear(),
            month: new Date(currYear,currMonth, i).getMonth(),
            room: room
        });
    }
    let monthconvert= new Date(currYear,currMonth,currDate-currDay).getMonth();
    currentDate.innerText = ` ${currYear}년 ${monthconvert+1}월 \u00a0 ${roomNames[room]}`; // passing current mon and yr as currentDate text
    
    daysTag.innerHTML = liTag;
    weekData=weekData.slice(1,6);
    updateEvents();
}

renderCalendar();
// 이전주, 다음 주 실행
prevNextIcon.forEach(icon =>{
    icon.addEventListener("click",()=>{
        currDate = icon.id === "prev" ? currDate - 7 : currDate + 7;
        
        if(currDate <= 0 || currDate > new Date(currYear, currMonth + 1, 0).getDate()){
        
             date = new Date(currYear, currMonth, currDate);
             currDate = date.getDate();
             currYear = date.getFullYear(); 
             currMonth = date.getMonth(); 
        }
         else {
             date = new Date(); // pass the current date as date value
         }
        //  weekData =[];
         boxes.forEach((box)=>{
            box.innerHTML="";
         });
         renderCalendar(); // calling renderCalendar function 
    });
});
// box를 클릭했을때
boxes.forEach(box=>{
    box.addEventListener("click", (e)=>{
        if(box.classList.contains("empty")){
            classInput.value="";
            gradeInput.value="";
            exclusiveInput.value="";
            kindergardenInput.value="";
            if(e.target.classList.contains("material-symbols-outlined")){
                deleteEvent(e);
            }
            else{
                wrapper.classList.add("cover");
                if(box.classList.contains("empty")){
                    addEventWrapper.classList.toggle("active");
                }
                const parentNodes = [...box.parentElement.children];
                bookingIndex = parentNodes.indexOf(box);
                if(e.target.parentElement.classList.contains('monday')){
                    bookingDate = new Date(currYear, currMonth, currDate+(1-currDay)).getDate();
                    bookingMonth =new Date(currYear, currMonth, currDate+(1-currDay)).getMonth();
                    bookingYear = new Date(currYear, currMonth, currDate+(1-currDay)).getFullYear();
                }
                if(e.target.parentElement.classList.contains('tuesday')){
                    bookingDate = new Date(currYear, currMonth, currDate+(2-currDay)).getDate();
                    bookingMonth =new Date(currYear, currMonth, currDate+(2-currDay)).getMonth();
                    bookingYear = new Date(currYear, currMonth, currDate+(2-currDay)).getFullYear();
                }
                if(e.target.parentElement.classList.contains('wednesday')){
                    bookingDate = new Date(currYear, currMonth, currDate+(3-currDay)).getDate();
                    bookingMonth =new Date(currYear, currMonth, currDate+(3-currDay)).getMonth();
                    bookingYear = new Date(currYear, currMonth, currDate+(3-currDay)).getFullYear();
                }
                if(e.target.parentElement.classList.contains('thursday')){
                    bookingDate = new Date(currYear, currMonth, currDate+(4-currDay)).getDate();
                    bookingMonth =new Date(currYear, currMonth, currDate+(4-currDay)).getMonth();
                    bookingYear = new Date(currYear, currMonth, currDate+(4-currDay)).getFullYear();
                }
                if(e.target.parentElement.classList.contains('friday')){
                    bookingDate = new Date(currYear, currMonth, currDate+(5-currDay)).getDate();
                    bookingMonth =new Date(currYear, currMonth, currDate+(5-currDay)).getMonth();
                    bookingYear = new Date(currYear, currMonth, currDate+(5-currDay)).getFullYear();
                }
                bookingRoom = room;
                addEventTitle.innerHTML = bookingYear + '년 '+(bookingMonth+1) +'월 ' + bookingDate+'일 '+(bookingIndex+1)+'교시\u00a0\u00a0'+roomNames[bookingRoom];
                // console.log(bookingIndex,bookingYear,bookingMonth,bookingDate,bookingRoom);
            }
        }
        else if(e.target.classList.contains("material-symbols-outlined")) {
            deleteEvent(e);
        }
        else{
            alert("더이상 추가할 수 없습니다.");
            return;
        }
          
    })
})
// 삭제 버튼 작동
function deleteEvent(e){
    if(confirm("삭제하시겠습니까?")){
        let deleteTitle = e.target.previousElementSibling.innerText;
    let daybox = e.target.parentElement.parentElement;
    let dayboxes = [...daybox.parentElement.children];
    let deleteIndex = dayboxes.indexOf(daybox);
    let deleteDate ='';
    let deleteMonth='';
    let deleteYear='';
    if(daybox.parentElement.classList.contains('monday')){
        deleteDate = new Date(currYear, currMonth, currDate+(1-currDay)).getDate();
        deleteMonth =new Date(currYear, currMonth, currDate+(1-currDay)).getMonth();
        deleteYear = new Date(currYear, currMonth, currDate+(1-currDay)).getFullYear();
    }
    if(daybox.parentElement.classList.contains('tuesday')){
        deleteDate = new Date(currYear, currMonth, currDate+(2-currDay)).getDate();
        deleteMonth =new Date(currYear, currMonth, currDate+(2-currDay)).getMonth();
        deleteYear = new Date(currYear, currMonth, currDate+(2-currDay)).getFullYear();
    }
    if(daybox.parentElement.classList.contains('wednesday')){
        deleteDate = new Date(currYear, currMonth, currDate+(3-currDay)).getDate();
        deleteMonth =new Date(currYear, currMonth, currDate+(3-currDay)).getMonth();
        deleteYear = new Date(currYear, currMonth, currDate+(3-currDay)).getFullYear();
    }
    if(daybox.parentElement.classList.contains('thursday')){
        deleteDate = new Date(currYear, currMonth, currDate+(4-currDay)).getDate();
        deleteMonth =new Date(currYear, currMonth, currDate+(4-currDay)).getMonth();
        deleteYear = new Date(currYear, currMonth, currDate+(4-currDay)).getFullYear();
    }
    if(daybox.parentElement.classList.contains('friday')){
        deleteDate = new Date(currYear, currMonth, currDate+(5-currDay)).getDate();
        deleteMonth =new Date(currYear, currMonth, currDate+(5-currDay)).getMonth();
        deleteYear = new Date(currYear, currMonth, currDate+(5-currDay)).getFullYear();
    }
    let deleteRoom=room;
    // console.log(deleteIndex,deleteYear,deleteMonth,deleteDate,deleteRoom);
    eventsArr.forEach((event)=>{
        if(
            event.date == deleteDate&&
            event.month ==deleteMonth&&
            event.year==deleteYear&&
            event.time==deleteIndex&&  
            event.room==deleteRoom
        ){
            event.events.forEach((item,index)=>{
                if(item==deleteTitle){
                    event.events.splice(index,1)
                }
            });
            if(event.events.length==0){
                eventsArr.splice(eventsArr.indexOf(event),1);
            }
        }
    });
    updateEvents();
    }
}
// 닫기 버튼
addEventCloseBtn.addEventListener("click",()=>{
    addEventWrapper.classList.remove("active");
    wrapper.classList.remove("cover");
})

// 학반, 학년 한자리수/ 전담, 유치원 세글자 만들기
gradeInput.addEventListener("input", (e) => {
    if (gradeInput.value.length > 1) {
      gradeInput.value = gradeInput.value.slice(0, 1);
    }
    exclusiveInput.value = '';
    kindergardenInput.value = '';
  });
classInput.addEventListener("input", (e) => {
    if (classInput.value.length > 1) {
        classInput.value = classInput.value.slice(0, 1);
    }
    exclusiveInput.value = '';
    kindergardenInput.value = '';
});
exclusiveInput.addEventListener("input",(e)=>{
    if (exclusiveInput.value.length > 3) {
        exclusiveInput.value = exclusiveInput.value.slice(0, 3);
    }
    gradeInput.value='';
    classInput.value='';
    kindergardenInput.value = '';
});
kindergardenInput.addEventListener("input",(e)=>{
    if (kindergardenInput.value.length > 3) {
        kindergardenInput.value = kindergardenInput.value.slice(0, 3);
    }
    gradeInput.value='';
    classInput.value='';
    exclusiveInput.value = '';
});
  
// 예약하기를 눌렀을떄
addEventBtn.addEventListener("click",()=>{
    if(gradeInput.value=="" && classInput.value=="" && exclusiveInput.value=="" && kindergardenInput.value=="" ){
        alert("예약할 내용을 입력해 주세요.");
        return;
    }
    if(gradeInput.value!=="" && classInput.value==""){
        alert("반을 입력해주세요.");
        return;
    }
    if(gradeInput.value=="" && classInput.value!==""){
        alert("학년을 입력해 주세요.");
        return;
    }
    let newEvent =''
    if(gradeInput.value!=="" && classInput.value!==""){
        newEvent = `${gradeInput.value}-${classInput.value}`;
    };
    if(exclusiveInput.value!==""){
        newEvent = exclusiveInput.value;
    };
    if(kindergardenInput.value!==""){
        newEvent = kindergardenInput.value;
    };
    // 이벤트가 이미 있는지 확인
    let eventExist = false;
    eventsArr.forEach((event) =>{
        if(
            event.date == bookingDate&&
            event.month == bookingMonth&&
            event.year == bookingYear&&
            event.time ==bookingIndex&&
            event.room == bookingRoom
        ){
            event.events.forEach((event)=>{
                if(event==newEvent){
                    eventExist = true;
                }
            });
        }
    });
    if (eventExist){
        alert("이미 추가된 내용입니다.")
        return;
    }
    let eventAdded = false;
    let eventfull =false;
    if (eventsArr.length>0){
        eventsArr.forEach((event) =>{
            if(
                event.date == bookingDate&&
                event.month == bookingMonth&&
                event.year == bookingYear&&
                event.time ==bookingIndex&&
                event.room == bookingRoom&&
                event.default==false
            ){
                if(event.events.length<2){
                    event.events.push(newEvent);
                    eventAdded =true;
                }
                else{
                    alert('더 이상 추가할 수 없습니다.');
                    eventfull=true;
                    return;
                }
            }
        });
    }

    if(!eventAdded && !eventfull){
        eventsArr.push({
        date : bookingDate,
        year : bookingYear,
        month : bookingMonth,
        time : bookingIndex,
        room : bookingRoom,
        default:false,
        events : [newEvent]
        })
    }
    updateEvents();
    wrapper.classList.remove("cover");
    addEventWrapper.classList.remove("active");
});

function updateEvents(){
    if (eventsArr.length === 0) {
        return;
      }
    boxes.forEach((box)=>{
        box.innerHTML="";
    });
    eventsArr.forEach((event)=>{
        weekData.forEach((data, index)=>{
            let events="";
            if(
                event.date==data.date&&
                event.month==data.month&&
                event.year==data.year&&
                event.room==data.room&&
                event.default==true
            ){
                event.events.forEach((event)=>{
                    events+=`<div class="event default">
                    <div class="event-title">${event}</div>
                    <span class="material-symbols-outlined"> close </span>
                  </div>`;
                });
                dayWrappers[index].children[event.time].innerHTML+=events;
            }
            else if(
                event.date==data.date&&
                event.month==data.month&&
                event.year==data.year&&
                event.room==data.room&&
                event.default==false
            ){
                event.events.forEach((event)=>{
                    events+=`<div class="event">
                    <div class="event-title">${event}</div>
                    <span class="material-symbols-outlined"> close </span>
                    </div>`;
                });
                dayWrappers[index].children[event.time].innerHTML+=events;
            }
        });
    });
    if(room==0){
        boxes.forEach((box)=>{
            if(box.childElementCount==2 && box.classList.contains("empty")){
                box.classList.remove("empty");
            }
            if(box.childElementCount<2 && !box.classList.contains("empty")){
                box.classList.add("empty");
            };
        });
    }
    else{
        boxes.forEach((box)=>{
            if(box.childElementCount==1 && box.classList.contains("empty")){
                box.classList.remove("empty");
            }
            if(box.childElementCount<1 && !box.classList.contains("empty")){
                box.classList.add("empty");
            };
        });
    }
    saveEvents();
}


function result(data){
    // console.log(data);
}

function processList(data){
    if(data==null){
        return; 
    }
    eventsArr=JSON.parse(data);
    updateEvents();
}
function saveEvents() {
    ajaxBH("POST", "write.php", "events=" + JSON.stringify(eventsArr))
      .then(result)
      .catch(function(error) {
        console.error("An error occurred while saving events:", error);
      });
  }

function ajaxBH(method, url, data) {
    return new Promise(function(resolve, reject) {
      var xmlhttp;
  
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
  
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            resolve(xmlhttp.responseText);
          } else {
            reject(Error(xmlhttp.statusText));
          }
        }
      };
  
      if (method == "POST") {
        xmlhttp.open("POST", url, true);
      } else if (method == "GET") {
        xmlhttp.open("GET", url, true);
      }
  
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(data);
    });
  }
