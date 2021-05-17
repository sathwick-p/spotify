const express =  require("express")
const path = require("path");
const app = express();
const port = 80;
app.use('/static',express.static('static'))
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactus', {useNewUrlParser: true, useUnifiedTopology: true});
// IN THIS PROJECT THE SIGNUP PART IS LAUNCHED AS A SEPERATE COLLECTION INSIDE THE DB:contactus

// DEFINE MONGOOSE SCHEMA FOR CONTACT-US PAGE
var contactSchema = new mongoose.Schema({
    username: String,
    phone: String,
    emailid : String,
    location : String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactSchema);
//DEFINE MONGOOSE SCHEMA FOR SIGN UP PAGE:
var signupSchema = new mongoose.Schema({
    name: String,
    email : String,
    phoneno: String,
    password: String
  });

var Signup = mongoose.model('Signup', signupSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) 
app.use(express.urlencoded()) 


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') 
app.set('views', path.join(__dirname,'views'))

// END POINTS:
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);
})
//The contact us form:
app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Items were saved to the db")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the db")
    });
    // res.status(200).render('contact.pug');
})
//The sign up form:
app.post('/signup',(req, res)=>{
    var myData = new Signup(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the db")
    });
})
// To post using express a module called body parser is to be installed with the code:npm install body-parser
// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
})