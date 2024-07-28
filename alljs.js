
  let curentpage=1
  let lastpage=1

window.addEventListener("scroll", ()=>{
const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
console.log(window.innerHeight ,  window.pageYOffset , document.body.scrollHeight)

if(endOfPage && curentpage < lastpage)
{

  curentpage=curentpage+1
  getalll(false,curentpage)

}
});

    navbar()
  getalll()
  
  
function profilebtn(userId){

  
  window.location=`profile.html?userid=${userId}` 
}

  function getalll(removeall=true, page = 1 ){ 

    loaderr(true)
 axios.get(`${baseUrl}/posts?limit=20&page=${page}`)
.then((response)=>{
  loaderr(false)
  const posts= response.data.data
 lastpage =response.data.meta.last_page  
if(removeall ){
  document.getElementById("post").innerHTML +=" "
}

 console.log(posts)
 for(i of posts){
 const author = i.author
 let Posttitle=""
/////////////
  let user= getusers()
  let ismypost=  user != null && i.author.id == user.id

  let buttoncontent =``
  if(ismypost){

    buttoncontent =`  

        <button class="btn btn fs-4 bg-danger" style="margin-left:10px; float:right; color: white;" onclick="deletepost('${encodeURIComponent(JSON.stringify(i))}')" ><i class='bx bxs-trash'></i></button>
        <button class="btn btn fs-4 bg-success" style="  float:right;  color:white" onclick="editbtn('${encodeURIComponent(JSON.stringify(i))}')" ><i class='bx bx-edit-alt'></i></button>

    `

}

if( i.title !=null){
  Posttitle= i.title
}

let content = 
`
  <div class="card shadow my-4" >
  <div class="card-header" >
   <span onclick="profilebtn(${author.id})" style="cursor:pointer">
  <img class="rounded-circle border border-2" src=${i.image} style="height: 40px; width: 40px;" alt="">
  <b>${author.username}</b>
   </span>
  ${buttoncontent}
  </div>
  <div class="card-body" onclick="postcliked(${i.id})" style="cursor:pointer">
  <img src=${i.image} style="width: 100%; height: 700px;" alt="">
  <span style="font-size: 17px; color: rgb(157, 155, 155);" >${i.created_at}</span>   
  <h5>${Posttitle}</h5>
  <p style="font-size:18px;">
  ${i.body}
  </p>
  <hr>
  <div class="comment" style="display:flex">
  <box-icon name='message-rounded-dots'>
  </box-icon>
  <span class="mx-1">
  (${i.comments_count})  Comments

  <span id ="post-tags-${i.id}">

  </span>

  </span>
</div>
</div>
</div>
`
       document.getElementById("post").innerHTML +=content

for(tagg of i.tags){
console.log(tagg.name)
let tagscontent=`
<button class="btn-sm rounded-5" style="background-color:gray; color:white">
${tagg.name}
</button>
`
  document.getElementById(curentid).innerHTML +=tagscontent
}

}
// console.log(response)

})

}


 function Createbtn(){
    let postidd= document.getElementById("input-id").value
    let iscreate=postidd ==null || postidd == ""
  

const title =document.getElementById("creatpost").value
const body =document.getElementById("creatbody").value
const image = document.getElementById("createimage").files[0]
const token=localStorage.getItem("token")

let formData =new FormData()
formData.append("body",body)
formData.append("title",title)
formData.append("image",image)

let url=``
const headers={
"Content-Type":"multipart/form-data",
"authorization":`Bearer ${token}`
}

if( iscreate){
    url=`${baseUrl}/posts`

        }
        
    else{

        formData.append("_method", "put")
     url = `${baseUrl}/posts/${postidd}`
        }
        loaderr(true)
        axios.post(url, formData, {
            headers:headers
            })
            .then((response)=>{
              loaderr(false)
            const modal= document.getElementById("create-post-modal")
            const modallogin = bootstrap.Modal.getInstance(modal)  
            modallogin.hide()
            showmodal(" New post created")
            getalll()
            
            }).catch((error)=>{
            const message= error.response.data.message
            showmodal(message,"danger")
            })
    
}
 

function postcliked(id){
window.location=`detailes.html?id=${id}`
}



function addbtnclick(){
  
  document.getElementById("changeup").innerHTML="create"
  document.getElementById("input-id").value= ""
  document.getElementById("post-title").innerHTML="Create New Post"
  document.getElementById("creatpost").value=""
  document.getElementById("creatbody").value=""
  let post= new bootstrap.Modal(document.getElementById("create-post-modal"),{})
    post.toggle()
}


function loaderr(show=true){
  if(show){
    document.getElementById("loader").style.visibility="visible"

  }else{
    document.getElementById("loader").style.visibility="hidden"

  }
 }