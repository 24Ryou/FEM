const err = document.querySelector(".btn-error")
const inp = document.querySelector("input")
const btn = document.querySelector(".btn")


btn.addEventListener("click" ,() => {
  err.classList.toggle("hidden")
  inp.classList.toggle("input-active")
  btn.classList.toggle("btn-active")
})
console.log(inp)