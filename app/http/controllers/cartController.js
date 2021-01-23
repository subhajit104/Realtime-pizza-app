const { update } = require("../../models/menu");


const cartController =  () => {
    
    return {
       cart(req,res){ // this is a function.
           console.log("sessions: ",req.session) 
           res.render('customers/cart')
       },
       update(req,res){
           
           console.log("insode update function....")
          /**
           * check if cart is present in the session or not. 
           * if not create a new cart. 
           * else update on the existing cart.
           */
           console.log("session",req.session)
           console.log("req-body",req.body);

           if(!req.session.cart){
               req.session.cart = {
                   items: {
                       
                   },
                   totalQty: 0,
                   totalPrice: 0
               }
              
           }

           let cart = req.session.cart;
           /** 
            * if item is present or not. 
            * 
            *  */ 

            if(!cart.items[req.body._id]) { // if that item is not present. 
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1,
                }
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1; 
            }
            cart.totalQty = cart.totalQty + 1 ; 
            cart.totalPrice = cart.totalPrice + req.body.price ;
            res.json({totolQty:cart.totalQty})   // return the cart,; 
       }
    }

}

module.exports = cartController; 