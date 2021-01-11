const express = require('express')
const path = require('path')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')

// Express app 
const app = express()

// Sertting the port number.
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home')
})

app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
}) 