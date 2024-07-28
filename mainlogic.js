
const baseUrl="https://tarmeezacademy.com/api/v1"


function mypro() {
  const user=getusers()
  const userid= user.id
  window.location=`profile.html?userid=${userid}` 
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
           
          const modal= document.getElementById("create-post-modal")
          const modallogin = bootstrap.Modal.getInstance(modal)  
          modallogin.hide()
          showmodal(" New post created")
          getalll()
          

          }).catch((error)=>{
          const message= error.response.data.message
          showmodal(message,"danger")
          }).finally(()=>{
            loaderr(false)
          })
  
}


function editbtn(postobject){
  let object =JSON.parse(decodeURIComponent(postobject))
 console.log(object)
 
 document.getElementById("changeup").innerHTML="Update"
 document.getElementById("input-id").value= object.id
 document.getElementById("post-title").innerHTML="Edite Post "
 document.getElementById("creatpost").value=object.title
 document.getElementById("creatbody").value=object.body
  let post= new bootstrap.Modal(document.getElementById("create-post-modal"),{})
    post.toggle()
}


    function deletepost(postobject){  

  let object =JSON.parse(decodeURIComponent(postobject))
  console.log(object)

  document.getElementById("input-iidd").value = object.id
  
  let post= new bootstrap.Modal(document.getElementById("delete-post-modal"), {})
    post.toggle()
}


 function confirmDelete(){
  const token=localStorage.getItem("token")
 const Postid=  document.getElementById("input-iidd").value

 const url=`${baseUrl}/posts/${Postid}`

 const headers={
 "Content-Type":"multipart/form-data",
 "authorization":`Bearer ${token}`
 }
  
  axios.delete(url, {

    headers:headers
    })
  .then((response)=>{
    console.log(response)
  
   
    const modal= document.getElementById("delete-post-modal")
    const modallogin = bootstrap.Modal.getInstance(modal)  
    modallogin.hide()
    showmodal(" لقد تم حذف منشورك بنجاح ")
    getalll()

  }).catch((error)=>{
    const message= error.response.data.message
    showmodal(message,"danger")
    })
}


function navbar(){
    const token  = localStorage.getItem("token")
    
    const login= document.getElementById("login-div")
    const logout =document.getElementById("logout-div")
    const addbtn=document.getElementById("add-btn")
     
  

      if(token == null){

        if(addbtn !=null){
            addbtn.style.setProperty("display","none","important")
        }
      login.style.setProperty("display","flex","important")
      logout.style.setProperty("display","none","important")
    
      }
    
        else
      {
if(addbtn != null){
    addbtn.style.setProperty("display","block","important")

}

    login.style.setProperty("display","none","important")
    logout.style.setProperty("display","flex","important")
    
    const user =getusers()
    document.getElementById("nav-username").innerHTML= user.username
    document.getElementById("nav-img").src= user.profile_image
    }
    }
      navbar()
 
      // هذه الداله تقوم بارجاع id الحالي  

      function getusers(){
        let user=null
        const storageuser= localStorage.getItem("user")
        if(storageuser !=null){
          user= JSON.parse(storageuser)
        }
        return user
      }
    //   login//////////// هذه داله تسجيل الدخول 
      function loginbtn(){
        const user =document.getElementById("username").value
        const pass =document.getElementById("password").value
        const params ={
          "username" : user,
          "password" : pass
          }
      
        const url=`${baseUrl}/login`
        loaderr(true)
        axios.post(url, params)
        .then((response)=>{
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("user",JSON.stringify(response.data.user))
      
        const modal= document.getElementById("loginModal")
        const modallogin = bootstrap.Modal.getInstance(modal)  
          modallogin.hide()
          showmodal("log-in on this page")
          navbar()
        }).catch((error)=>{
          const message= error.response.data.message
          showmodal(message,"danger")

        }).finally(()=>{

          loaderr(false)
        })
      }
      
    //   regesterbtn////////////////

      function regesterbtn(){
        const name =document.getElementById("regester-name-input").value
        const username =document.getElementById("regester-username-input").value
        const password =document.getElementById("regester-password-input").value
        const image = document.getElementById("regester-img-input").files[0]
      
        let formData =new FormData()
        formData.append("name",name)
        formData.append("username",username)
        formData.append("password",password)
        formData.append("image",image)
        
        const headers={
          "Content-Type":"multipart/form-data",
        }
      
        const url=`${baseUrl}/register`
        loaderr(true)
        axios.post(url, formData, {
      
         headers:headers
        }).then((response)=>{
          console.log(response.data)
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("user",JSON.stringify(response.data.user))
      
        const modal= document.getElementById("regesterModal")
        const modallogin = bootstrap.Modal.getInstance(modal)  
          modallogin.hide()
      
          showmodal(" New regester user on the page","success")
          navbar()
      
        }).catch((error)=>{
          const message= error.response.data.message
          showmodal(message,"danger")
        }).finally(()=>{
          loaderr(false)
        })
      }
      
      ///////// logout/////////////
  function outbtn()
  {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
   showmodal("logged out  on the page","danger")
  navbar()
  }

////// showmodal-ALERT//////////////////
  function showmodal(alertmeassage, type ="success"){
      
    let alertplaceholder = document.getElementById('success-alert')
  const alert = (message, type) => {
    const wrapper = document.createElement('div')
wrapper.innerHTML = [
  `<div class="alert alert-${type} alert-dismissible" role="alert">`,
  `   <div>${message}</div>`,
  '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
  '</div>'
].join('')

alertplaceholder.append(wrapper)
}

alert(alertmeassage,type)

setTimeout(()=>{

} ,2000)

    }

 function loaderr(show=true){
  if(show){
    document.getElementById("loader").style.visibility="visible"

  }else{
    document.getElementById("loader").style.visibility="hidden"

  }
 }