const avatar = document.querySelector("#avatar-box")
const share = document.querySelector("#share-box")
const share2 = document.querySelector("#share-box-2")
const arrow = document.querySelector(".arrow-down")
const btn1 = document.querySelector("#btn-share-1")
const btn2 = document.querySelector("#btn-share-2")
const btn3 = document.querySelector("#btn-share-3")

btn1.addEventListener("click" , () => {
  avatar.classList.toggle("hidden")
  share.classList.toggle("hidden")
})
btn2.addEventListener("click" , () => {
  avatar.classList.toggle("hidden")
  share.classList.toggle("hidden")
})
btn3.addEventListener("click" , () => {
  share2.classList.toggle("hidden")
  arrow.classList.toggle("hidden")
})