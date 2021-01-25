const User = require('../../models/user')
const Noty = require('noty');
const bcrypt = require('bcrypt'); 
const passport = require("passport")
const chalk = require("chalk");

const authController =  () => {
    return {

        login(req,res){
            res.render('auth/login')
        },
        postLogin(req,res,next){
           /**
            * PASSPORT AUTHENTICATE CAN BE DONE THIS WAY.
            */
            console.log(chalk.blue(req.body.email));
            console.log(chalk.blue(req.body.password));
            console.log(chalk.blue("authenticating......."))

            passport.authenticate('local',(error,user,info) => {
                if(error){
                    console.log(chalk.red("something wrong while authenticating"));
                    req.flash("error",info.message); 
                    return next(error);
                }
                if(!user){ // user not find.
                    console.log(chalk.red("user not find"));
                    console.log(chalk.red("error message", info.message));
                    req.flash("error",info.message); 
                    return res.redirect("/login");
                }
                req.logIn(user,(error) => {
                    if(error){
                        console.log(chalk.red("error while login"));
                        req.flash("error",info.message); 
                        return next(error);
                    }
                    console.log(chalk.red("sucessfully login"));
                    return res.redirect("/"); // redirect to home page.
                    
                })
            })(req,res,next); //  authenticate will return a function, that needs to be called. 
        },
        register(req,res){
            res.render('auth/register')
        },
        async postRegister(req,res){
      
        const {name,email,password} = req.body; 
        const user = await User.find({email});
        console.log("user",user);

        if(user == 0){ 

            // password get hased.
            const hasedPassword = await bcrypt.hash(password,10);
            const newUser = new User({name,email,password:hasedPassword});
            newUser.save().then((result) => { // this is how I should inserted to database.
                console.log("success",result);
                res.redirect("/");
            }).catch( (error) => {
                req.flash("error","Something went wrong!");
                req.flash("name",name);
                req.flash("email",email);
                res.redirect("/register");
            })
        }else{
                req.flash("error","Email is already taken");
                req.flash("name",name);
                req.flash("email",email);
                console.log("email is taken");
                res.redirect("/register")
        }
        
        },
        logout: (req,res) => {
            req.logout();
            return res.redirect('/login');
         }

    }
}

module.exports = authController; 