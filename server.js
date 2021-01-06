const express = require('express')
const path = require('path')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')

// express app 
const app = express()

// sertting the port number. 
const PORT = process.env.PORT || 3000
app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
}) 