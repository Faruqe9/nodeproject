
const express = require("express");
app = express();
require("./db/conn");
const Customer = require("./models/Customer");
const path = require("path");


const expressLayouts = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { listeners } = require("process");
const List = require("./models/list");
const port = process.env.PORT || 4000;

//const static_path = path.join(__dirname, '../public');

app.use(expressLayouts)
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))
//console.log(path.join(__dirname, './partials/header'))
app.set('view engine', 'ejs')
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(cookieParser());



app.get("/" , (req , res) =>{
   
        
    res.render('login' , { layout: './layout/blank' });
}
);



app.get('/register', (req, res) => {

    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    //res.render('pages/blogs');
    res.render('register', { layout: './layout/blank' });
    
    });


    app.post('/register', async (req, res) => {

        try {
           
           const password = req.body.password;
           const confirmpassword = req.body.confirmpassword;
        
        if (password===confirmpassword) {
        
            const customerRegistration = new Customer({
            email : req.body.email,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            password : req.body.password,
            confirmpassword : req.body.confirmpassword
            });
             const registered = await customerRegistration.save();
             res.status(200).res.redirect('login', { layout: './layout/blank' });
            
        } else {
            "Password not match";
            
        }
            
        } catch (error) {
            res.status(400).send(error)
        }
       
        
        });

      app.post('/user-input', async(req, res)=>{
        const customerDetail = new List({
          user : req.body.user,
          company : req.body.company,
          contact : req.body.contact,
          date : req.body.date,
          bio : req.body.bio,
        })
           const listed = await customerDetail.save();
           if (listed) {
            res.redirect('user');
           } else {
            "no record"
           }
          
       
      
      })

         
          
          
          
              
         
        app.post('/login', (req, res) => {
            const {email, password} = req.body;
            if (email === req.body.email && password === req.body.password) {
              req.session.isLoggedIn = true;
              session=req.session;
              
                session.email=req.body.email;
                //console.log(req.session)
              res.redirect('/home');
                   
            } else {
              res.render('/', {error: 'Username or password is incorrect'});
            }
           
          });

          app.get('/home', (req, res) => {

            if (req.session.isLoggedIn === true) {
              res.render('home' , { layout: './layout/default',email: req.session.email});
              } else {
                res.render('login', { layout: './layout/blank' });
            
              }
            console.log(req.session.email)
          });

          app.get('/user', (req, res) => {

            // The render method takes the name of the HTML
            // page to be rendered as input
            // This page should be in the views folder
            // in the root directory.
            //res.render('pages/blogs');
            res.render('user' , { layout: './layout/default' } );
            
            });

            app.get('/user-input', (req, res) => {

              // The render method takes the name of the HTML
              // page to be rendered as input
              // This page should be in the views folder
              // in the root directory.
              //res.render('pages/blogs');
              res.render('user-input' , { layout: './layout/blank' } );
              
              });

          app.get('/logout', (req, res) => {
            req.session.isLoggedIn = false;
            res.redirect('/');
          });

app.listen(port , ()=>{
    console.log(`connected to the server using port ${port}`);
}); 