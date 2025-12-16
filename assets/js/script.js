//setupp
  let input = document.getElementById("search");
   let form = document.getElementById("form");
    input.focus()
input.setSelectionRange(input.value.length, input.value.length);
    console.log(input);
    ///////////
    function sendrequest (){
 let value = document.getElementById("search").value
       console.log(value);
fetch("/books/search?value="+value,{
  method:"POST",
headers:{
    "Content-Type":"application/json"
}}).then(res => res.json())
  .then(data => {
let array = data.book
let grid = document.getElementById("bookgrid");
let div = document.getElementById("div");
  div.innerHTML = "";
  console.log(div)
if(array.length===0){
  let section = document.createElement("section");
  section.className= "hero"
   section.innerHTML = `<p>No results found 😢</p>`
  div.appendChild(section);
  }

grid.innerHTML = "";
for(let i=0;i<array.length;i++){
  console.log(array[i]);
  let carde = document.createElement("div");
  carde.className = "book-card";
   if(array[i].coverurl.startsWith("http")){
            carde.innerHTML = ` 
           <img src="${array[i].coverurl}" alt="Book Cover" />
          <div class="book-info">
            <h3>${array[i].title}</h3>
            <p>${array[i].author}</p>
            <p>${array[i].publisyear}</p>
            <span class="genre-tag">${array[i].genre}</span>
          </div>
  `
  grid.appendChild(carde);

  }else{
      carde.innerHTML = `
          <div class="book-info">
             <img src="${ `../uploads/`+array[i].coverurl}" alt="Book Cover" />
            <h3>${array[i].title}</h3>
            <p>${array[i].author}</p>
            <p>${array[i].publisyear}</p>
            <span class="genre-tag">${array[i].genre}</span>
          </div>
  `
  grid.appendChild(carde);
      
}

}
    })
  }
  
 


 input.addEventListener("input", sendrequest);

//staring
let star = document.querySelectorAll("p")
let stararr = [...star]

stararr.forEach(element => {
element.addEventListener("click",()=>{
  console.log(element.innerHTML)
  if(element.innerHTML === "☆"){
    console.log(element.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML)
    fetch(`/books?title=${element.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML}&stared=true`,{
      method:"PUT",
         headers: {
    'Content-Type': 'application/json', // Set necessary headers
  },
    }
  ).then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error while updating data:', error));
    element.innerHTML = "&#9733;"
  }else if (element.innerHTML === "★"){
     fetch(`/books?title=${element.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML}&stared=false`,{
      method:"PUT",
       headers: {
    'Content-Type': 'application/json', // Set necessary headers
  },
     }
  ).then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error while updating data:', error));
element.innerHTML = "&#9734;"
  }
})    
});
  /*
 <div class="book-card">
          <img src="<%= el.coverurl %>" alt="Book Cover" />
          <div class="book-info">
            <h3><%= el.title %></h3>
            <p><%= el.author %></p>
            <p><%= el.publishyear %></p>
            <span class="genre-tag"><%= el.genre %></span>
          </div>
        </div>
  */
  