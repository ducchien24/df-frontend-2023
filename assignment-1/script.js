// Your JS code goes here   
    const btnAddBook=document.querySelector("#btnAdd");
    const addBooks= document.querySelector(".addBooksContainer");
    const wrap=document.querySelector(".wrap");
    const btnClose=document.querySelectorAll('span[class="closeButton"]');
    let nameClose=''
    const btnDeleteBook=document.querySelector("#deleteBook");
    const deleteBook=document.querySelector(".deleteBooksContainer");
;
    let id =4 ;
    const btnCreate=document.querySelector("#btnCreate");
    const btnDelete=document.querySelector("#delete");
    const btnCancel=document.querySelector("#cancel");
//Display box,form
btnAddBook.onclick =()=>{
    nameClose = "addBooks";
    displayTag(addBooks); 
}       
btnCreate.onclick=(e)=>{
    e.preventDefault();
    thembook();
}
function showDeleteBook(event,id){
        event.preventDefault();
        nameClose="deleteBook";
        displayTag(deleteBook); 
        btnDelete.onclick=(e)=>
        {
        e.preventDefault();
        xoaSanPham(id);
        displayTag(deleteBook,false)
        }
    }

//cases to close box
window.onclick = (e) => {
    //when clicking an area outside of a box or form
    const isCloseBtn = [...btnClose].includes(e.target);
    if (e.target === wrap) {
       closeBox(nameClose);
    }
    //when pressing the close button
   else if (isCloseBtn) {    
       closeBox(nameClose);
    }
    //when clicking the cancel button
    else if(e.target==btnCancel){
       closeBox(nameClose);
     }
    
  };
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
//Function Close box when clicked x
    function closeBox(nameClose){
        switch(nameClose){
            case "addBooks":
                displayTag(addBooks,false) ;
                break;
            case "deleteBook":
                displayTag(deleteBook,false) ;
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
  
var list_products=[
    {   id:"1",
        name: "Refactoring", 
        author: "Martin Fowler", 
        topic: "Programming",
        action:"Delete"
    },

   {    id:"2",
         name: "Design Data-Intensive Application", 
         author: "Martin Kleppmann", 
         topic: "Database",
         action:"Delete"
    },
   { id:"3",
        name: "The Phoenix Project", 
        author: "Gene Kim", 
         topic: "DevOps",
         action:"Delete"
    },
]
// Vẽ bảng sách

function Laythongtin(name,author,topic){  
    
    if(name==""||undefined) {
        alert('Cuốn sách này chưa có tên');
        return false;
    }

    if(author==""||undefined) {
        alert('Cuốn sách này chưa có tác giả');
        return false;
    }

try{
    return{ 
        "id":id++,
        "name":name,
        "author":author,
        "topic":topic,
        "action":"Delete"
    }}
     catch(e) {
        alert('Lỗi: ' + e.toString());
        return false;
    }
    }
function thembook(){    
var name =document.querySelector("#name");
var author=document.querySelector("#author");
var topic=document.querySelector("#topic");
    var newbook= Laythongtin(name.value,author.value,topic.value)
    if(!newbook) return;
    for(var p of list_products) {
        if(p.id == newbook.id) {
            alert('Mã sản phẩm bị trùng !!');
            return false;
        }

        if(p.name == newbook.name) {
            alert('Tên sản phẩm bị trùng !!');
            return false;
        }
    }
    list_products.push(newbook);
    addTableProducts(); 
    alert('Thêm sản phẩm "' + newbook.name + '" thành công.');
    displayTag(addBooks,false)
}

function addTableProducts()
{
    var vt = document.querySelector("#inforBooks");
    s=list_products.map((p)=>
    `<tr id="book${p.id}">
       <td>${p.name}</td>
       <td>${p.author}</td>
       <td>${p.topic}</td>
       <td><button id="deleteBook" onclick="showDeleteBook(event,${p.id})" ><ins >${p.action}</ins></button> </td>
        </tr>`)
     vt.innerHTML = s.join('');

}
function xoaSanPham(id) {
        // Xóa
        for(var i = 0; i < list_products.length; i++) {
            if(list_products[i].id == id) {
                list_products.splice(i, 1);
            }
        // Vẽ lại table 
        addTableProducts();
    }
}