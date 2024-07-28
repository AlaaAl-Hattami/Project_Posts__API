 navbar()
myprofile()
getalll()

function all(){
  const urlparam = new URLSearchParams(window.location.search)
  const postid= urlparam.get("userid")
  return postid
}

function myprofile() {
  const id = all()

  axios.get(`${baseUrl}/users/${id}`)
  .then((response) => {
    console.log(response.data.data)
    const user =response.data.data
    document.getElementById("info-email").innerHTML= user.email 
    document.getElementById("info-name").innerHTML= user.name 
    document.getElementById("info-username").innerHTML= user.username 
    document.getElementById("hesder-img").src=user.profile_image
    document.getElementById("username-in").innerHTML=`${user.name}'s`

    document.getElementById("comment").innerHTML=user.comments_count
    document.getElementById("post").innerHTML=user.posts_count


  })
}

function getalll(){

const id= all()

  axios.get(`${baseUrl}/users/${id}/posts`)
 .then((response)=>{
  console.log(response.data.data)

   const postss= response.data.data
 
   document.getElementById("mypost").innerHTML=""

   for( i of postss){
console.log(i)
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
   <div class="card shadow my-4">
   <div class="card-header ">
   <img class="rounded-circle border border-2" src=${author.profile_image} style="height: 40px; width: 40px;"  alt="">
   <b>${author.username}</b>
 ${buttoncontent}
 </div>
   <div class="card-body" onclick="postcliked(${i.id})">
   <img src=${i.image} style="width: 100%; height: 700px;" alt="">
   <span style="font-size: 17px; color: rgb(157, 155, 155);" >${i.created_at}</span>   
 <h5>${Posttitle}</h5>
 <p style="font-size: 18px;">
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
 document.getElementById("mypost").innerHTML +=content

 const curentid= `post-tags-${i.id}`
 document.getElementById(curentid).innerHTML =""
 
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
 