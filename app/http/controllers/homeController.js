
const Menu = require('../../models/menu')

const homeController =  () => {
    

    // return {
    //     index(req,res){
    //         Menu.find().then( (result) => { 
    //             // anonymous function.
    //             console.log(result)
    //             res.render('home')
    //         })
            
    //     }
    //  }

     // There is another way of doing this. 
     // In order to use await, function need to be async. 
     // This is more consise. 
     
    return {
        async index(req,res) {
              const pizzas = await Menu.find()
              res.render('home',{pizzas: pizzas})
        }
    }
}

module.exports = homeController; 