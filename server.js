require('dotenv').config() // to get the value from the env file.
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('express-flash') 
const MongoDbStore = require('connect-mongo')(session) // for storing the sessions. 
// setting the port number.
const PORT = process.env.PORT || 3000

//#######################################################################
//                    CONNECT TO THE DATABASE. 
//#######################################################################
const app = express()
// mongoose data bse connections. 
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/pizza';
mongoose.connect(url, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,useCreateIndex: true, 
        useFindAndModify: true
    });


const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("database connected");
})

//#######################################################################
//                    CREATING SESSION AND REGISTER SESSION. 
//#######################################################################
// creating model for sessions. 
   let mongoStore = new MongoDbStore({
       mongooseConnection: connection,
       collection: 'sessions' // collection name.
   })

// this is what save the sessions in the database.
app.use(
    session({
        cookieName: 'session',
        secret: process.env.COOKIE_SECRET,
        resave: false,
        store: mongoStore,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60*24, // 24 hours.
            
         } 
    })
)

app.use(flash()) 
app.use(express.static('public'));
app.use(express.json())   // get the request body as JSON format
app.use( (req,res, next) => {
    res.locals.session = req.session;
    next()
})
app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');


//#######################################################################
//                    IMPORTING ROUTES.
//#######################################################################
require('./routes/web')(app); // importing routes. 



app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
}) 