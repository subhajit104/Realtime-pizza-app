// console.log("this will be converted with the help of larabel");s
const axios = require('axios');
/**
 * How to select class elements and how to add event listener.
 */
let buttons = document.querySelectorAll(".add-to-cart") // select all buttons.
let cartQty = document.querySelector('#cartCounter');

buttons.forEach( (button) => {
  button.addEventListener( 'click', (event) => {
    let data = button.dataset.pizza;
    updateCart(JSON.parse(data));
  })
})

// 
const updateCart = (data) => {
     
      console.log("calling update cart function...")
      axios.post('/update-cart', data).then(   // this will return a promise.
        res => {
          cartQty.innerText = res.data.totolQty;
        }
      ).catch( (error) => {
        console.log("error",error);
      })  
}

//############ UPDATE WHEN ADD A ITEM ##################
