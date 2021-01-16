// const { response } = require("express");

console.log("Hello ! Maverick's here");


// // Fetch and Promises
// fetch('http://localhost:3000/weather?address=Gurgaon').then((response) => {
//   response.json().then((data) => {
//     if(data.error){
//       console.log(data.error)
//     }
//     else{
//       console.log(data.forecast)
//       console.log(data.location)
//     }
//   })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// weatherform.addEventListener('submit', () =>{             // prints for 1/10th sec and then refreshes
//   console.log('testing!')
// })
weatherform.addEventListener('submit', (e) => {              // Prevents from reloading and we can do our op
  e.preventDefault()

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ' '


  const location = search.value
  console.log(location)
  // Fetch and Promises
  fetch('/weather?address=' + location ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      }
      else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})

