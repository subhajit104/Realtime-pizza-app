const chalk = require('chalk'); 
const check = (req,res,next) => {
      console.log(chalk.green("procedd"))
      if(!req.isAuthenticated()) return next();
      return res.redirect('/')
}

module.exports = check;