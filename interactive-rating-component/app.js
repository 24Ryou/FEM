const list = document.querySelector(".list")
const box1 = document.querySelector(".box-1")
const box2 = document.querySelector(".box-2")
const review = document.getElementById("review-text")


for (let i = 0; i < 5 ; i++) {
  const element = document.createElement("li")
  element.innerText = i+1
  element.classList.add('item')
  element.setAttribute("status" , false)
  element.addEventListener("click" , () =>{
    // remove anyother selected
    reset()
    // add selected
    element.classList.add("selected")
  })


  list.appendChild(element)
}


function reset(){
  const arr = [...list.children]
  arr.map(child => {
    child.classList.remove("selected")
  })
}

function onSubmit(){
  const arr = [...list.children]
  const rate = arr.filter(item => item.classList.contains('selected'))[0].innerText

  const msg = `You selected ${rate} out of 5`

  const paragraph = document.createElement("p")
  paragraph.innerText = msg
  
  box1.classList.add("hidden")
  box2.classList.remove("hidden")

  review.appendChild(paragraph)
}