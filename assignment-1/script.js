// Your JS code goes here   
    const btnAddBook=document.querySelector("#btnAdd");
    const addBooks= document.querySelector(".addBooksContainer");
    const wrap=document.querySelector(".wrap");
    const btnClose=document.querySelectorAll('span[class="closeButton"]');
    let nameClose=''
// Display tag when clicked button
function displayTag(tag, show = true){
     if(show){
        tag.style.transform = "scale(1)";
        wrap.style.transform = "scale(1)";
     }
     else{
        tag.style.transform = "scale(0)";
        wrap.style.transform = "scale(0)";
     }
}
btnAddBook.onclick =()=>{
    nameClose = "addBooks";
    displayTag(addBooks); 
}       
window.onclick = (e) => {
    const isCloseBtn = [...btnClose].includes(e.target);

    if (e.target === wrap) {
      closeBox(nameClose);
    }
  
    if (isCloseBtn) {    
      closeBox(nameClose);
    }
  };
//Close box when clicked x
    function closeBox(nameClose){
        switch(nameClose){
            case "addBooks":
                displayTag(addBooks,false) ;
                break;
            case "deleteBooks":
                displayTag(deleteBooks,false) ;
                break;  
        } 
    }
//Create an eventlistener for the input to create the label effect
var list = addBooks.getElementsByTagName('input');
      ['blur', 'focus'].forEach(function (evt) {
        for (var i = 0; i < list.length; i++) {
            list[i].addEventListener(evt, function (e) {
                var label = this.previousElementSibling; // this is input 
                if (e.type === 'blur') { //when clicking out
                    if (this.value === '') { //value==null => keep the label intact
                        label.classList.remove('active');
                        label.classList.remove('highlight');
                    } 
                    else { // value # null =>turn off hightlight but don'n turn of active, active use to move label up on
                        label.classList.remove('highlight');
                    }
                } 
                else if (e.type === 'focus') { //  active + hightlight when focus
                    label.classList.add('active');
                    label.classList.add('highlight');
                }
            });
        }   })
//When selecting the cancel button, the color of the delete button will change and vice versa
const btnDelete=document.querySelector("#delete");
const btnCancel=document.querySelector("#cancel");
function myMoveFunction(event){
    if(event.target==btnCancel)
   
        Object.assign(btnCancel.style,{
                color:'#fff', 
                background:'#f33'})&&
        Object.assign(btnDelete.style,{
                    color:'black', 
                    background:'#fff'})
}
function myLeaveFunction(event){
    if(event.target==btnCancel)
    {
        Object.assign(btnCancel.style,{
            color:'black', 
            background:'#fff'})&&
        Object.assign(btnDelete.style,{
                color:'#fff', 
                background:'#f33'})
    }
}

