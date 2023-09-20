// Your JS code goes here   
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
  const hover={
      color:'#fff', 
      background:'#f33'
  }
  const leave={
     color:'black', 
     background:'#fff'
  }
  let nameClose=''
  let id =4 ;

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document)
const nameBookDelete=$("#nameBookDelete");
// button
    const btnAddBook=$("#btnAdd");
    const btnDeleteBook=$("#deleteBook");
    const btnClose=$$('span[class="closeButton"]');
    const btnCreate=$("#btnCreate");
    const btnDelete=$("#delete");
    const btnCancel=$("#cancel");
//form container
    const wrap=$(".wrap");
    const addBooksContainer= $(".addBooksContainer");
    const deleteBooksContainer=$(".deleteBooksContainer");
//input
    const name =$("#name");
    const author=$("#author");
    const topic=$("#topic");
    const search=$("#search-box");
//<--------------------------------
  

//<--------------ADD BOOK ------------------->
//shows the book adding form
btnAddBook.onclick =()=>{
    nameClose = "addBooksContainer";
    displayTag(addBooksContainer); 
}       
btnCreate.onclick=(e)=>{
    e.preventDefault();
    addBooks();
}
displayProducts(list_products); 
function addBooks(){    
    var newbook= getInfor(name.value,author.value,topic.value)
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
    displayProducts(list_products); 
    alert('Thêm sản phẩm "' + newbook.name + '" thành công.');
    displayTag(addBooksContainer,false)
}
//Funtion getInfor (Get value from value)
function getInfor(name,author,topic){  
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
//Displaybook  (Display books on the table) 
function displayProducts(books)
{
    var vt = $("#inforBooks");
    s=books.map((p)=>
    `<tr id="book${p.id}">
       <td>${p.name}</td>
       <td>${p.author}</td>
       <td>${p.topic}</td>
       <td><button id="deleteBook" onclick="showDeleteBook(event,${p.id},'${p.name}')" ><ins >${p.action}</ins></button> </td>
        </tr>`)
     vt.innerHTML = s.join('');

}
//<-------------- SEARCH BOOK --------------->
function searchBook(){
    const searchName=search.value;
    var books=list_products.filter((book)=> book.name.toLowerCase().includes(searchName.toLowerCase().trim()))
    displayProducts(books)

}
//<-------------- DELETE BOOK --------------->
//show the Delete box and delete   (onclick delete button will call the function)
function showDeleteBook(event,id,name){     
        event.preventDefault();
        nameClose="deleteBooksContainer";
        nameBookDelete.innerHTML=name;
            console.log(name,nameBookDelete);
        displayTag(deleteBooksContainer); 
        btnDelete.onclick=(e)=>
        {
        e.preventDefault();
        deleteBookId(id);
        displayTag(deleteBooksContainer,false)
        }
    }
function deleteBookId(id) {
    for(var i = 0; i < list_products.length; i++) {
        if(list_products[i].id == id) {
            list_products.splice(i, 1);
        }
        displayProducts(list_products); //display table products
}
}

//<-------Functions that support opening and closing forms --------->
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
//Displaytag funtion(Function to display tag when pressing the button)
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
//Closebox function (Close box function when x is clicked)
 function closeBox(nameClose){
        switch(nameClose){
            case "addBooksContainer":
                displayTag(addBooksContainer,false) ;
                break;
            case "deleteBooksContainer":
                displayTag(deleteBooksContainer,false) ;
                break;  
        } 
    }
//<-------------------------Effect-------------------->
// Highlight label  (Create an eventlistener for the input to create the label effect)
var list = addBooksContainer.getElementsByTagName('input');
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
//  Delete+cancal button effect (When selecting the cancel button, the color  
                                   // of the delete button will change and vice versa)
    function myMoveFunction(event){
        if(event.target==btnCancel)
       
            Object.assign(btnCancel.style,hover)&&
            Object.assign(btnDelete.style,leave)
    }
    function myLeaveFunction(event){
        if(event.target==btnCancel)
        {
            Object.assign(btnCancel.style,leave)&&
            Object.assign(btnDelete.style,hover)
        }
    }