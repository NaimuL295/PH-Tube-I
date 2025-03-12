const showloader=()=>{
document.getElementById("loader").classList.remove("hidden")
document.getElementById("vidoes-container").classList.add("hidden")
}
const hideloader=()=>{
document.getElementById("loader").classList.add("hidden")
document.getElementById("vidoes-container").classList.remove("hidden")
}


function removeActiveclass(){
  const activeButton =document.getElementsByClassName("active");
  for (const btn of activeButton) {
    btn.classList.remove("active")
  }
}




function loadCatories(){
    //1fetch data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=>res.json()
    //2 send data  display 
     ).then((data)=> displaycatories(data.categories));
}

function loadVideos(searchtext=""){
  showloader()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext}`)
    .then(response=>response.json())
  
    .then(data  => {
      removeActiveclass()
        document.getElementById("btn-all").classList.add("active")
    
      displayVidoes(data.videos)}
    )
}

const loadCatoriesVides=(id)=>{
console.log(id);
const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`
console.log(url);
fetch(url).then((res)=>res.json())
.then((data)=>{
  removeActiveclass()
  const clickbtn =document.getElementById(`btn-${id}`)
  console.log(clickbtn)
  clickbtn.classList.add("active")
displayVidoes(data.category)
  
    
})
}
const  loadVideoDetils=(videoid)=>{

  const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoid}`
fetch(url).then((res)=>res.json())
.then((data)=> displayvidesDetails(data.video)
)
}
const displayvidesDetails=(video)=>{
console.log(video);

document.getElementById("video_detils").showModal()
const  detailscontainer=document.getElementById("delali-container");

detailscontainer.innerHTML=`

<div class="card bg-base-100 image-full w-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.description}</h2>
   
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>

`
}


function displayVidoes(video){
const  videoContainer=document.getElementById("vidoes-container");
videoContainer.innerHTML=""

if (video.length==0) {
  videoContainer.innerHTML=` 
   <div class=" 
   col-span-full text-center flex flex-col justify-center items-center  py-20" >
        <img  class="  w-[120px] " src="./image/Icon.png" alt="">
        <h2 class="text-2xl">Oops!! Sorry, There is no content here</h2>
    </div>
  `
  hideloader()
  return
}
video.forEach(videos => {
    const videoCard=document.createElement("div")
    videoCard.innerHTML=`
     <div class="card bg-base-100  shadow-sm  ">
<figure class="relative  ">
<img class="w-full h-[150px]  object-cover "
  src="${videos.thumbnail}"
  alt="" />
  <span class="absolute bottom-2 text-sm right-3  rounded-md text-white bg-black"> 3hrs 56min age</span>
</figure>
<div class=" flex gap-3 px-0 py-5">
<div class="profile">
  <div class="avatar">
    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
      <img src="${videos.authors[0].profile_picture}" />
    </div>
  </div>
</div>
<div class="intro ">
  <h2 class="text-sm font-semibold "> midnight serenade</h2>
  <p class=" text-sm text-gray-400 flex gap-1">
  ${videos.authors[0].profile_name}
     ${videos.authors[0].verified == true ? ` <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">` : `not verified` }
   
  </p>
  <p class=" text-sm text-gray-400">${videos.others.views} </p>
</div>
</div>
<button    onclick=loadVideoDetils('${videos.video_id}')"  class="btn btn-block">Show Details</button>
</div>
`
      videoContainer.append(videoCard)
})

}
function displaycatories(categories){
    // get data 
    const categoryContainer=document.getElementById("category-container")
    // loop operation on Array of object 
for (let cat of categories) {
    //    create element
    const categoriesdiv= document.createElement("div");
    categoriesdiv.innerHTML=`  <button id="btn-${cat.category_id}"
     onclick="loadCatoriesVides(${cat.category_id})"   
       class="btn btn-sm hover:bg-red-500 hover:text-white">${cat.category}</button>`
 categoryContainer.append(categoriesdiv)
}
  
}
document.getElementById("search-input").addEventListener("keyup",(e)=>{
const input =e.target.value;
console.log(input);
loadVideos(input)
})

loadCatories()