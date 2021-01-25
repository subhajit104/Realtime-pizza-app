const initRoutes = (app) => {


  const homeController = require('../app/http/controllers/homeController');
  const authController = require('../app/http/controllers/authController');
  const cartController = require('../app/http/controllers/cartController');
  const check = require('../app/http/middlewar/guest');

  //Sconsole.log(homeController); 

  app.get('/', homeController().index)

  app.get('/login', check,authController().login)

  app.post('/login',authController().postLogin)

  app.post('/logout',authController().logout)
  
  app.get('/register', authController().register)

  app.post('/register', authController().postRegister)
  
  app.get('/cart',cartController().cart)

  app.post('/update-cart',cartController().update)

}; 

module.exports = initRoutes; 