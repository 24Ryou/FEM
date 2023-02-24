const btn = document.querySelector('#btnSubmit')
const inp = document.querySelector('#input')
const p = document.querySelector('#inputMsg')
const box = document.querySelector("#inpbox")

const msg = document.createTextNode("Please provide a valid email address")
const inpError = "border-my-lightred"
const inpOrg = "border-my-paleblue"


btn.addEventListener('click' , () => {
  pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (!pattern.test(inp.value)) {
    inp.classList.add(inpError)
    box.classList.add("mb-4")
    box.classList.add("text-center")
    p.appendChild(msg)
  }
  else {
    p.innerHTML = ""
    inp.classList.remove(inpError)
    box.classList.remove("mb-4")
    box.classList.remove("text-center")
  }
})