const erroMessages = {
  "firstname" : document.createTextNode("First Name cannot be empty"),
  "lastname" : document.createTextNode("Last Name cannot be empty"),
  "email" : document.createTextNode("Email cannot an empty"),
  "password" : document.createTextNode("Password cannot be empty"),
}

const firstname = document.querySelector("#firstname_input")
const lastname = document.querySelector("#lastname_input")
const email = document.querySelector("#email_input")
const password = document.querySelector("#password_input")

var arr = {
  "firstname" : firstname,
  "lastname" : lastname,
  "email" : email,
  "password" : password
}

function myfunction() {
  Object.entries(arr).forEach(entry => {
    const [key, value] = entry;
    [span , inp , p] = [...value.children]
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (inp.value === "") {
      p.innerHTML = '';
      span.classList.remove("hidden")
      node = erroMessages[key]
      p.appendChild(node)
    }

    if (key === "email" && inp.value !== "") {
      if (!regex.test(inp.value)) {
        p.innerHTML = '';
        span.classList.remove("hidden")
        node =  document.createTextNode("Looks like this is not an email")
        p.appendChild(node)
      }
    }
  });
}