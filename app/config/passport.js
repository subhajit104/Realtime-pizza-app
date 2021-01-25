const User = require("../models/user");
const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local").Strategy; //  getting the class 
console.log("inside passport js file")
const chalk = require("chalk")

const init = (passport) => {
    console.log("inside passport js function")

    passport.use(new LocalStrategy(
           { usernameField: 'email'} ,
          async function (email, password, done){   // field for your key will be the first. 
          /**
           * 1. CHECK IF  EMAIL EXIST OR NOT.
           * 2. CHECK IF PASSWORD MATCH OR NOT.
           * 3. BASED ON THE PROCEED WITH DONE CALL BACK FUNCTION.
           */
          console.log(chalk.blue("finding user in the databse..."));
          const user = await User.findOne({email:email}); 

          if(!user) {
              console.log(chalk.red("user not find!"));
              return done(null,false,{message:" NO user find"})
          }
          
          bcrypt.compare(password,user.password).then( match => {
              if(match) {
                   console.log(chalk.green("user successfully login")); 
                   return done(null,user,{message:"login successfully"});
              } else {
                   console.log(chalk.red("username or password is incorrect"));
                   return done(null,false,{message:"username or password is incorrect"});
              }
          }).catch( error => {
                    console.log("user: ",user);
                    console.log("password",user.password)
                    console.log(chalk.red("something went wrong wrong!"));
                    return done(null,false,{message: "something went wrong."})
          })
        }
      ));
      
      /**
       * THIS IS WHERE YOU MENTION WHAT YOU WANT TO STORE AFTER LOGIN.
       * NORMALLY, STORE THE ID OF THE USER IN THE SESSION.
       */
      passport.serializeUser(function(user, done) {
        done(null, user._id);
      });
       
      passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
      });
      
}

module.exports = init; 